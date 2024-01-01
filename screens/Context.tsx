import {createContext, Dispatch, SetStateAction} from "react";

import {themeColors} from "../colors/theme";
import {Recording} from "expo-av/build/Audio/Recording";
import firebase from "firebase/compat";


export const PrimaryContext = createContext(
  {
    darkmode: false,
    setDarkmode: (() => {}) as Dispatch<SetStateAction<boolean>>,

    toggleTheme: (() => {}),

    user: null as firebase.User | null,
    setUser: (() => {}) as Dispatch<SetStateAction<firebase.User | null>>,

    loading: false,
    setLoading: (() => {}) as Dispatch<SetStateAction<boolean>>,

    clearMessages: false,
    setClearMessages: (() => {}) as Dispatch<SetStateAction<boolean>>,

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

  currentRecording: false,
  setCurrentRecording: (() => {}) as Dispatch<SetStateAction<boolean>>,

  userRecording: null as Recording | null,
  setUserRecording: (() => {}) as Dispatch<SetStateAction<any>>

});

export const ToolContext= createContext(
  {
    toolActionValue: "",
    setToolActionValue: (() => {}) as Dispatch<SetStateAction<string>>,
  }
)

export const ResumeContext= createContext(
  {
    resume: "",
    setResume: (() => {}) as Dispatch<SetStateAction<string>>,

  }
)

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
    sendMessageProcess: async () => {},
    checkMessagesLeftProcess: async (): Promise<boolean> => false,

  }
);

export const SettingsContext = createContext({
  status: 0,
  setStatus: (() => {}) as Dispatch<SetStateAction<number>>,

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
  secondaryTextInput: string;
  secondaryBorderColor: string;
  errorText: string;
  textMessage: string;
  aiTextMessage: string;
  mirageChatMainColor: string;
  categoryButton: string;
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
  headerIconColors: "rgba(3,4,21, .7)",
  messageContainer: "#e1e4e7",
  view: "#dfe3e8",
  bottomSheetBg: "rgba(255,255,255,0.6)",
  placeholder: "rgba(0, 0, 0, .6)",
  primaryButton: "#01152a",
  secondaryTextInput: "rgba(255,255,255, 1)",
  secondaryBorderColor: "rgba(0,0,0,.2)",
  errorText: 'rgb(110,0,0)',
  textMessage: "transparent",//"rgba(0,0,0, .1)",
  aiTextMessage: "rgba(0,0,0,.2)",
  mirageChatMainColor: "rgba(1,21,42,0.42)",
  categoryButton: "rgba(0,0,0,0.76)",


}

export const darkModeTheme: Theme = {
  primary: "rgb(24,24,24)",
  secondary: "#d6d9da",
  borderColor: "rgba(241,236,236,0.75)",
  text: "rgb(255,255,255)",
  navigatorColor: "#f0f3f7",
  modalColor: "rgba(37,38,38,0.76)",
  secondaryContainerBackground: "rgba(255,255,255,0.2)",
  switchedSecondaryContainerBackground: "rgb(24,24,24)",
  headerIconColors: "rgb(255,255,255)",
  messageContainer: "rgba(105,103,103,0.4)",
  view: "rgba(66,66,66,0.1)",
  bottomSheetBg: "rgba(189,189,189,0.24)",
  placeholder: "rgba(255, 255, 255, .6)",
  primaryButton: "#232f44",
  secondaryTextInput: "rgba(255,255,255, .6)",
  secondaryBorderColor: "rgba(255,255,255, .6)",
  errorText: 'rgb(148,27,27)',
  textMessage: "transparent", //"rgba(255,255,255, .1)", //"rgba(35,47,68,0.76)", //"rgba(255,255,255,0.44)",
  aiTextMessage: "rgba(215,215,215,0.2)",
  mirageChatMainColor: "rgba(255,255,255, .6)",
  categoryButton: "rgba(255,255,255,0.1)",

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