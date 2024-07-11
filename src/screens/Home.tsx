import {FlatList, RefreshControl, View} from 'react-native';
import {useBookList} from '../hooks/useBookList';
import {DotsLoader} from '../components/ui/DotsLoader';
import {Text, useTheme} from 'react-native-paper';
import {BookItem} from '../components/home/BookItem';
import {BottomBar} from '../components/home/BottomBar';
import {useAuth} from '../hooks/useAuth';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SCREENS} from '../constants/screens';
import {RootStackParamList} from '../types/react-navigation';
import {useEffect} from 'react';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList, SCREENS.HOME>;

export const Home = ({navigation}: Props) => {
  const theme = useTheme();
  const {signOut, updateUser} = useAuth();
  const {books, loading, error, fetchBooks} = useBookList();

  const handleSignOut = () => {
    signOut().then(() => {
      updateUser(null);
      navigation.replace(SCREENS.SIGNIN);
    });
  };

  useEffect(() => {
    if (error?.message?.length) {
      Toast.show({
        type: 'error',
        text1:
          error?.status === 401 ? "You're session has expired" : error?.message,
        position: 'bottom',
      });
    }

    if (error?.status === 401) {
      handleSignOut();
    }
  }, [error]);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.87}}>
        <FlatList
          data={books}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={fetchBooks}
              colors={[theme.colors.primary]}
            />
          }
          keyExtractor={item => item.isbn}
          renderItem={({item}) => <BookItem {...item} />}
          ListEmptyComponent={
            <View>
              {loading ? (
                <DotsLoader color={theme.colors.primary} />
              ) : (
                <Text>{error?.message}</Text>
              )}
            </View>
          }
        />
      </View>
      <View style={{flex: 0.13}}>
        <BottomBar signOut={handleSignOut} refresh={fetchBooks} />
      </View>
    </View>
  );
};
