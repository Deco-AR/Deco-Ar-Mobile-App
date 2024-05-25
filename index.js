/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import messaging from "@react-native-firebase/messaging";
import notifee from "@notifee/react-native";

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  // Render the app component on foreground launch
  return <App />;
}

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
});

const showNotification = async (title, body) => {
  try {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: "default",
        },
      },
    });
  } catch (error) {
    console.log("ERROR", error);
  }
};
messaging().onMessage(async (remoteMessage) => {
  showNotification(
    remoteMessage.notification.title,
    remoteMessage.notification.body
  );
});

AppRegistry.registerComponent(appName, () => HeadlessCheck);
