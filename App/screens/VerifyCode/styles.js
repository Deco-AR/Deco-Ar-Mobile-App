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
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.4,
    padding: 18,
  },
  bottomContainer: {
    backgroundColor: colors.theme._100,
    padding: 40,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: Dimensions.get('window').width,
    minHeight: Dimensions.get('window').height * 0.55,
    position: 'absolute',
    bottom: 0,
  },
  containerHeading: {
    fontSize: fonts.size.h2,
    fontFamily: fonts.type.medium,
    color: colors.dark,
    textAlign: 'center',
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
  inputs: {
    backgroundColor: colors.white,
    borderRadius: 15,
    width: Dimensions.get('window').width * 0.8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 26,
  },
  input: {
    paddingLeft: 21,
    fontSize: fonts.size.label,
    fontFamily: fonts.type.regular,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    width: '100%',
  },
  button: {
    height: 48,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.8,
    marginBottom: 12,
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
