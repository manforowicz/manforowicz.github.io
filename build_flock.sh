(cd flock
 cargo build --release --target wasm32-unknown-unknown
 cp target/wasm32-unknown-unknown/release/flocking_sim.wasm flocking_sim.wasm
 )

basic-http-server .
