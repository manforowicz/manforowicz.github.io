---
title: OS Threads vs. Async overhead
date: 2026-03-02
override:tags: []
layout: base.html
permalink: "intro_to_rust_async/overhead_experiment/index.html"
---

Let's compare the overhead of OS threads and async Tokio tasks on an IO-bound workload where tasks spend most of their time waiting on something.

(Note that on CPU-bound computations, async doesn't provide any advantage over OS threads.)

## OS threads

```rust
const NUM_THREADS: u32 = 10_000;
fn main() {
    let mut handles = Vec::new();
    for _ in 0..NUM_THREADS {
        // spawn an OS thread
        let handle = std::thread::spawn(my_function);
        handles.push(handle);
    }
    for handle in handles {
        handle.join().unwrap();
    }
}
fn my_function() {
    // simulate waiting on I/O, like a network call
    std::thread::sleep(std::time::Duration::from_secs(1));
}
```
`/usr/bin/time -v ./target` says:
```
User time (seconds): 0.07
System time (seconds): 0.57
Percent of CPU this job got: 53%
Elapsed (wall clock) time (h:mm:ss or m:ss): 0:01.19
Maximum resident set size (kbytes): 97436
```
Not too bad!

Each thread is given a 2 MiB stack of virtual memory,
but the OS only maps virtual pages to physical pages when the program accesses them.
That's why this program uses only 9.7 KB of physical memory per thread.

Unfortunately, the CPU spent 0.57 handling page faults and context switching,
but only 0.07 seconds running our work.

When I increase `NUM_THREADS` to 20,000,
the OS kills the program with "Resource temporarily unavailable"
because it exceeds Linux's `threads-max` limit.
Increasing this limit allows us to run over 100,000 OS threads.

## Async tasks

```rust
const NUM_TASKS: u32 = 10_000;
#[tokio::main]
async fn main() {
    let mut handles = Vec::new();
    for _ in 0..NUM_TASKS {
        // spawn an async task
        let handle = tokio::spawn(my_function());
        handles.push(handle);
    }
    for handle in handles {
        handle.await.unwrap();
    }
}
async fn my_function() {
    // simulate waiting on I/O, like a network call
    tokio::time::sleep(std::time::Duration::from_secs(1)).await;
}
```
`/usr/bin/time -v ./target` says:
```
User time (seconds): 0.02
System time (seconds): 0.01
Percent of CPU this job got: 3%
Elapsed (wall clock) time (h:mm:ss or m:ss): 0:01.00
Maximum resident set size (kbytes): 6604
```

Async has even less overhead!

Each only 660 bytes of memory are used per task.

Now the CPU spent only 0.02+0.01 seconds finishing this task!
