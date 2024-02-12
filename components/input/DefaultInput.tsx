import {KeyboardTypeOptions, TextInput, View,StyleSheet} from "react-native";
import React, {Dispatch, SetStateAction, useCallback, useContext, useEffect, useState} from "react";
import {inputStyles} from "./styles";
import {ThemeContext} from "../../screens/Context";
import {DefaultText} from "../text/DefaultText";
import ClearButton from "../buttons/ClearButton";
import {toolStyles} from "../../screens/tools/toolStyles";
import {SpeechErrorEvent} from "@react-native-voice/voice";
import {MotherTranscriptButton} from "../buttons/MotherTranscriptButton";


export default interface DefaulttextInputTypes {
  placeholder?: string;
  value: string;
  onChangeAction: Dispatch<SetStateAction<string>>;
  secure?: boolean;
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  extraStyles?: object;
  multiline?: boolean;
  numberOfLines?: number;
  max_length?: number;
  noBorder?: boolean;
  label?: string;
  recordingButton?: boolean
}


export const DefaultInput: React.FC<DefaulttextInputTypes> = (
  {
    placeholder,
    value,
    onChangeAction,
    editable,
    keyboardType,
    extraStyles,
    multiline,
    numberOfLines,
    max_length,
    noBorder,
    label,
    recordingButton
  }

) => {
  const [error, setError] = useState<string>("");
  const setInputTranscript = (text:string) => {
    if (onChangeAction) {
      console.log("Try set Transcript...")
      onChangeAction(text);
    }
  }
  const [recordingError, setRecordingError] = useState<string>("");
  const { customTheme } = useContext(ThemeContext);

  const mainContainerStyles: object[] = [toolStyles.justifyAlign, {flexDirection: "column"}];
  const mainStyles = [ //->account no mb!!!<-
    inputStyles.defaultInput,
    extraStyles || null,
      {
        color: customTheme.text,
        borderWidth: noBorder? 0:1,
        borderColor: noBorder? "transparent" : customTheme.text,

      }
    ];


  useEffect(() => {
    if (recordingError.length > 0) {
      setTimeout(() => {
        console.log("4 sec...")
        setRecordingError("");
      }, 3000);
      console.log("0 sec...")
    }
  }, [recordingError]);


  const recordingErrorMessage = useCallback(() => {
    if (recordingError.length > 0) {
      return(
        <DefaultText error text={recordingError}/>
      );
    }
  }, [recordingError])



  const labelComponent = useCallback(() => {
    if (label && label.length > 0) {
      return <DefaultText text={label} moreStyles={ls.labelText} />
    }else {
      return <></>
    }
  }, [label]);



  const onSpeechError = useCallback((e: SpeechErrorEvent) => {
    if (e.error && e.error.message) {
      setError(e.error.message.toString());
    } else {
      setError("An error has occurred while trying to transcribe: " + e.toString());
    }
  }, [setError]);


  const onSpeechResults = (r: any) => {
    const newTranscript:string = value + " " + r.value[0] + " ";
    onChangeAction? onChangeAction(newTranscript) : null;
  }

  const inputButton = useCallback(() => {
    if (value && value.length > 0) {
      return <ClearButton value={value} setValue={onChangeAction} ms={ls.clearContainer}/>
    } else if (recordingButton) {
      return (
        <MotherTranscriptButton
          key={"Udo"}
          buttonStyles={ls.recordingButton}
          onSpeechError={onSpeechError}
          onSpeechResults={onSpeechResults}
        />
      )
    }
  }, [
    onSpeechError,
    onSpeechResults,
    recordingButton,
    value,
    onChangeAction,
  ]);


  return(
    <View style={mainContainerStyles}>
      <View style={ls.main}>
        {
          labelComponent()
        }
        <TextInput
          cursorColor={customTheme.placeholder}
          selectionColor={customTheme.errorText}
          multiline={multiline || false}
          numberOfLines={numberOfLines || 1}
          style={mainStyles}
          placeholder={placeholder}
          placeholderTextColor={customTheme.placeholder}
          secureTextEntry={false}
          autoCapitalize={"none"}
          value={value}
          maxLength={max_length || undefined}
          onChangeText={onChangeAction}
          editable={editable || true}
          keyboardType={keyboardType}
          blurOnSubmit={true}
          accessibilityLabel={label || ""}
        />
        {
          inputButton()
        }
      </View>
      {
        recordingErrorMessage()
      }
    </View>
  );
}


const ls = StyleSheet.create(
  {
    main: {
      flexDirection: "column",
      justifyContent:"flex-end",
    },
    recordingButton: {
      position: "absolute",
      right: 0,
      bottom: 15
    },
    labelText: {
      fontSize: 13,
      fontFamily: "JetBrainsMono",
      marginTop: 10,
    },
    clearContainer: {
      position: "absolute",
      right: -30,
      top: 10,
      height: 55,
      width: 55
    }
  }
)

/* KEYBOARD TYPES

{value && value.length == 0?(
        <TranscribeButton
          setTranscript={() => onChangeAction}
          setError={setRecordingError}
          transcript={value}
          buttonStyles={ls.recordingButton}
        />
      ): value && value.length > 0?(
        <ClearButton value={value} setValue={onChangeAction} ms={ls.clearContainer} />
      ):null}









"default",
'numeric',
'email-address',
"ascii-capable",
'numbers-and-punctuation',
'url',
'number-pad',
'phone-pad',
'name-phone-pad',
'decimal-pad',
'twitter',
'web-search',
'visible-password'


 */