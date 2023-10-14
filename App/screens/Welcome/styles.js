import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.theme._100,
  },
  topContainer: {
    margin: 20,
  },
  brandName: {
    fontSize: fonts.size.h2,
    fontFamily: fonts.type.bold,
    color: colors.dark,
  },
  brandSlogan: {
    fontSize: fonts.size.h2,
    fontFamily: fonts.type.bold,
    color: colors.dark,
  },
  brandDescription: {
    fontSize: fonts.size.h3,
    fontFamily: fonts.type.regular,
    color: colors.dark,
    marginTop: 50,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 48,
    alignItems: 'center',
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    backgroundColor: colors.white,
  },
  containerHeading: {
    color: colors.dark,
    fontFamily: fonts.type.bold,
    fontSize: fonts.size.h2,
    marginBottom: 30,
  },
  buttonSolid: {
    width: '80%',
    height: 48,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.theme._300,
    marginBottom: 18,
  },
  button: {
    width: '80%',
    height: 48,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.theme._300,
  },
  buttonText: {
    color: colors.dark,
    fontFamily: fonts.type.medium,
    fontSize: fonts.size.p,
  },
});
