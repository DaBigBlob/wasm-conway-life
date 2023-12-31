#!/bin/sh

./build.sh
cp ./pkg/conway_life_bg.wasm ./www/dist/
cp ./pkg/conway_life.js ./www/src
cp ./www/src/index.html ./www/dist/
bun build ./www/src/index.js --target browser --minify --outfile ./www/dist/main.js