import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useStripe } from "@stripe/stripe-react-native";

import { ProfilePicPlaceholder } from "../../assets/images";
import styles from "./styles";
import { colors, fonts } from "../../theme";
import RadioButton from "../../components/RadioButton";
import localStorage from "../../utils/localStorage";
import api from "../../apis";

export default function Pay({ navigation, route }) {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const data = route.params;
  let cart = JSON.parse(localStorage.getString("cart") || "[]");

  const fetchPaymentSheetParams = async () => {
    let customer_id = "cus_OWSON6RxWhiXQ0";
    try {
      if (!orderData?.name || !orderData?.phone || !orderData?.address) {
        showToast("Please fill all the fields");
        return;
      }
      setLoading(true);
      const response = await fetch(
        "http://35.154.49.30:5000/api/payment/payment-sheet",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item: { price: parseInt(data?.totalPrice || 0) * 100 },
            customer_id,
          }),
        }
      );
      setLoading(false);
      const { paymentIntent, ephemeralKey, customer } = await response.json();
      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    } catch (e) {
      return {
        paymentIntent: "",
        ephemeralKey: "",
        customer: "",
      };
    }
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: "Deco AR",
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
    });
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Payment Error: ${error.code}`, error.message);
    } else {
      await handleCreateOrder();
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  useEffect(() => {
    if (paymentMethod !== "COD") {
      initializePaymentSheet();
    }
  }, [paymentMethod]);

  const showToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };

  const handleCreateOrder = async () => {
    try {
      if (!orderData?.name || !orderData?.phone || !orderData?.address) {
        showToast("Please fill all the fields");
        return;
      }
      setLoading(true);
      let uid = JSON.parse(localStorage.getString("user") || "{}")?.uid;
      await api.post("/order", {
        customer: {
          user: uid,
          name: orderData?.name,
          phone: orderData?.phone,
          shippingAddress: orderData?.address,
          billingAddress: orderData?.address,
        },
        items: cart[0]?._id || "",
        quantity: cart?.length,
        total: data?.totalPrice,
        orderStatus: {
          status: "in_progress",
          timestamp: new Date(),
        },
        date: new Date(),
      });
      localStorage.set("cart", JSON.stringify([]));
      showToast("Order Placed");
      navigation.navigate("Home");
    } catch (e) {
      console.log(e);
      showToast("An Error Occured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.brandName}>DECO-AR</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.containerHeading}>Delivery Address</Text>
        <View style={styles.profilePreviewCard}>
          <View>
            <View
              style={{
                flexDirection: "row",
                gap: 35,
                alignItems: "center",
              }}
            >
              <Text style={styles.displayName}>
                <Text style={{ fontWeight: "bold" }}>Name: </Text>
              </Text>
              <TextInput
                style={{
                  width: 200,
                  height: 40,
                  borderBottomWidth: 1,
                  borderBottomColor: "#D3D3D3",
                }}
                value={orderData?.name}
                onChangeText={(text) =>
                  setOrderData({ ...orderData, name: text })
                }
                placeholder="Enter Name"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 35,
                alignItems: "center",
              }}
            >
              <Text style={styles.displayName}>
                <Text style={{ fontWeight: "bold" }}>Phone: </Text>
              </Text>
              <TextInput
                keyboardType="number-pad"
                style={{
                  width: 200,
                  height: 40,
                  borderBottomWidth: 1,
                  borderBottomColor: "#D3D3D3",
                }}
                value={orderData?.phone}
                onChangeText={(text) =>
                  setOrderData({ ...orderData, phone: text })
                }
                placeholder="Enter Phone Number"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 20,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.displayName}>
                <Text style={{ fontWeight: "bold" }}>Address: </Text>
              </Text>
              <TextInput
                style={{
                  width: 200,
                  height: 40,
                  borderBottomWidth: 1,
                  borderBottomColor: "#D3D3D3",
                }}
                value={orderData?.address}
                onChangeText={(text) =>
                  setOrderData({ ...orderData, address: text })
                }
                placeholder="Enter Address"
              />
            </View>
          </View>
        </View>
        <Text style={styles.containerHeading}>Payment Method</Text>
        <View style={{ justifyContent: "space-between", gap: 20 }}>
          <View style={styles.profilePreviewCard}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text style={styles.displayName}>Cash on Delivery</Text>
              <RadioButton
                disabled={loading || !orderData?.name || !orderData?.phone || !orderData?.address}
                isCheck={paymentMethod === "COD"}
                onPress={() => setPaymentMethod("COD")}
              />
            </View>
          </View>
          <View style={styles.profilePreviewCard}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text style={styles.displayName}>Pay with Card</Text>
              <RadioButton
                disabled={loading || !orderData?.name || !orderData?.phone || !orderData?.address}
                isCheck={paymentMethod === "Card"}
                onPress={() => setPaymentMethod("Card")}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            position: "absolute",
            bottom: 0,
            width: Dimensions.get("screen").width * 0.9,
            marginHorizontal: Dimensions.get("screen").width * 0.05,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontFamily: fonts?.type?.bold,
              color: colors.dark,
              fontSize: fonts.size.h6,
            }}
          >
            ${data?.totalPrice || 0}
          </Text>
          <Pressable
            disabled={
              loading ||
              !orderData?.name ||
              !orderData?.phone ||
              !orderData?.address
            }
            onPress={
              paymentMethod === "COD" ? handleCreateOrder : openPaymentSheet
            }
            style={{
              width: 120,
              height: 40,
              borderRadius: 30,
              backgroundColor: colors.theme._300,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
          >
            {loading ? (
              <ActivityIndicator size={"small"} color={"#FFFFFF"} />
            ) : (
              <Text style={{ color: colors.dark, fontFamily: fonts.type.bold }}>
                Place Order
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
