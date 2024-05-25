import messaging from "@react-native-firebase/messaging";

export const generatFCMToken = async () => {
  // Register the device with FCM
  await messaging().registerDeviceForRemoteMessages();

  // Get the token
  const token = await messaging().getToken();

  // Save the token
  return token;
};
