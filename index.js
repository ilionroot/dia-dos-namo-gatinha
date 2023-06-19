import { AppRegistry } from "react-native";
import messaging from "@react-native-firebase/messaging";

import App from "./App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { name as appName } from "./app.json";

import mobileAds from "react-native-google-mobile-ads";

// mobileAds()
//   .setRequestConfiguration({
//     // Update all future requests suitable for parental guidance
//     maxAdContentRating: MaxAdContentRating.PG,

//     // Indicates that you want your content treated as child-directed for purposes of COPPA.
//     tagForChildDirectedTreatment: true,

//     // Indicates that you want the ad request to be handled in a
//     // manner suitable for users under the age of consent.
//     tagForUnderAgeOfConsent: true,

//     // An array of test device IDs to allow.
//     testDeviceIdentifiers: ["EMULATOR"],
//   })
//   .then(() => {
//     // Request config successfully set!
//   });

mobileAds()
  .initialize()
  .then((adapterStatuses) => {
    // Initialization complete!
    console.log(adapterStatuses);
  });

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  await AsyncStorage.setItem("last", String(remoteMessage.sentTime));
  console.log("Message handled in the background!", remoteMessage);
});

AppRegistry.registerComponent("main", () => App);
