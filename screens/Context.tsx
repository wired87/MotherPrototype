import {createContext, Dispatch, SetStateAction} from "react";
import firebase from "firebase/compat";
import User = firebase.User;
import {themeColors} from "../colors/theme";

// Interface
interface PrimaryContextType {

  toggleTheme: () => void;
  darkmode: boolean;
  setUser: (value: User | null) => void;
  user: User | firebase.User | null;
  setDarkmode: (value: (((prevState: boolean) => boolean) | boolean)) => void

}

interface InputContextType {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;

  messagesLeft: string;
  setMessagesLeft: Dispatch<SetStateAction<string>>;

  messages: any; // Define a more specific type if possible
  setMessages: Dispatch<SetStateAction<any>>;

  messageIndex: number
}


export const PrimaryContext = createContext(
  {
    darkmode: false,
    setDarkmode: (() => {}) as Dispatch<SetStateAction<boolean>>,

    toggleTheme: (() => {}),

    user: null as User | null,
    setUser: (() => {}) as Dispatch<SetStateAction<User | null>>,

  });


export const InputContext = createContext({

  input: "",
  setInput: (() => {}) as Dispatch<SetStateAction<string>>,

  messagesLeft: "",
  setMessagesLeft: (() => {}) as Dispatch<SetStateAction<string>>,

  messages: [] as any[],
  setMessages: (() => {}) as Dispatch<SetStateAction<any[]>>,

  messageIndex: 0,
  setMessageIndex: (() => {}) as Dispatch<SetStateAction<number>>,

  messageBreakOption: false,
  setMessageBreakOption: (() => {}) as Dispatch<SetStateAction<boolean>>,

  typing: false,
  setTyping: (() => {}) as Dispatch<SetStateAction<boolean>>,


});

export const AuthContext = createContext({
  password: "",
  setPassword: (() => {}) as Dispatch<SetStateAction<string>>,

  email: "",
  setEmail: (() => {}) as Dispatch<SetStateAction<string>>,

  error: "",
  setError: (() => {}) as Dispatch<SetStateAction<string>>,

  modalVisible: false,
  setModalVisible: (() => {}) as Dispatch<SetStateAction<boolean>>,


});

export const FunctionContext = createContext(
  {
    sendMessageProcess: async () => {}
  }
);



export const SettingsContext = createContext({
  status: 0,
  setStatus: (() => {}) as Dispatch<SetStateAction<number>>,

  statusError: false,
  setStatusError: (() => {}) as Dispatch<SetStateAction<boolean>>,

});

////////////////// THEME


export interface Theme {
  primary: string;
  secondary: string;
  borderColor: string;
  text: string;
  placeholder: string
  navigatorColor: string;
  modalColor: string;
  secondaryContainerBackground: string;
  switchedSecondaryContainerBackground: string;
  headerIconColors: string;
  messageContainer: string;
  view: string;
  bottomSheetBg: string;
  primaryButton: string;
}

export const lightModeTheme: Theme = {
  primary: "#f0f3f7",
  secondary: themeColors.sexyBlue,
  borderColor: "rgba(37,38,38,0.76)",
  text: "#000000",
  navigatorColor: "#f0f3f7",
  modalColor: "rgba(241,236,236,0.75)",
  secondaryContainerBackground: "rgba(250,250,250,0.75)",
  switchedSecondaryContainerBackground: "rgb(37,38,38)",
  headerIconColors: "rgb(3,4,21)",
  messageContainer: "#e1e4e7",
  view: "#dfe3e8",
  bottomSheetBg: "#c2c3c5",
  placeholder: "rgba(0, 0, 0, .6)",
  primaryButton: "#01152a"

}

export const darkModeTheme: Theme = {
  primary: "rgb(24,24,24)",
  secondary: "#d6d9da",
  borderColor: "rgba(241,236,236,0.75)",
  text: "rgb(255,255,255)",
  navigatorColor: "rgb(91,91,91)",
  modalColor: "rgba(37,38,38,0.76)",
  secondaryContainerBackground: "rgba(255,255,255,0.2)",
  switchedSecondaryContainerBackground: "rgb(24,24,24)",
  headerIconColors: "rgb(255,255,255)",
  messageContainer: "rgba(105,103,103,0.4)",
  view: "rgba(66,66,66,0.1)",
  bottomSheetBg: "#38393a",
  placeholder: "rgba(255, 255, 255, .6)",
  primaryButton: "#232f44"

}
export interface ThemeContextType {
  customTheme: Theme
}

export const ThemeContext = createContext<ThemeContextType>({
  customTheme: lightModeTheme
});





/*
{
primary: "#f0f3f7",
    secondary: themeColors.sexyBlue,
    borderColor: "rgba(37,38,38,0.76)",
    text: "#000000",
    navigatorColor: "#f0f3f7",
    modalColor: "rgba(241,236,236,0.75)",
    secondaryContainerBackground: "rgba(250,250,250,0.75)",
    switchedSecondaryContainerBackground: "rgb(37,38,38)",
    headerIconColors: "rgb(3,4,21)",
    messageContainer: "#e1e4e7",
    view: "#dfe3e8",
    primary: colors.primary_darkLight[darkMode.primary ? 1 : 0],
    secondary: colors.secondary_darkLight[darkMode.secondary ? 1 : 0],
    navigatorColor: colors.navigatorColor[darkMode.navigatorColor ? 1 : 0],
    headerIconColors: colors.headerIconColors[darkMode.headerIconColors ? 1 : 0],
    switchTextColorLD: colors.switchTextColorLD[darkMode.switchTextColorLD ? 1 : 0],
    secondaryContainerBackground: colors.secondaryContainerBackground[darkMode.secondaryContainerBackground ? 1 : 0],
    view: colors.view[darkMode.view ? 1 : 0],
    switchedSecondaryContainerBackground: colors.switchedSecondaryContainerBackground[darkMode.switchedSecondaryContainerBackground ? 1 : 0],
    bool: !darkMode.bool,
    messageContainer: colors.messageContainer[darkMode.messageContainer ? 1 : 0],
    text: colors.text[darkMode.text ? 1 : 0],
    borderColor: colors.borderColor[darkMode.borderColor ? 1 : 0],
    modalColor: colors.modalColor[darkMode.modalColor ? 1 : 0],
  }
 */