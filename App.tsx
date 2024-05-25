import React, { useEffect } from "react";
import { SafeAreaView, StatusBar, useColorScheme, LogBox } from "react-native";
import { Provider } from "react-redux";
import { StripeProvider } from "@stripe/stripe-react-native";
import Routes from "./App/routes/routes";
import store from "./App/store";
import messaging from "@react-native-firebase/messaging";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

function App() {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? "#000000" : "#FFF7E9",
    flex: 1,
  };

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  }
  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Provider store={store}>
        <StripeProvider
          publishableKey="pk_test_51Mnrt1LEakj4DtSKhcndalCwvXTvKRLgzc1jLWTvQvh7UL10JfsfEFOfVFFDRJUuQ82GhuwTgsr7KguSJfxF3u0b00JCi5voTo"
          urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
          merchantIdentifier="merchant.com.payment_integration" // required for Apple Pay
        >
          <Routes />
        </StripeProvider>
      </Provider>
    </SafeAreaView>
  );
}

export default App;
