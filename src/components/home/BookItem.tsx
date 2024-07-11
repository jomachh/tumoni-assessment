import {View, Image} from 'react-native';
import {Text} from 'react-native-paper';
import {bookItemStyles} from '../../styles/components/BookItem.styles';

export const BookItem = ({title, cover, author, isbn}: Book) => {
  return (
    <View style={bookItemStyles.container}>
      <Image
        source={{
          uri: cover,
        }}
        style={bookItemStyles.cover}
      />
      <View style={bookItemStyles.info}>
        <Text style={bookItemStyles.title}>{title}</Text>
        <Text style={bookItemStyles.author}>{author}</Text>
        <Text style={bookItemStyles.isbn}>{isbn}</Text>
      </View>
    </View>
  );
};
