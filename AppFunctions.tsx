import * as SecureStore from "expo-secure-store";
import {Alert} from "react-native";
import * as Linking from "expo-linking";
import {JwtToken} from "./screens/Context";

const eMailBody: string = "Hey, i detected a security Problem while try set the JwtToken!"
const errorUrl: string = `https://mail.google.com/mail/?view=cm&fs=1&to=codingWizardaix@gmail.com&su=Error-while-Application-Process-detected&body=${eMailBody}`

export const checkTokenAvailability = async (): Promise<JwtToken | null> => {
  const JwtToken = await SecureStore.getItemAsync("JwtData");
  if (JwtToken) {
    return JSON.parse(JwtToken);
  }
  return null;
}



export const saveJwtToken = async (data: JwtToken) => {
  await SecureStore.setItemAsync("JwtData", String(data));
}


// URLS

export const alert = () => {
  Alert.alert(
    'Security Problem detected',
    'Please contact the Support-Team ASAP to solve it!',
    [
      {
        text: 'close',
        onPress: () => console.log('Ask me later pressed'),
        style: 'cancel',
      },
      {
        text: 'Contact us',
        onPress: () => Linking.openURL(errorUrl),
        style: 'destructive',
      },
    ]
  );
}