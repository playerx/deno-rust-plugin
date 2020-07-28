## Goals

This demo project had multiple goals:

1. Demonstrate how to write custom Rust Plugin and call it from Typescript
2. How to call Sync & Async functions in Rust from Typescript
3. See how much performance overhead it takes to call pure empty function in Rust and return the result back to Typescript

## Requirements

- [Rust](https://www.rust-lang.org/tools/install)
- [Deno](https://deno.land/#installation)

## How to run

1. `make`
2. `make run` or `deno run --allow-plugin --unstable --allow-hrtime mod.ts`

## Performance

Hardware:

```
MacBook Pro (Retina, 15-inch, Mid 2014)
2.2 GHz Quad-Core Intel Core i7
16 GB 1600 MHz DDR3
```

```
100000 Iterations
```

**Result:**
1 custom (sync) op call duration

| Avg               | Fastest          |
| ----------------- | ---------------- |
| 0.011ms (10989ns) | 0.007ms (7237ns) |

## Related

[nodejs-cpp-binding](https://github.com/playerx/nodejs-cpp-binding)
