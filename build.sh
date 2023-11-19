#!/bin/sh

rm -rf ./pkg/ && wasm-pack build --release --target web
wasm-opt -O3 -o ./pkg/conway_life_bg.wasm ./pkg/conway_life_bg.wasm