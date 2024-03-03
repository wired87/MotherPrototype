import {ReactNode} from "react";

export interface StatusModalInterface {
  lottieSource: any;
  children?: ReactNode;
  changeModalVisibility: () => void;
  modalVisible: boolean;
}
export interface StatusModalContentInterface {
  lottieSource: any;
  text: string;
  child?: ReactNode;
}
export interface LockModalTypes {
  changeModalVisibility: () => void;
  headingText: string;
  handleConfirmationClick: (() => void);
  buttonText?: string;
  children?: ReactNode;
}
