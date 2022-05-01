# build buck from source
FROM reactnativecommunity/react-native-android

RUN avdmanager create avd -d 'pixel_4' -n 'pixel4' --package 'system-images;android-21;google_apis;armeabi-v7a' --abi google_apis/armeabi-v7a