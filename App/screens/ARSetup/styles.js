import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  previewButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButton: {
    bottom: 0,
    height: 80,

    width: Dimensions.get('screen').width / 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewButtonText: {
    fontSize: 20,
    color: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    width: Dimensions.get('screen').width * 0.8,
    position: 'absolute',
    top: Dimensions.get('screen').height * 0.4,
    left: 35,
    textAlign: 'center',
    color: '#fff',
  },
});

export default styles;
