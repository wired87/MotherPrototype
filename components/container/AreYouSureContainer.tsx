import {DefaultText} from "../text/DefaultText";
import {styles} from "./contiStyles";
import DefaultPageNavigationBtn from "../buttons/DefaultPageNavigationBtn";
import {View, StyleSheet} from "react-native";
import {DefaultButton} from "../buttons/DefaultButton";
import React, {memo, useCallback, useContext, useMemo} from "react";
import {useNavigation} from "@react-navigation/native";
import {PrimaryContext, ThemeContext} from "../../screens/Context";



const localStyles = StyleSheet.create(
  {
    main: {
      paddingHorizontal: 20,
      paddingVertical: 50,
      alignItems: "flex-start",
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
    }
  }
)

const AreYouSureContainer = () => {

  const {
    user,
    setLoading,
    setClearMessages
  } = useContext(PrimaryContext);

  const { customTheme } = useContext(ThemeContext);

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
    }
  }, []);


  const mainContent = useMemo(() => {
    if (user) {
      return(
        <View
          style={localStyles.deleteCheckContainer} >
          <DefaultText
            text={"Delete your whole History"}
            moreStyles={moreTextStyles}
          />
          <View style={localStyles.deleteCheckButtonContainer}>
            <DefaultPageNavigationBtn
              text={"Do it!"}
              onPressAction={deleteHistory}
              extraTextStyles={undefined}
              extraBtnStyles={undefined}
            />
          </View>
        </View>
      );
    }else {
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
      );
    }
  }, [user])

    return(
      <View
          style={localStyles.main}>
        {mainContent}
      </View>
    );
}
export default memo(AreYouSureContainer);