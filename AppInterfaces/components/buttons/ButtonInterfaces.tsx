import {Dispatch, SetStateAction} from "react";

export interface TranscribeButtonTypes {
  setTranscript: Dispatch<SetStateAction<string>>; //((text:string) => void);//
  setError: Dispatch<SetStateAction<string>>;
  buttonIcon?: string;
  buttonStyles?: any;
  transcript: string;
}

export interface SwitchButtonInterface {
  action: () => void;
}