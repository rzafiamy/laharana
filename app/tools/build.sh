APK_OUTPUT=/app/cordova/platforms/android/app/build/outputs/apk/release
BUILD_OUTPUT=/app/build

cd /app/laharana

# Build App
npm run build

# Cleanup output folder
rm -rf ${APK_OUTPUT}/*.apk
rm -rf ${BUILD_OUTPUT}/laharana.apk

# Build Android APK
cd /app/cordova

# Add Android platform if not exists
if [ ! -d "/app/cordova/platforms/android" ]; then
    cordova platform add android@13.0.0
    cordova prepare android
    cd /app
    ./tools/create_icon.sh
    cd /app/cordova
    cordova build android
fi

# Prepare
cordova prepare android

# if param $1 is equal to "DEBUG" case insensitive then build debug APK
if [ "${1,,}" == "debug" ]; then
    echo "Building Debug APK"
    cordova build android --debug
    cp -vfr /app/cordova/platforms/android/app/build/outputs/apk/debug/app-debug.apk ${BUILD_OUTPUT}/laharana.apk
    exit 0
fi

cd /app/cordova/platforms/android/

./tools/gradlew assembleRelease


# If error then exit
if [ $? -ne 0 ]; then
    echo "Error building APK"
    exit 1
fi

# Create a keystore
# keytool -genkey -v -keystore mbkit_key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias mbkit

# Zipalign
zipalign -v -p 4 ${APK_OUTPUT}/app-release-unsigned.apk ${APK_OUTPUT}/app-release-unsigned-aligned.apk

# If error then exit
if [ $? -ne 0 ]; then
    echo "Error zipalign"
    #exit 1
fi

# Sign APK
apksigner sign --ks /app/laharana-key.keystore --ks-pass pass:myKeystorePassword --key-pass pass:myKeystorePassword --out ${APK_OUTPUT}/app-release-signed.apk ${APK_OUTPUT}/app-release-unsigned-aligned.apk

# If error then exit
if [ $? -ne 0 ]; then
    echo "Error signing APK"
    exit 1
fi

# Verify APK
apksigner verify ${APK_OUTPUT}/app-release-signed.apk

# Copy APK to  build folder
cp -vfr ${APK_OUTPUT}/app-release-signed.apk ${BUILD_OUTPUT}/laharana.apk

# If error then exit
if [ $? -ne 0 ]; then
    echo "Error copying APK"
    exit 1
fi