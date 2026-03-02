---
title: Intro to Rust's async/await
date: 2026-03-02
---

Rust's async/await lets you write programs with "cooperative stackless coroutines" called tasks.
A task has less overhead than an OS thread when used for concurrent IO-bound workloads that spend most of their time waiting for things like network requests.
They're also easier to cancel (stop executing) than threads.

An async runtime (typically [Tokio](https://docs.rs/tokio/)) runs async functions concurrently.
You can spawn a task like this:

```rust
let task_handle = tokio::task::spawn(fetch());

async fn fetch() -> i32 {
    // call another async fn
    let future = network_request();
    // yield until its return value is ready
    let response: i32 = future.await;
    return response
}
```

The compiler transforms each `async fn` into a normal function that immediately returns a `Future` object:


```rust
fn fetch() -> impl Future<Output=i32> {
    return CompilerGeneratedStateMachine { /* ... */ };
}
```

A `Future` represents a return value that isn't ready yet.
This is similar to a `Promise` in Javascript, except that
in Rust, futures are lazy, so they don't run until spawned or awaited.

The `await` keyword starts a future and waits for its return value.
While waiting, it yields to the runtime, allowing it to schedule other tasks.

You can call normal functions from async functions, as long as they don't block.
Blocking would block the entire runtime thread because the runtime can't preempt tasks.
So instead of calling blocking standard library functions like [`fs::read()`](https://doc.rust-lang.org/stable/std/fs/fn.read.html), use Tokio-provided async [alternatives](https://docs.rs/tokio/latest/tokio/fs/fn.read.html) and `await` their results.

Internally, Tokio-provided async functions use non-blocking system calls to start an operation, and request the operating system to notify the runtime's event loop when the result is ready.
Tokio also provides async-compatible versions of objects like TcpStream, Mutex, channels, etc.

The `await` keyword can only be used in async functions, because only async functions are capable of yielding to the runtime.
Before yielding, `await` ensures all variables used later are saved in its `Future` object. This allows the runtime to resume it needing without having to save its stack.
This reduces memory usage, and is why Rust's async/await is called "stackless".

If you need to run an async function from a normal function, you have to create a runtime on which to run it:

```rust
fn main() {
    let runtime = tokio::runtime::Runtime::new();
    runtime.block_on(async_main());
}
```

That's a lot of typing, so Tokio has a helper macro that runs `async main` on a runtime when the program starts:

```rust
#[tokio::main]
async fn main() {

}
```

## Cancellation

Once an OS thread is running, it can't be reliably cancelled.
For example, if it's blocked on a system call (like a network `read()`), killing the thread won't release locks or clean up resources.
Unix signals don’t really solve this: they interrupt execution at arbitrary points, but don't guarantee all object destructors are safely run.


On the other hand, a `Future` can be cancelled by simply dropping it.
This immediately drops all variables it owns, causing their destructors to run.
Cancellation makes it easy to add a timeout to arbitrary async functions:

```rust
let duration = std::time::Duration::from_secs(1);
let result = tokio::time::timeout(duration, fetch()).await;
match result {
    Ok(num) => {
        println!("Fetched value: {num}")
    }
    Err(_timeout) => {
        println!("The future was dropped due to timeout")
    }
}
```

Cancellation allows combinators like [select!()](https://docs.rs/tokio/latest/tokio/macro.select.html) and [try_join!()](https://docs.rs/tokio/latest/tokio/macro.try_join.html). `try_join!()` concurrently runs multiple futures to completion.
If any returns an error, it immediately cancels the others:

```rust
let out: Result<(i32, i32), FetchError> =
    tokio::try_join!(fetch1(), fetch2());
```

If you ever want to retry after cancelling, you can usually just call the async function again. However, some async functions like Tokio's [read_exact()](https://docs.rs/tokio/latest/tokio/io/trait.AsyncReadExt.html#method.read_exact) are not "cancel-safe".
This means you might miss a few bytes or messages if you retry like this.


## How things work behind the scenes

A future is a compiler-generated state machine that stores the state of an async function suspended on an `await` point.
Each state stores all variables needed for the future to resume.
Here's a pseudocode example:


```rust
enum CompilerGeneratedFuture {
    AwaitPoint1 {
        local_variable_a: u32,
        local_reference_to_a: &u32,
        nested_future: Future1
    },
    AwaitPoint2 {
        local_variable_b: String,
        nested_future: Future2
    },
    Finished {
        output: i32
    },
}
```

Real futures are generated in a lower-level language called [MIR](https://rustc-dev-guide.rust-lang.org/mir/index.html).

A future might contain saved variables that reference other variables it contains.
These references would become dangling if the future was moved in memory. To prevent moves, the runtime internally pins suspended futures to fixed memory locations. 

Each future has a compiler-generated `poll()` method that advances it to the furthest state immediately possible.
The runtime runs futures by repeatedly calling this method.

If the future has finished, `poll()` returns its output value.
If execution reaches an `await` point that isn’t ready yet, `poll()` returns a "pending" value, and tells the OS to notify the runtime when it's ready to be polled again.
The runtime will `poll()` the future again once it's ready.
In the meantime, it can `poll()` other spawned futures.
This is how `await` "yields" back to the runtime!

But async programmers don't need to know what's going on behind the scenes.
They can simply write async functions as if they "linearly" execute line-by-line, just like threads. 


## OS Threads vs. Async

### Async benefit: less memory

A future is a "stackless coroutine" that stores only the variables it'll need when it's resumed.
On the other hand, the OS must store a stack and all registers for each suspended thread, even if they're not all needed.

### Async benefit: cheaper context switching

To "schedule" a future, Tokio simply calls `poll()` on it, and its state machine proceeds to the next `await` point.
On the other hand, the OS must save and restore all registers on each context switch.

See [overhead_experiment.md](overhead_experiment.md) for a real test.

### Async benefit: cancellation

Arbitrary async functions can be immediately cancelled by just dropping their future, which is useful for timeouts. This is not possible with threads.

### OS Thread benefit: parallelism

The OS preempts threads that are doing heavy calculations, ensuring CPU cores are fairly shared.
On the other hand, async only yields on `await`, so heavy calculations would block the runtime thread.

Tokio partially mitigates this by spawning a thread per core, and distributing tasks between them. But the whole purpose of async is to cheaply yield to the runtime with `await` when waiting on things like network requests.
If you're not using `await`, async has no benefit over threads.

- Threads should be used for CPU-bound workloads that benefit from parallelism.
- Async should be used for IO-bound workloads that spend most of their time waiting on things like network requests.

### OS Thread benefit: ease-of-use

Async Rust has a steep learning curve, with more complicated errors.
In many cases, you could just stick with threads.
However, if you need to spawn more than a few thousand tasks that spend most of their time waiting, or would benefit from easy cancellation and timeouts, async is a good choice.


## List of alternatives to OS threads

- Event loops: Programmers implement state machines by hand. 
Then, they manually make non-blocking system calls, and advance the state machines as results come in.
This is how Nginx works.

- Callbacks: Uses a runtime like Tokio, but without the `await` syntax.
You tell it to start a task, and provide a function callback that it should call when the task completes.
This is easier to write than manual event loops, but harder than async.
This is how concurrency was done in Javascript before the await syntax was introduced.

- Async Rust: Async functions compile to state machines called futures, which are polled by a runtime.

- Goroutines: Stackful, so each coroutine has its own stack. This still uses less memory than OS threads, because the garbage collector dynamically resizes coroutine stacks. Implicit yield/await points are inserted by the compiler.
All functions are implicitly "async", which greatly simplifies programming, but takes away some low-level control from the programmer.


## Async Rust tips

### Don't block in async functions

You should `await` instead of blocking in async functions.
Blocking would block the entire runtime thread because the runtime can't preempt tasks.

This means you should use:
- [Tokio channels](https://docs.rs/tokio/latest/tokio/sync/mpsc/fn.channel.html) instead of [std channels](https://doc.rust-lang.org/std/sync/mpsc/fn.channel.html).
- [Tokio sleep](https://docs.rs/tokio/latest/tokio/time/fn.sleep.html) instead of [std sleep](https://doc.rust-lang.org/std/thread/fn.sleep.html).
- [Tokio TcpStream](https://docs.rs/tokio/latest/tokio/net/struct.TcpStream.html) instead of [std TcpStream](https://doc.rust-lang.org/std/net/struct.TcpStream.html).
- etc.

### Mutexes

You can use a normal [std mutex](https://doc.rust-lang.org/std/sync/struct.Mutex.html) instead of a [Tokio mutex](https://docs.rs/tokio/latest/tokio/sync/struct.Mutex.html), as long as you don't block or `await` while holding it.

If you get an error like this, it means you're holding a locked std mutex across an `await` point:

```raw
help: within `impl std::future::Future<Output = ()>`, the trait `std::marker::Send` is not implemented for `MutexGuard<'_, u32>`

note: future is not `Send` as this value is used across an await
```

You can fix this by limiting the scope where you hold the lock:

```rust
fetch().await;
{
    let guard = mutex.lock().unwrap();
    dbg!(guard);
    // MutexGuard is dropped, unlocking the mutex
}
fetch().await;
```

You can also fix it by switching from an std mutex to a Tokio mutex, which integrates with the runtime to support holding across `await` points.

### Split

A common pattern is to
[split()](https://docs.rs/tokio/latest/tokio/io/fn.split.html)
a connection like [Tokio TcpStream](https://docs.rs/tokio/latest/tokio/net/struct.TcpStream.html)
into a read half and write half, and spawn a separate task for each.
This allows you to concurrently read and write.

If another task wants something to be written, it can send it to the write task with a 
[Tokio channel](https://docs.rs/tokio/latest/tokio/sync/mpsc/fn.channel.html).

### Links to useful Tokio stuff

- [spawn()](https://docs.rs/tokio/latest/tokio/task/fn.spawn.html) starts running a future in the background, and returns a handle which you can `await` to wait for the task to finish.
- [timeout()](https://docs.rs/tokio/latest/tokio/time/fn.timeout.html) adds a timeout to any async function.
- [try_join!()](https://docs.rs/tokio/latest/tokio/macro.try_join.html) concurrently runs multiple futures to completion.
If any returns an error, it immediately cancels the others.
- [select!()](https://docs.rs/tokio/latest/tokio/macro.select.html) runs multiple futures. When the first future completes, it cancels all the other futures.
- [split()](https://docs.rs/tokio/latest/tokio/io/fn.split.html) takes an object that can read and write, like TCPStream, and splits it into a read half and a write half which can be used independently.
- [channel()](https://docs.rs/tokio/latest/tokio/sync/mpsc/fn.channel.html) is a channel like the one in std, except it lets you `await` instead of blocking. Useful for sending values between tasks.
