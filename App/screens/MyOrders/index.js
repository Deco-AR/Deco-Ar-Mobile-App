import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ToastAndroid,
  Linking,
  Button,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  ProfilePicPlaceholder,
  ProductPlaceholder,
  filledStar,
  outlineStar,
} from '../../assets/images';
import styles from './styles';
import api from '../../apis';
import {colors} from '../../theme';
import localStorage from '../../utils/localStorage';

export default function MyOrders({navigation}) {
  let user = JSON.parse(localStorage.getString('user') || '{}');
  const [loading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isReviewSubmit, setIsReviewSubmit] = useState(false);
  const fetchUserOrders = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/user/order');
      console.log(response.data, 'orders');
      setOrders(response.data?.orders || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [isReviewSubmit]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.brandName}>DECO-AR</Text>
      </View>
      <View style={styles.bottomContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.theme._300} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.containerHeading}>My Orders</Text>
            <FlatList
              data={orders}
              keyExtractor={item => item._id}
              renderItem={({item}) => (
                <OrderedItem
                  _id={item._id}
                  status={item.orderStatus?.status}
                  price={item.total}
                  title={item.items[0]?.title}
                  photo={item.items[0]?.photo}
                  productId={item.items[0]?._id}
                  userId={user.uid}
                  reviews={item.items[0]?.reviews}
                  item={item}
                  setIsReviewSubmit={setIsReviewSubmit}
                />
              )}
            />
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const OrderedItem = ({
  _id,
  photo,
  title,
  price,
  status,
  productId,
  userId,
  reviews = [],
  onPress = () => {},
  setIsReviewSubmit,
  item,
}) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [orderModal, setOrderModal] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const handleSubmitReview = async (comment, rating) => {
    if (!comment || !rating || comment === '' || rating === 0) {
      ToastAndroid.show(
        'Please provide a comment and rating',
        ToastAndroid.SHORT,
      );
      return;
    }
    setIsSubmiting(true);
    try {
      await api.post('/review', {
        user: userId,
        comment,
        rating,
        id: productId,
        timestamp: new Date(),
      });
      ToastAndroid.show('Review Submitted', ToastAndroid.SHORT);
      setShowReviewModal(false);
      setIsReviewSubmit(true);
    } catch (e) {
      ToastAndroid.show('Failed to submit review', ToastAndroid.SHORT);
    } finally {
      setIsSubmiting(false);
    }
  };

  let alreadyReviewed = reviews.find(r => r.user === userId) ? true : false;
  const review = reviews.find(r => r.user === userId);
  return (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIconContainer}>
        <TouchableOpacity onPress={() => setOrderModal(true)}>
          <Image
            source={photo ? {uri: photo} : ProductPlaceholder}
            width={120}
            height={80}
            style={{borderRadius: 10, width: 120, height: 80}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.menuTextContainer}>
        <TouchableOpacity onPress={() => setOrderModal(true)}>
          <Text style={styles.menuItemText}>{title || 'Unlisted Product'}</Text>
        
          <Text style={styles.menuItemText}>${price}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                styles.menuItemText,
                {color: status === 'cancelled' ? colors.error : 'green'},
              ]}>
              {status?.toUpperCase()?.replace('_', ' ')}
            </Text>
            {status === 'delivered' && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowReviewModal(true)}>
                {isSubmiting ? (
                  <ActivityIndicator size="large" color={colors.theme._300} />
                ) : (
                  <Text style={styles.buttonText}>
                    {alreadyReviewed ? 'Reviewed' : 'Review'}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <ReviewModal
        open={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleSubmitReview}
        review={review}
      />
      <OrderDetailModal
        open={orderModal}
        onClose={() => setOrderModal(false)}
        item={item}
      />
    </Pressable>
  );
};

const ReviewModal = ({
  onClose = () => {},
  open = false,
  onSubmit = () => {},
  review,
}) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleRating = value => {
    setRating(value);
  };

  const renderStars = existingRating => {
    const stars = [];
    const maxStars = 5;
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          disabled={existingRating ? true : false}
          onPress={() => handleRating(i)}
          activeOpacity={0.7}>
          <SvgXml
            xml={i <= (existingRating || rating) ? filledStar : outlineStar} // Use existingRating if provided, else use rating
            width={24}
            height={24}
          />
        </TouchableOpacity>,
      );
    }
    return stars;
  };

  return (
    <Modal animationType="slide" transparent={true} visible={open}>
      <Pressable style={styles.modalContainer} onPress={onClose}>
        <Pressable
          style={styles.modalContent}
          onPress={e => e.stopPropagation()}>
          {review ? (
            <>
              <Text style={styles.modalHeading}>Review</Text>
              <Text style={styles.modalSubHeading}>
                How was your experience with the product?
              </Text>
              <Text style={styles.modalSubHeading}>
                {review?.timestamp}
              </Text>
              <TextInput
                style={styles.reviewInput}
                multiline
                value={review.comment}
                editable={false}
              />
              {/* Rating Stars */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 8,
                }}>
                {renderStars(review.rating)}
              </View>
            </>
          ) : (
            <>
              <Text style={styles.modalHeading}>Review</Text>
              <Text style={styles.modalSubHeading}>
                How was your experience with the product?
              </Text>
              <TextInput
                style={styles.reviewInput}
                multiline
                value={comment}
                onChangeText={setComment}
              />
              {/* Rating Stars */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 8,
                }}>
                {renderStars()}
              </View>
              <TouchableOpacity
                style={styles.reviewButton}
                onPress={() => onSubmit(comment, rating)}>
                <Text style={styles.reviewButtonText}>Submit</Text>
              </TouchableOpacity>
            </>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const OrderDetailModal = ({onClose = () => {}, open = false, item}) => {
  const { customer, date, items, quantity, orderStatus, total } = item;
  return (
    <Modal animationType="slide" transparent={true} visible={open}>
      <Pressable style={styles.modalContainer} onPress={onClose}>
        <Pressable
          style={styles.modalContent}
          onPress={e => e.stopPropagation()}>
          <>
            <View style={styles.popup}>
              <Text style={styles.title}>Order Details</Text>
              <Text style={styles.label}>Customer Name:</Text>
              <Text>{customer.user.name}</Text>
              <Text style={styles.label}>Date:</Text>
              <Text>{new Date(date).toLocaleString()}</Text>
              <Text style={styles.label}>Items:</Text>
              {items.map((item, index) => (
                <View key={index} style={styles.itemContainer}>
                  <Text>Quantity: {item.quantity}</Text>
                  <Text>Price: ${item.price}</Text>
                </View>
              ))}
              <Text style={styles.label}>Shipping Address:</Text>
              <Text>{customer.shippingAddress}</Text>
              <Text style={styles.label}>Billing Address:</Text>
              <Text>{customer.billingAddress}</Text>
              <Text style={styles.label}>Status:</Text>
              <Text>{orderStatus?.status}</Text>
              <Text>{new Date(orderStatus.timestamp).toLocaleString()}</Text>
              <Text style={styles.label}>Total:</Text>
              <Text>${total}</Text>
              <View style={styles.buttonStyle}>
                <Button title="Close" onPress={onClose} />
              </View>
            </View>
          </>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
