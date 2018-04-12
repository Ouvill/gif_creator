#!/bin/bash

mkdir -p public/images/generate/{row,optimized}
npm install
npm run build
npm start
