import {Dimensions, StyleSheet} from 'react-native';
import {colors, fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.theme._300,
  },
  brandName: {
    fontSize: fonts.size.h5,
    fontFamily: fonts.type.bold,
    color: colors.dark,
  },
  topContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.2,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomContainer: {
    backgroundColor: colors.theme._100,
    padding: 40,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: Dimensions.get('window').width,
    minHeight: Dimensions.get('window').height * 0.8,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  containerHeading: {
    fontSize: fonts.size.h4,
    fontFamily: fonts.type.medium,
    color: colors.dark,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  taglineContainer: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
  },
  tagline1: {
    fontSize: fonts.size.label,
    fontFamily: fonts.type.regular,
    color: colors.dark,
  },
  tagline2: {
    fontSize: fonts.size.label,
    fontFamily: fonts.type.medium,
    color: colors.theme._300,
    textAlign: 'center',
  },
  button: {
    height: 48,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.8,
    marginVertical: 12,
  },
  signInButton: {
    backgroundColor: colors.theme._300,
  },
  buttonText: {
    color: colors.dark,
    fontFamily: fonts.type.medium,
    fontSize: fonts.size.p,
  },
  error: {
    color: colors.error,
    fontFamily: fonts.type.regular,
    fontSize: fonts.size.label,
    textAlign: 'center',
  },
});
