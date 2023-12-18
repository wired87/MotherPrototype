import React, {memo, useCallback, useContext, useMemo, useState} from 'react';
import {BottomSheetScrollView, BottomSheetSectionList} from "@gorhom/bottom-sheet";
import {AuthContext, PrimaryContext, SettingsContext, ThemeContext} from "../../../../screens/Context";
import {useDispatch} from "react-redux";
import axios from "axios/index";
import {HeadingText} from "../../../text/HeadingText";
import {DefaultText} from "../../../text/DefaultText";
import {StyleSheet, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {inputStyles} from "../../../input/styles";
import {MultilineInput} from "../../../input/MultilineTextField";
import {DefaultButton} from "../../../buttons/DefaultButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {themeColors} from "../../../../colors/theme";
import {BottomSheetTextInputCustom} from "../../../input/BottomSheettextInputCustom";


const options = [
  "Security",
  "Problem",
  "Questions",
  "Praise/Criticism",
  "Other"
]

const errorMessages = [
  {
    error: "cyclical structure in JSON object",
    message: "There was an error with your input. \n Please check it and try again"
  },
  {
    error: "Cannot read property 'length' of undefined",
    message: "You forgot one Field. \n Please check an try again"
  },
  {
    error: "All Fields are required.",
    message: "All Fields are required."
  },
  {
    error: "201" || "200",
    message: "There was an error with your input. \n Please check it and try again"

  }
]

const localStyles = StyleSheet.create(
  {
    errormessageStyles: {
      marginBottom: 30,
      color: themeColors.deleteRed,
      fontSize: 17
    },
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

const firstNamePlaceholder = "First Name";
const firstNameSetForm = "first_name";

const lastNamePlaceholder = "Last Name";
const lastNameSetForm = "last_name";

const emailPlaceholder = "E-Mail Address";
const emailSetForm = "e_mail";

const postUrl = __DEV__ ?
  'http://192.168.178.51:8000/open/contact/' :
  'http://wired87.pythonanywhere.com/open/contact/';

const Contact = () => {
  const {setStatus} = useContext(SettingsContext);
  const {customTheme} = useContext(ThemeContext);

  const [submit, setSubmit] = useState(false);
  const {error, setError} = useContext(AuthContext);
  const { setLoading } = useContext(PrimaryContext);

  const matchedError =
    errorMessages.find(item => error.includes(item.error));

  const [form, setForm] = useState({
    option: "security"
  });

  const onSubmit = useCallback(async(formData: object) => {
    setSubmit(true);
    /*dispatch({
      type: 'LOADING',
      payload: true
    });*/
    setLoading(true);
    try {
      console.log("data sent: ", formData)
      const response = await axios.post(postUrl, formData);
      console.log("response:" , response.data.status)
      setStatus(response.data.status);
    } catch (error: any) {
      setError(error.message);
      console.log(error.message);
    } finally {
      setLoading(true);
      setStatus(0);
    }
  }, []);


  const matchedErrorText = useMemo(() => {
    if (matchedError) {
      return <DefaultText
                text={matchedError.message}
                moreStyles={localStyles.errormessageStyles}
              />
    }
  }, [matchedError])


  const handleChange = (value: string, name: string | number) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <BottomSheetScrollView
      contentContainerStyle={localStyles.contactContainer} style={{ paddingVertical : 50 }}>
      <HeadingText
        text={"Contact"}
        extraStyles={localStyles.headingExtras}
      />

      {matchedErrorText}

      <View>
        <BottomSheetTextInputCustom
          placeholder={firstNamePlaceholder}
          onChangeAction={(text: any) => handleChange(text, firstNameSetForm)}
          secure={false}
          editable={true}
          extraStyles={{backgroundColor: customTheme.secondaryTextInput}}

          keyboardType={undefined}
          value={(form as any)["first_name"]}
        />

        <BottomSheetTextInputCustom
          placeholder={lastNamePlaceholder}
          onChangeAction={(text: any) => handleChange(text, lastNameSetForm)}
          secure={false}
          editable={true}
          extraStyles={{backgroundColor: customTheme.secondaryTextInput}}
          keyboardType={undefined}
          value={(form as any)["last_name"]}
          />

        <BottomSheetTextInputCustom
          placeholder={emailPlaceholder}
          onChangeAction={(text: any) => handleChange(text, emailSetForm)}
          secure={false}
          editable={true}
          extraStyles={{backgroundColor: customTheme.secondaryTextInput}}
          keyboardType={"email-address"}
          value={(form as any)["e_mail"]}
        />
      </View>
      <Picker style={[inputStyles.defaultInput, localStyles.inputExtra]}
              selectedValue={(form as any)["option"]}
              onValueChange={(itemValue, itemIndex) => handleChange(itemValue, "option")}>
        {options.map((item, index) => (
          <Picker.Item style={inputStyles.defaultInput} label={item} value={item} key={index}/>
        ))}
      </Picker>

      <MultilineInput
        onChangeText={(text: string) => handleChange(text, "message")}
        placeholder={"Your Message"}
        value={(form as any)["message"]}
      />

      <DefaultButton
        extraStyles={undefined}
        onPressAction={() => onSubmit(form)}
        text={"Send"}
        secondIcon={
          <MaterialCommunityIcons name={"email-open-multiple-outline"} size={18} color="white" />
        }
      />
      <DefaultText
        text={"Problems with Contact form?\n Send us your E-Mail directly: info@sales-detective.live"}
        moreStyles={[localStyles.extraTextStyles, {color: customTheme.text}]}
      />
    </BottomSheetScrollView>
  );
};
export default memo(Contact);

/*
<>
            <HeadingText
              text={"Contact"}
              extraStyles={localStyles.headingExtras}
            />
            {(matchedError? (
              <DefaultText
                text={matchedError.message}
                moreStyles={localStyles.errormessageStyles}
              />
            ):null)}
            <View>
              {inputOptions.map((item, index) => (
                <DefaultInput
                  key={index}
                  placeholder={item.placeholder}
                  onChangeAction={(text: any) => handleChange(text, item.name)}
                  secure={false}
                  editable={true}
                  extraStyles={undefined}
                  keyboardType={item.name === "e_mail" ? "email-address" : undefined}
                  value={
                    index === 0 ? (form as any)["first_name"] :
                    index === 1 ? (form as any)["last_name"] :
                    index === 2 ? (form as any)["e_mail"]: null}
                />
              ))}
            </View>
            <Picker style={[inputStyles.defaultInput, localStyles.inputExtra]}
                    selectedValue={(form as any)["option"]}
                    onValueChange={(itemValue, itemIndex) => handleChange(itemValue, "option")}>
                {options.map((item, index) => (
                  <Picker.Item style={inputStyles.defaultInput} label={item} value={item} key={index}/>
                ))}
            </Picker>

            <MultilineInput
              onChangeText={(text: string) => handleChange(text, "message")}
              placeholder={"Your Message"}
              value={(form as any)["message"]}
            />

            <DefaultButton
              extraStyles={undefined}
              onPressAction={() => onSubmit(form)}
              text={"Send"}
              secondIcon={
                  <MaterialCommunityIcons name={"email-open-multiple-outline"} size={18} color="white" />
              }
            />
            <DefaultText
              text={"Problems with Contact form?\n Send us your E-Mail directly: info@sales-detective.live"}
              moreStyles={[localStyles.extraTextStyles, {color: customTheme.text}]}
            />
          </>
 */