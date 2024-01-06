import * as SecureStore from "expo-secure-store";
import {Alert} from "react-native";
import * as Linking from "expo-linking";
import {JwtToken} from "./screens/Context";
import RNRestart from 'react-native-restart';
const eMailBody: string = "Hey, i detected a security Problem while try set the JwtToken!"
const errorUrl: string = `https://mail.google.com/mail/?view=cm&fs=1&to=codingWizardaix@gmail.com&su=Error-while-Application-Process-detected&body=${eMailBody}`

export const checkTokenAvailability = async (): Promise<JwtToken | null> => {
  try {
    const JwtToken = await SecureStore.getItemAsync("JwtData");
    console.log("JWtToken:", JwtToken);
    if (JwtToken) {
      const parsedToken = JSON.parse(JwtToken);
      console.log("parsedToken", parsedToken)
      return parsedToken;
    }
  }catch(e: unknown){

    if (e instanceof Error)
      console.error("Could not get the JwtToken from SecureStore:", e);
  }
  return null;
}

export const saveJwtToken = async (data: JwtToken) => {
  const jsonData = JSON.stringify(data);
  await SecureStore.setItemAsync("JwtData", jsonData);
}


// URLS

export const alert = () => {
  Alert.alert(
    'Too many requests',
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

export const connectionAlert = () => {
  Alert.alert(
    'No internet connection detected',
    `You need a internet connection to use our service. \nYou think that's an issue? Please report it and we check it ASAP`,
    [
      {
        text: 'close',
        onPress: () => console.log('Ask me later pressed'),
        style: 'cancel',
      },
      {
        text: 'refresh App',
        onPress: () => RNRestart.restart(),
        style: 'destructive',
      },
    ]
  );
}