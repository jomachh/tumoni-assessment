import {StyleSheet} from 'react-native';

export const bottomBarStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    height: '100%',
    width: '100%',
  },
  touchable: {
    flex: 0.5,
  },
  item: {
    alignItems: 'center',
    paddingTop: 10,
    rowGap: 3,
  },
  itemText: {
    color: 'white',
  },
});
