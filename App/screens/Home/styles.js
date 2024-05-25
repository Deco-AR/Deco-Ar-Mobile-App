import { Dimensions, StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';

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
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  bottomContainer: {
    backgroundColor: colors.theme._100,
    paddingHorizontal: 20,
    paddingTop: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.68,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  containerHeading: {
    fontSize: fonts.size.h5,
    fontFamily: fonts.type.medium,
    color: colors.dark,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 30,
  },
  profilePreviewCard: {
    width: Dimensions.get('window').width * 0.8,
    flexDirection: 'row',
    padding: 15,
    gap: 5,
    borderRadius: 16,
    backgroundColor: '#FFEFD0',
    shadowColor: 'rgba(0, 0, 0, 0.20)',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 4,
  },
  displayName: {
    fontSize: fonts.size.label,
    fontFamily: fonts.type.bold,
    color: colors.dark,
  },
  iconBg: {
    backgroundColor: colors.theme._300,
    borderRadius: 50,
    padding: 5,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContainer: {
    width: Dimensions.get('window').width * 0.8,
    marginVertical: 35,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: colors.theme._300,
    borderRadius: 15,
    gap: 18,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  menuItemText: {
    fontSize: fonts.size.label,
    fontFamily: fonts.type.medium,
    color: colors.dark,
  },
  tagline1: {
    width: Dimensions.get('window').width * 0.8,
    fontSize: fonts.size.h5,
    fontFamily: fonts.type.regular,
    color: colors.dark,
    marginTop:5
  },
  tagline2: {
    fontSize: fonts.size.h4,
    fontFamily: fonts.type.bold,
    color: colors.dark,
  },
  button: {
    height: 48,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.8,
    marginVertical: 12,
    flexDirection: 'row',
    gap: 6,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
  },
  searchInput: {
    flex: 1,
    fontSize: fonts.size.label,
    fontFamily: fonts.type.regular,
    color: colors.dark,
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 12,
  },
  selectedFilterBg: {
    backgroundColor: colors.dark,
  },
  filterBg: {
    backgroundColor: colors.theme._200,
  },
  filter: {
    borderRadius: 40,
    minWidth: 80,
    paddingVertical: 8,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2
  },
  filterText: {
    fontSize: fonts.size.label,
    fontFamily: fonts.type.medium,
    color: colors.dark,
  },
  selectedFilterText: {
    color: colors.theme._300,
    fontSize: fonts.size.label,
    fontFamily: fonts.type.medium,
  },
});
