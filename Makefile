build:
	cd ./deno-plugin && cargo build

run:
	deno run --allow-plugin --unstable --allow-hrtime mod.ts
