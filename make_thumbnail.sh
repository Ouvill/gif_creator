#!/bin/bash

CURRENT=$(cd $(dirname $0) && pwd)
IMAGE_PATH="./public/images/backgrounds"
DIST_PATH="./public/images/backgrounds/thumbnails"
WIDTH=100
HEIGHT=100

mkdir -p ${DIST_PATH}

cd ${IMAGE_PATH}
IMAGE_LIST=$(ls *.jpg *.png)

cd ${CURRENT}
for IMAGE in ${IMAGE_LIST[@]}
do
    set $(identify -format "%w %h" ${IMAGE_PATH}/${IMAGE})
    echo "width ${1}"
    echo "height ${2}"
    if [ ${1} -gt ${2} ]; then
        convert -thumbnail x${HEIGHT} -gravity 'center' \
            -crop ${WIDTH}x${HEIGHT}+0+0 \
            ${IMAGE_PATH}/${IMAGE} ${DIST_PATH}/${IMAGE}
    else
        convert -thumbnail ${WIDTH}x -gravity 'center' \
            -crop ${WIDTH}x${HEIGHT}+0+0 \
            ${IMAGE_PATH}/${IMAGE} ${DIST_PATH}/${IMAGE}
    fi
done
