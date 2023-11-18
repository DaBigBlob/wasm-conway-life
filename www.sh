#!/bin/sh

rm -rf ./pkg/ && wasm-pack build --release --target web
cp ./pkg/conway_life_bg.wasm ./www/
cp ./pkg/conway_life.js ./www/src
bun build ./www/src/index.js --target browser --minify --outfile ./www/main.js