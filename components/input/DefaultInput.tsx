import {KeyboardTypeOptions, TextInput, View,StyleSheet} from "react-native";
import React, {useContext, useMemo, useState} from "react";
import {inputStyles} from "./styles";
import {ThemeContext} from "../../screens/Context";
import TranscribeButton from "../buttons/TranscribeButton";
import {DefaultText} from "../text/DefaultText";
import ClearButton from "../buttons/ClearButton";


export default interface DefaulttextInputTypes {
  placeholder?: string;
  value: string;
  onChangeAction?: ((text: string) => void);
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
}

const ls = StyleSheet.create(
  {
    main: {
      padding: 0,
      flexDirection: "column",
    },
    recordingButton: {
      position: "absolute",
      right: -10,
      top: 15
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
    showClearButton
  }

) => {

  const [recordingError, setRecordingError] = useState<string>("");
  const { customTheme } = useContext(ThemeContext);
  const customBackground = customTheme.primary

  const mainStyles = [ //->account no mb!!!<-
    inputStyles.defaultInput,
    extraStyles || null,
      {
        backgroundColor: customBackground,
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

  const recordingButton = useMemo(() => {
    if (recordingOption) {
      return(
        <TranscribeButton
          setTranscript={(value) => onChangeAction}
          setError={setRecordingError}
          transcript={value}
          buttonStyles={ls.recordingButton}
        />
      );
    }
  }, [recordingOption])


  return(
    <View style={ls.main}>
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
      />

      {recordingButton}
      <ClearButton
        value={value}
        setValue={onChangeAction}
      />
      {recordingErrorMessage}

    </View>
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