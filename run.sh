#!/bin/sh

killall node
PUPPETEER_PRODUCT=chrome deno run -A --unstable https://deno.land/x/puppeteer@9.0.2/install.ts

cd ./client
yarn dev &
cd ../server
deno run --allow-all --unstable ./index.ts
