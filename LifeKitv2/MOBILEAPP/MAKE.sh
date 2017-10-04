npm install
npm install ionic -g
npm install @ionic-native/core --save
npm install rxjs
npm install -g cordova
npm rebuild node-sass
ionic plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyAIADUE9gqE3dO5nvq2GtUoP_7Ave5Ktqw" --variable API_KEY_FOR_IOS="AIzaSyAIADUE9gqE3dO5nvq2GtUoP_7Ave5Ktqw"
npm install --save @ionic-native/google-maps
mkdir www
ionic state reset
ionic platform add android
ionic platform add ios
#For the navigator launcher
npm install --save @ionic-native/launch-navigator
#For the chart that gives you your breathing pulse when you connect a device
npm install chart.js --save
