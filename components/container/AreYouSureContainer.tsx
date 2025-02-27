import {DefaultText} from "../text/DefaultText";
import {styles} from "./contiStyles";
import DefaultPageNavigationBtn from "../buttons/DefaultPageNavigationBtn";
import {View, StyleSheet} from "react-native";
import React, {memo, useCallback, useContext, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {PrimaryContext, ThemeContext} from "../../screens/Context";
import ToolIndIcator from "../indicators/ToolIndIcator";
import LottieContainer from "./LottieContainer";
import successLottie from "../../assets/animations/successLottie.json"
;
const ls = StyleSheet.create(
  {
    main: {
      paddingHorizontal: 20,
      paddingVertical: 50,
      alignItems: "center",
      justifyContent: "flex-start"
    },
    deleteCheckContainer: {
      width: "100%",
      height: 200,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    deleteCheckButtonContainer: {
      marginVertical: 30,
      flexDirection: "row"
    },
    text: {
      fontSize: 18,
      fontFamily: "JetBrainsMono",
    }
  }
)

const AreYouSureContainer: React.FC = () => {

  const {
    user,
    setLoading,
    setClearMessages, loading
  } = useContext(PrimaryContext);

  const { customTheme } = useContext(ThemeContext);
  const [finish, setFinish] = useState<boolean>(false);
  const navigation = useNavigation();

  const moreTextStyles = [styles.modalH4, {color: customTheme.text}];

  const onPressRegister = () => // @ts-ignore
    navigation.navigate("Chat", {screen: 'AuthNavigator', params: {screen: "Register"}});

  const onPressLogin = () => // @ts-ignore
    navigation.navigate("Chat", {screen: 'AuthNavigator', params: {screen: "Login"}});

  const deleteHistory = useCallback(async() => {
    setLoading(true);
    try {
      setClearMessages(true);
    } catch(error) {
      console.log("error: " + error);
    } finally {
      setLoading(false);
      setFinish(true);
    }
  }, []);


  const mainContent = useCallback(() => {
    if (!loading && !finish) {
      return (
        <View
          style={ls.deleteCheckContainer}>
          <DefaultText
            text={"Delete your whole History"}
            moreStyles={moreTextStyles}
          />
          <View style={ls.deleteCheckButtonContainer}>
            <DefaultPageNavigationBtn
              text={"Do it!"}
              onPressAction={() => deleteHistory()}
              extraTextStyles={undefined}
              extraBtnStyles={undefined}
            />
          </View>
        </View>
      );

    } else if (loading && !finish) {
      return <ToolIndIcator />
    } else if (!loading && finish) {
      return(
        <LottieContainer
          source={successLottie}
          text={"History successfully deleted!"}
          extraStylesMore={ls.text}
        />
      )
    }
    return <></>
  }, [loading, finish])

    return(
      <View style={ls.main}>
        {mainContent()}
      </View>
    );
}
export default memo(AreYouSureContainer);


/*
return(
        <View style={{alignItems: "center"}}>
          <DefaultText
            text={"You are not logged in."}
            moreStyles={undefined} />
          <DefaultButton
            extraStyles={undefined}
            onPressAction={onPressLogin}
            text={"Login"}
            secondIcon={undefined}
          />

          <DefaultButton
            extraStyles={undefined}
            onPressAction={onPressRegister}
            text={"Register"}
            secondIcon={undefined}
          />
        </View>
 */