import {StyleSheet} from 'react-native';

export const bookItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    marginTop: 15,
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  cover: {
    width: 100,
    height: 150,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  author: {
    fontSize: 14,
    flex: 1,
  },
  isbn: {
    fontSize: 12,
  },
});
