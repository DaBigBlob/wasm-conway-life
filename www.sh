#!/bin/sh

rm -rf ./pkg/ && wasm-pack build --release --target web
cp ./pkg/conway_life_bg.wasm ./www/
cp ./pkg/conway_life.js ./www/