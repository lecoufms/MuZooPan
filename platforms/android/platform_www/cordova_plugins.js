cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-android-volume.AndroidVolume",
      "file": "plugins/cordova-plugin-android-volume/www/AndroidVolume.js",
      "pluginId": "cordova-plugin-android-volume",
      "clobbers": [
        "androidVolume"
      ]
    },
    {
      "id": "phonegap-plugin-barcodescanner.BarcodeScanner",
      "file": "plugins/phonegap-plugin-barcodescanner/www/barcodescanner.js",
      "pluginId": "phonegap-plugin-barcodescanner",
      "clobbers": [
        "cordova.plugins.barcodeScanner"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-android-volume": "0.0.12",
    "cordova-plugin-whitelist": "1.3.4",
    "phonegap-plugin-barcodescanner": "8.1.0"
  };
});