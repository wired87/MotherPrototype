import {HeadingText} from "../../../text/HeadingText";
import {DefaultText} from "../../../text/DefaultText";
import {StyleSheet, View} from "react-native";
import {DefaultInput} from "../../../input/DefaultInput";
import {Picker} from "@react-native-picker/picker";
import {inputStyles} from "../../../input/styles";
import {MultilineInput} from "../../../input/MultilineTextField";
import {DefaultButton} from "../../../buttons/DefaultButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, {Dispatch, RefObject, SetStateAction, useCallback, useContext, useEffect, useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {AuthContext, ThemeContext} from "../../../../screens/Context";
import BottomSheet from "@gorhom/bottom-sheet";
import {themeColors} from "../../../../colors/theme";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";


const inputOptions = [
  {
    placeholder: "First Name",
    name: "first_name"
  },
  {
    placeholder: "Last Name",
    name: "last_name"
  },
  {
    placeholder: "E-Mail",
    name: "e_mail"
  }

]

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
  }
);


interface ContactDefaultTypes {
  status?: number | string | null;
  setStatus: React.Dispatch<React.SetStateAction<number>>;
  bottomSheetRef: RefObject<BottomSheetMethods> ;
}
export const ContactDefault: React.FC<ContactDefaultTypes> = (
  {
    status,
    setStatus,
    bottomSheetRef
  }
) => {
 const {customTheme} = useContext(ThemeContext);



  const dispatch = useDispatch()
  const [submit, setSubmit] = useState(false);
  const [seconds, setSeconds] = useState(5);
  const {error, setError} = useContext(AuthContext);

  const matchedError =
    errorMessages.find(item => error.includes(item.error));

  const [form, setForm] = useState({
    option: "security"
  });

  const onSubmit = useCallback(async(formData: object) => {
    setSubmit(true);
    dispatch({
      type: 'LOADING',
      payload: true
    });
    try {
      console.log("data sent: ", formData)
      const response = await axios.post('http://192.168.178.51:8000/open/contact/', formData);
      console.log("response:" , response.data.status)
      setStatus(response.data.status);
    } catch (error: any) {
      setError(error.message);
      console.log(error.message);
    } finally {
      dispatch({
        type: 'LOADING',
        payload: false
      });
      setStatus(0);
    }
  }, []);

  const handleChange = (value: string, name: string | number) => {
    setForm({ ...form, [name]: value });
  };

  return(
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
  );
}
/*

  // Use the useEffect hook to handle the countdown logic
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (status === 200 || status === 201) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            clearInterval(interval);
            if (bottomSheetRef && bottomSheetRef.current) {bottomSheetRef?.current?.close()}
            return 0;
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [submit]);
 */