import {KeyboardTypeOptions, TextInput, View,StyleSheet} from "react-native";
import React, {Dispatch, SetStateAction, useCallback, useContext, useMemo, useState} from "react";
import {inputStyles} from "./styles";
import {ThemeContext} from "../../screens/Context";
import TranscribeButton from "../buttons/TranscribeButton";
import {DefaultText} from "../text/DefaultText";
import ClearButton from "../buttons/ClearButton";


export default interface DefaulttextInputTypes {
  placeholder?: string;
  value: string;
  onChangeAction?: ((text: string) => void) | Dispatch<SetStateAction<string>>;
  secure?: boolean;
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  extraStyles?: object;
  multiline?: boolean;
  numberOfLines?: number;
  max_length?: number;
  noBorder?: boolean;
  recordingOption?: boolean;
  showClearButton?: boolean;
  label?: string;
}

const ls = StyleSheet.create(
  {
    main: {
      marginTop: 15,
      padding: 0,
      flexDirection: "column",
      justifyContent:"flex-end",

    },
    recordingButton: {
      position: "absolute",
      right: -5,
      bottom: 0
    },
    labelText: {
      fontSize: 13,
      fontFamily: "JetBrainsMono"
    },
    clearContainer: {
      position: "absolute",
      bottom: 15,
      right: 10,
    }
  }
)




// @ts-ignore
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
    recordingOption,
    showClearButton,
    label
  }

) => {

  const [recordingError, setRecordingError] = useState<string>("");
  const { customTheme } = useContext(ThemeContext);

  const mainStyles = [ //->account no mb!!!<-
    inputStyles.defaultInput,
    extraStyles || null,
      {
        color: customTheme.text,
        borderWidth: noBorder? 0:1,
        borderColor: noBorder? "transparent" : customTheme.text
      }
    ];

  const recordingErrorMessage = useMemo(() => {
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


  return(
    <>
    <View style={ls.main}>
      {
        labelComponent()
      }
      <TextInput
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

      {label && label.length == 0?(
        <TranscribeButton
          setTranscript={() => onChangeAction}
          setError={setRecordingError}
          transcript={value}
          buttonStyles={ls.recordingButton}
        />
      ): label && label.length > 0?(
        <ClearButton value={value} setValue={onChangeAction} ms={ls.clearContainer} />
      ):null}
    </View>
    {recordingErrorMessage}
    </>
  );
}

/* KEYBOARD TYPES
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