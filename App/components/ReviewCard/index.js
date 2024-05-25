// src/components/ReviewCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../../theme';

const ReviewCard = ({ photo, name, comment }) => {
  return (
    <View style={styles.card}>
      <Image
        style={styles.profilePic}
        source={{ uri: photo }}
        resizeMode={"cover"}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.reviewMessage}>{comment}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: colors.theme._300,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewMessage: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
});

export default ReviewCard;
