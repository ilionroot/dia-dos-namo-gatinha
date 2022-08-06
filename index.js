import { registerRootComponent } from "expo";
import messaging from "@react-native-firebase/messaging";
import App from "./App";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  await AsyncStorage.setItem("last", String(remoteMessage.sentTime));
  console.log("Message handled in the background!", remoteMessage);
});

registerRootComponent(App);
