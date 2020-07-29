build:
	cd ./deno-plugin && cargo build --release

run:
	deno run --allow-plugin --unstable --allow-hrtime mod.ts
