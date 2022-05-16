import {ToastAndroid, Platform, Alert} from 'react-native';

export const toast = (message: string) => {
  if (Platform.OS === 'ios') {
    Alert.alert(message);
    return;
  }

  ToastAndroid.show(message, ToastAndroid.SHORT);
};
