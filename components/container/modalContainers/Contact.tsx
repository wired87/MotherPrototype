import React, { useState, useEffect } from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import axios from 'axios';
import {inputStyles} from "../../input/styles";

import {HeadingText} from "../../text/HeadingText";
import {DefaultInput} from "../../input/DefaultInput"; // Assuming this is adapted for React Native
import {Picker} from '@react-native-picker/picker';
import {DefaultButton} from "../../buttons/DefaultButton";
import {DefaultText} from "../../text/DefaultText";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {MultilineInput} from "../../input/MultilineTextField";
import {useDispatch, useSelector} from "react-redux";
import {themeColors} from "../../../colors/theme";
import LottieView from "lottie-react-native";

const options = [
    "Security",
    "Problem",
    "Questions",
    "Praise/Criticism",
    "Other"
]

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




// @ts-ignore
export const Contact = ({ closeModal }) => {
    const [submit, setSubmit] = useState(false);
    const [seconds, setSeconds] = useState(5);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        option: "security"
    });

    const dispatch = useDispatch()

    // @ts-ignore
    const loading = useSelector(state => state.loading.value)

    // Use the useEffect hook to handle the countdown logic
    useEffect(() => {
        let interval: string | number | NodeJS.Timeout | undefined;
        if (status === 200 || status === 201) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds <= 1) {
                        clearInterval(interval);
                        closeModal();
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



    // @ts-ignore
    const onSubmit = async (formData) => {
        setSubmit(true);
        dispatch({
            type: 'LOADING',
            payload: true
        });
        try {
          console.log("data sent: ", formData)
          const response = await axios.post('http://192.168.178.51:8000/open/contact/', formData);
          console.log("response:" , response.data.status)
          //const successUrl = response.data.successUrl;
          //setForm({ ...form, successUrl: successUrl });
          setStatus(response.data.status);
        } catch (error: any) {
            // @ts-ignore
            setError(error.message);
            // @ts-ignore
            console.log(error.message);
        } finally {
            dispatch({
                type: 'LOADING',
                payload: false
            });
        }
    };

    const handleChange = (value: string, name: string | number) => {
        setForm({ ...form, [name]: value });
    };

    useEffect(() => {
        console.log(form)
    }, [form]);


  // @ts-ignore
  return (
      <ScrollView contentContainerStyle={{justifyContent: "center", alignItems: "center"}} style={{paddingTop: 50}} >
        {status === 201 || status === 200 ? (
          <>
              <LottieView style={{height: 40, width: 40,}}
                        source={require("../../../assets/animations/successLottie.json")} autoPlay
                        loop/>
              <DefaultText
                text={"Thanks for your message! \n Someone from our Team wil contact you ASAP"}
                moreStyles={undefined}/>
              <DefaultText
                text={"This modal will be closed in" + seconds + "seconds."}
                moreStyles={undefined}/>
          </>
        ): status === 400 || status === 404 ? (
          <LottieView source={require("../../../assets/animations/failLottie.json")} autoPlay loop />
          ):(
          loading? (
            <ActivityIndicator size={"large"} color={themeColors.sexyBlue}/>
          ):(
            <>
              <HeadingText
                text={"Contact"}
                extraStyles={undefined}
              />
              {error? (
                // @ts-ignore
                (error.includes("cyclical structure in JSON object")? (
                  <>
                    <DefaultText text={"There was an error with your input. \n Please check it and try again"}
                                 moreStyles={{marginBottom: 30, color: themeColors.deleteRed, fontSize: 17}}
                    />
                  </>
                  // @ts-ignore
                ):error.includes("Cannot read property 'length' of undefined")?(
                  <>
                    <DefaultText text={"You forgot one Field. \n Please check an try again"}
                                 moreStyles={{marginBottom: 30, color: themeColors.deleteRed, fontSize: 17}}
                    />
                  </>
                  // @ts-ignore
                ):error.includes("All Fields are required.")?(
                  <>
                    <DefaultText text={"All Fields are required."}
                                 moreStyles={{marginBottom: 30, color: themeColors.deleteRed, fontSize: 17}}
                    />
                  </>
                  // @ts-ignore
                ):error === 201 || error === 200?(
                  <>
                    <DefaultText text={"All Fields are required."}
                                 moreStyles={{marginBottom: 30, color: themeColors.deleteRed, fontSize: 17}}
                    />
                  </>
                ):null)
              ):null}
              <View>
                  <>
                    <LottieView style={{height: 40, width: 40,}} source={require("../../../assets/animations/successSent.json")}
                                autoPlay={true}
                                loop={true}/>
                  </>
                {inputOptions.map((item, index) => (
                  <DefaultInput
                    key={index}
                    placeholder={item.placeholder}
                    onChangeAction={(text: any) => handleChange(text, item.name)}
                    secure={false}
                    editable={true}
                    keyboardType={item.name === "e_mail" ? "email-address" : undefined}
                    value={
                      // @ts-ignore
                      index === 0? form["first_name"] :
                        // @ts-ignore
                        index === 1? form["last_name"] :
                          // @ts-ignore
                          index === 2? form["e_mail"] : null
                    }
                  />
                ))}
              </View>

              <Picker style={[inputStyles.defaultInput, {marginBottom: 40, borderRadius: 20,}]}
                // @ts-ignore
                      selectedValue={form["option"]}
                      onValueChange={(itemValue, itemIndex) => handleChange(itemValue, "option")}>
                {options.map((item, index) => (
                  <Picker.Item style={inputStyles.defaultInput} label={item} value={item} key={index}/>
                ))}
              </Picker>

              <MultilineInput
                // @ts-ignore
                onChangeText={(text: string) => handleChange(text, "message")}
                placeholder={"Your Message"}
                // @ts-ignore
                value={form["message"]}
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
                text={"Problems with Contact form?  Send us your E-Mail directly: \ninfo@sales-detective.live"}
                moreStyles={{marginBottom: 100, marginTop: 20, color: themeColors.sexyBlue}}
              />
            </>
          )
        )}
      </ScrollView>
    );
};


