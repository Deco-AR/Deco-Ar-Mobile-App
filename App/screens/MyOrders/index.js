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
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.brandName}>DECO-AR</Text>
        <SvgXml xml={ProfilePicPlaceholder} width="44" height="44" />
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
                  status={item.status}
                  price={item.total}
                  title={item.items[0]?.title}
                  photo={item.items[0]?.photo}
                  productId={item.items[0]?._id}
                  userId={user._id}
                  reviews={item.items[0]?.reviews}
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
}) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
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
      });
      ToastAndroid.show('Review Submitted', ToastAndroid.SHORT);
      setShowReviewModal(false);
    } catch (e) {
      ToastAndroid.show('Failed to submit review', ToastAndroid.SHORT);
    } finally {
      setIsSubmiting(false);
    }
  };

  let alreadyReviewed = reviews.find(r => r.user === userId) ? true : false;

  return (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIconContainer}>
        <Image
          source={photo ? {uri: photo} : ProductPlaceholder}
          width={120}
          height={80}
          style={{borderRadius: 10, width: 120, height: 80}}
        />
      </View>
      <View style={styles.menuTextContainer}>
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
              disabled={alreadyReviewed}
              onPress={() => setShowReviewModal(true)}>
              <Text style={styles.buttonText}>
                {alreadyReviewed ? 'Reviewed' : 'Review'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ReviewModal
        open={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleSubmitReview}
      />
    </Pressable>
  );
};

const ReviewModal = ({
  onClose = () => {},
  open = false,
  onSubmit = () => {},
}) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleRating = value => {
    setRating(value);
  };

  const renderStars = () => {
    const stars = [];
    const maxStars = 5;
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleRating(i)}
          activeOpacity={0.7}>
          <SvgXml
            xml={i <= rating ? filledStar : outlineStar}
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
        </Pressable>
      </Pressable>
    </Modal>
  );
};
