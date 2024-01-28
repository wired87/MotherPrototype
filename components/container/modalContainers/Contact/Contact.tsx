import React, {memo, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {BottomSheetScrollView} from "@gorhom/bottom-sheet";
import {SettingsContext, ThemeContext} from "../../../../screens/Context";
import {HeadingText} from "../../../text/HeadingText";
import {DefaultText} from "../../../text/DefaultText";
import {StyleSheet, Vibration} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {inputStyles} from "../../../input/styles";
import {MultilineInput} from "../../../input/MultilineTextField";

import {DefaultInput} from "../../../input/DefaultInput";

import ContactAutoButton from "../../../buttons/ContactAutoButton";

const options:string[] = [
  "Security",
  "Problem",
  "Questions",
  "Praise/Criticism",
  "Other"
]

const localStyles = StyleSheet.create(
  {
    extraTextStyles: {
      marginBottom: 100,
      marginTop: 20,
      textAlign: "center"
    },
    inputExtra: {
      marginBottom: 40,
      borderRadius: 20,
    },
    headingExtras: {
      marginVertical: 30,
      fontSize: 29
    },
    contactContainer:{justifyContent: "center", alignItems: "center"}
  }
);


// STRINGS
const firstNamePlaceholder:string = "First Name";
const firstNameSetForm:string = "first_name";
const lastNamePlaceholder:string = "Last Name";
const lastNameSetForm:string = "last_name";
const emailPlaceholder:string = "e.g. E-Mail Address";
const emailSetForm:string = "e_mail";


export interface ContactFormTypes {
  first_name: string;
  last_name: string;
  e_mail: string;
  option: string;
  message: string;
}


const Contact: React.FC = () => {
  // CONTEXT
  const [fieldError, setFieldError] = useState<string>("");
  const [error, setError] = useState<string>("");
  const {setStatus} = useContext(SettingsContext);
  const {customTheme} = useContext(ThemeContext);

  const [form, setForm] = useState<ContactFormTypes>({
    option: "security",
    first_name: "",
    last_name: "",
    e_mail: "",
    message: ""
  });

  // STYLES
  const textStyles = [localStyles.extraTextStyles, {color: customTheme.text}];
  const moreTextStyles = {fontWeight: "bold"};
  const extraInputStyles = {backgroundColor: customTheme.messageContainer};

  const pickerStyles: any[] =
    [inputStyles.defaultInput, localStyles.inputExtra, extraInputStyles, {marginTop: 15, color: customTheme.text}];

  // FIELD ERROR LOGIC
  useEffect(() => {
    if (fieldError) {
      const interval = setInterval(() => {
        setFieldError("");
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [fieldError]);


  const fielErrorText = useMemo(() => {

    if (fieldError.length > 0) {
      Vibration.vibrate();
      return(
        <DefaultText error text={fieldError} moreStyles={moreTextStyles}/>
      );
    }
  }, [fieldError])


  const handleChange = (value: string, name: string | number) => {
    setForm({ ...form, [name]: value });
  };


  const sendButton = useCallback(() => {
    return <ContactAutoButton
              form={form}
              setFieldError={setFieldError}
              setError={setError}
              setResponse={setStatus}
            />
  }, [form]);





  return (
    <BottomSheetScrollView
      contentContainerStyle={localStyles.contactContainer} style={{ paddingTop : 50 }}>

      <HeadingText
        text={"Contact"}
        extraStyles={localStyles.headingExtras}
      />

      <DefaultInput
        label={"First Name"}
        placeholder={firstNamePlaceholder}
        onChangeAction={(text: any) => handleChange(text, firstNameSetForm)}
        secure={false}
        editable={true}
        extraStyles={extraInputStyles}
        keyboardType={undefined}
        value={(form as any)["first_name"]}
        noBorder
      />

      <DefaultInput
        label={"Last Name"}
        placeholder={lastNamePlaceholder}
        onChangeAction={(text: any) => handleChange(text, lastNameSetForm)}
        secure={false}
        editable={true}
        extraStyles={extraInputStyles}
        keyboardType={undefined}
        value={(form as any)["last_name"]}
        noBorder
      />

      <DefaultInput
        label={"Contact information's"}
        placeholder={emailPlaceholder}
        onChangeAction={(text: any) => handleChange(text, emailSetForm)}
        secure={false}
        editable={true}
        extraStyles={extraInputStyles}
        keyboardType={"email-address"}
        value={(form as any)["e_mail"]}
        noBorder
      />

      <Picker
        style={pickerStyles}
        selectedValue={(form as any)["option"]}
        onValueChange={(itemValue) => handleChange(itemValue, "option")}>
        {options.map((item, index) => (
          <Picker.Item style={inputStyles.defaultInput} label={item} value={item} key={index}/>
        ))}
      </Picker>

      <MultilineInput
        onChangeText={(text: string) => handleChange(text, "message")}
        placeholder={"Your Message"}
        value={(form as any)["message"]}
      />

      {fielErrorText}

      {sendButton()}

      <DefaultText
        text={"Problems with Contact form?\n Send us your E-Mail directly: info@sales-detective.live"}
        moreStyles={textStyles}
      />
    </BottomSheetScrollView>

  );
};

export default memo(Contact);
