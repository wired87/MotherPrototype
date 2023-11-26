import React, {createContext, Dispatch, MutableRefObject, SetStateAction} from "react";
import firebase from "firebase/compat";
import User = firebase.User;
import {colors as c, darkmode as d} from "../Redux/Actions";
import {RefreshControlBase} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";

const darkMode = d.value;
const colors = c.value;



// Interface
interface PrimaryContextType {

  toggleTheme: () => void;
  darkmode: boolean;
  setUser: (value: (((prevState: (firebase.User | null)) => (firebase.User | null)) | firebase.User | null)) => void;
  user: firebase.User | null;
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


export const PrimaryContext= createContext(
  {
    darkmode: false,
    setDarkmode: (() => {}) as Dispatch<SetStateAction<boolean>>,

    toggleTheme: (() => {}),

    user: null as User | null,
    setUser: (() => {}) as Dispatch<SetStateAction<User | null>>,

    bottomSheetRef: React.createRef<BottomSheetMethods>(),

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
export const SettingsContext = createContext({
  status: 0,
  setStatus: (() => {}) as Dispatch<SetStateAction<number>>,

  statusError: false,
  setStatusError: (() => {}) as Dispatch<SetStateAction<boolean>>,

});

/*
{
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