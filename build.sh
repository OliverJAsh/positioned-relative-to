#!/bin/bash

# Exit immediately if a command exits with a non-zero status, amongst other improvements
# https://vaneyckt.io/posts/safer_bash_scripts_with_set_euxo_pipefail/
set -euxo pipefail

rm -rf ./config/target/

tsc --project config

rm -rf ./target/

webpack --config ./config/target/webpack.config.js
node ./generate-main.js
cp ./src/index.html ./target/index.html
