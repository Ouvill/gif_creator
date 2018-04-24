#!/bin/bash

mkdir -p public/images/generate/{row,optimized}
./make_thumbnail.sh
npm install
npm start
# nodemon node-test
