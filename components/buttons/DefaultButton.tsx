import {ActivityIndicator, Pressable, Text, Vibration} from "react-native";
import React, {Dispatch, SetStateAction, useCallback, useContext, useMemo} from "react";
import {styles as s} from "./styles";
import {PrimaryContext, ThemeContext, ToolContext} from "../../screens/Context";
import {StyleProps} from "react-native-reanimated";
import {showToolAds} from "../../screens/chat/functions/AdLogic";
import {sendObject} from "../../screens/chat/functions/SendProcess";
import {getToken} from "../../AppFunctions";
import {useRoute} from "@react-navigation/native";

const buttonStyles: StyleProps = { color: "white", marginHorizontal: 5, fontSize: 16 };

interface DefaultButtonStyles {
  extraStyles?: StyleProps
  onPressAction?: (() => void);
  text?: string
  secondIcon?: string;
  postUrl: string;
  setPostResponse: Dispatch<SetStateAction<string>>;
  field?: string;
  postObject: object;
}


export const DefaultButton: React.FC<DefaultButtonStyles> = (
  {
    extraStyles,
    onPressAction,
    text,
    secondIcon,
    postUrl,
    setPostResponse,
    field,
    postObject
  }
) => {

  const {
    loading,
    jwtToken,
    setJwtToken,
    setLoading,
    setError,
    setFieldError
  } = useContext(PrimaryContext);

  const { customTheme } = useContext(ThemeContext);
  const {
    setToolActionValue,
    toolActionValue,
     } = useContext(ToolContext);


  const route = useRoute();

  const pressableStyles =
    [extraStyles || null, s.changeInfoBtn, {backgroundColor: customTheme.primaryButton, color: '#fff'}]

  const loadingSpinner = useMemo(()=> {
    if (loading) {return <ActivityIndicator size={"small"}/>}else {return secondIcon || null}
  }, [secondIcon]);

  const action =
    onPressAction?
    onPressAction :
    () => handlePostPress().then(() => console.log("ABC321..."))
  const buttonText = text || "Create"


  const handlePostPress = useCallback(async () => {
    console.log("jwtToken n Application Content:", jwtToken);
    // just show if in one of the tool screens
    if (toolActionValue === "0" && !(route.name === "SettingsMain")) {
      console.log("User has 0 Actions left. Init Ads...")
      await showToolAds(toolActionValue, setToolActionValue);
    }
    if (field && field.length == 0) {
      Vibration.vibrate();
      setFieldError(true);
    }else {
      if (!(route.name === "SettingsMain")) {
        setToolActionValue("0");
      }
      setError("");
      setFieldError(false);
      setLoading(true);

      let response;
      try {
        if (jwtToken?.refresh && jwtToken.access) {
          console.log("Application data sent: ", postObject);
          response = await sendObject(
            postObject,
            jwtToken,
            setJwtToken,
            postUrl
          );
        } else {
          console.error("No token provided");
          const newToken = await getToken(setJwtToken);
          if (newToken) {
            response = await sendObject(
              postObject,
              newToken,
              setJwtToken,
              postUrl
            );
          } else {
            console.error("New Token request failed...");
            setError("Authentication Error");
          }
        }
        if (response) {
          console.log("Application response Successfully:", response);
          setPostResponse(response);
        } else {
          console.error("Received no result:", response);
          setError("Error occurred. Please try again or contact the support.");
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
          console.error("Error while contact submit occurred:", e.message);
        }
      } finally {
        console.log("Application request finished without trouble...");
        setLoading(false);
      }
    }
  }, [field, jwtToken]);


  return(
      <Pressable style={pressableStyles} onPress={action} >
        <Text style={buttonStyles}>{buttonText}</Text>
        {loadingSpinner}
      </Pressable>
  );
}