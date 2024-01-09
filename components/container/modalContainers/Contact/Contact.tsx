import React, {memo, useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import {BottomSheetScrollView} from "@gorhom/bottom-sheet";
import {JwtToken, PrimaryContext, SettingsContext, ThemeContext} from "../../../../screens/Context";
import {HeadingText} from "../../../text/HeadingText";
import {DefaultText} from "../../../text/DefaultText";
import {StyleSheet, Vibration} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {inputStyles} from "../../../input/styles";
import {MultilineInput} from "../../../input/MultilineTextField";
import {DefaultButton} from "../../../buttons/DefaultButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {themeColors} from "../../../../colors/theme";
import {DefaultInput} from "../../../input/DefaultInput";
import {sendObject} from "../../../../screens/chat/functions/SendProcess";
import {getToken} from "../../../../AppFunctions";
import {CONTACT_REQUEST_URL} from "@env";

const options = [
  "Security",
  "Problem",
  "Questions",
  "Praise/Criticism",
  "Other"
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

const firstNamePlaceholder:string = "First Name";
const firstNameSetForm:string = "first_name";

const lastNamePlaceholder:string = "Last Name";
const lastNameSetForm:string = "last_name";

const emailPlaceholder:string = "E-Mail Address";
const emailSetForm:string = "e_mail";

const postUrl:string = CONTACT_REQUEST_URL;

const Contact: React.FC = () => {
  // CONTEXT
  const [fieldError, setFieldError] = useState<boolean>(false);

  const {setStatus} = useContext(SettingsContext);
  const {customTheme} = useContext(ThemeContext);
  const { setLoading,
    jwtToken,
    setJwtToken
  } = useContext(PrimaryContext);


  const [form, setForm] = useState({
    option: "security"
  });

  // STYLES
  const textStyles = [localStyles.extraTextStyles, {color: customTheme.text}];
  const moreTextStyles = {fontWeight: "bold"};

  const jwtTokenRef = useRef<JwtToken | null>(null);


  useEffect(() => {
    console.log("jwt changed in ChatNavigator:", jwtToken);
    jwtTokenRef.current = jwtToken;
    console.log("jwt ref:", jwtTokenRef.current);
  }, [jwtToken]);


  const handleSubmit = useCallback(async () => {
    if (!(form as any)["message"] || (form as any)["message"].length === 0) {
      console.log("len of messages === 0. Provide some Text...")
      setFieldError(true);
    }else{
      console.log("Submit initialized...");
      await onSubmit(form);
    }
  }, [form])


  const onSubmit = useCallback(async(formData: object) => {
    console.log("jwtToken11111111111111:", jwtToken)
    setLoading(true);
    setFieldError(false);
    let response;
    try {
      if (jwtToken?.refresh && jwtToken.access) {
        console.log("data sent: ", formData);
        response = await sendObject(
          formData,
          jwtToken,
          setJwtToken,
          postUrl
        );
      }else{
        console.error("No token provided");
        const newToken = await getToken(setJwtToken);
        if (newToken) {
          response = await sendObject(
            formData,
            newToken,
            setJwtToken,
            postUrl
          );
        }else {
          console.error("New Token request failed...");
          setStatus(300);
        }
      }
      if (response) {
        console.log("response Successfully:" , response);
        setStatus(response);
      }else {
        console.log("Response returned no result...")
        setStatus(500);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setStatus(500);
        console.error("Error while contact submit occurred:", e.message);
      }
    } finally {
      console.log("Contact POST function finished...");
      setLoading(false);
    }
  }, [jwtToken]);


  const fielErrorText = useMemo(() => {

    if (fieldError) {
      Vibration.vibrate();
      return(
        <DefaultText error text={'Field "Message" is required'} moreStyles={moreTextStyles}/>
      );
    }
  }, [fieldError])


  const handleChange = (value: string, name: string | number) => {
    setForm({ ...form, [name]: value });
  };


  const pickerStyles: any[] =
    [inputStyles.defaultInput, localStyles.inputExtra, {backgroundColor: customTheme.primary, color: customTheme.text}];


  return (
    <BottomSheetScrollView
      contentContainerStyle={localStyles.contactContainer} style={{ paddingTop : 50 }}>

      <HeadingText
        text={"Contact"}
        extraStyles={localStyles.headingExtras}
      />

      <DefaultInput
        placeholder={firstNamePlaceholder}
        onChangeAction={(text: any) => handleChange(text, firstNameSetForm)}
        secure={false}
        editable={true}
        extraStyles={undefined}
        keyboardType={undefined}
        value={(form as any)["first_name"]}
      />

      <DefaultInput
        placeholder={lastNamePlaceholder}
        onChangeAction={(text: any) => handleChange(text, lastNameSetForm)}
        secure={false}
        editable={true}
        extraStyles={/*{backgroundColor: customTheme.secondaryTextInput}*/undefined}
        keyboardType={undefined}
        value={(form as any)["last_name"]}
      />

      <DefaultInput
        placeholder={emailPlaceholder}
        onChangeAction={(text: any) => handleChange(text, emailSetForm)}
        secure={false}
        editable={true}
        extraStyles={{backgroundColor: customTheme.secondaryTextInput}}
        keyboardType={"email-address"}
        value={(form as any)["e_mail"]}
      />

      <Picker style={pickerStyles}
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

      <DefaultButton
        extraStyles={undefined}
        onPressAction={() => handleSubmit()}
        text={"Send"}
        secondIcon={
          <MaterialCommunityIcons name={"email-open-multiple-outline"} size={18} color="white" />
        }
      />
      <DefaultText
        text={"Problems with Contact form?\n Send us your E-Mail directly: info@sales-detective.live"}
        moreStyles={textStyles}
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