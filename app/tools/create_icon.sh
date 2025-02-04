#!/bin/bash

rm -rf /app/cordova/platforms/android/app/src/main/res/mipmap*
rm -rf /app/cordova/platforms/android/app/src/main/res/drawable*

cd /app/cordova
cordova-icon
# cordova-splash

# copy high resolution icon to mipmap
cp -vfr /app/cordova/platforms/android/app/src/main/res/mipmap-xxxhdpi /app/cordova/platforms/android/app/src/main/res/mipmap

# Rename all icon.png to ic_launcher.png
cd /app/cordova/platforms/android/app/src/main/res/

for file in $(find . -name 'icon.png'); do
    mv "$file" "${file/icon/ic_launcher}"
done