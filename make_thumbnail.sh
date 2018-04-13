#!/bin/bash

CURRENT=$(cd $(dirname $0) && pwd)
IMAGE_PATH="./public/images/backgrounds"
DIST_PATH="./public/images/backgrounds/thumbnails"
WIDTH=100
HEIGH=100

mkdir -p ${DIST_PATH}

cd ${IMAGE_PATH}
IMAGE_LIST=$(ls *.jpg *.png)

cd ${CURRENT}
for IMAGE in ${IMAGE_LIST[@]}
do
    convert -thumbnail ${WIDTH}x${HEIGT}^ -gravity center -crop ${WIDTH}x${HEIGT}+0+0 ${IMAGE_PATH}/${IMAGE} ${DIST_PATH}/${IMAGE}
done
