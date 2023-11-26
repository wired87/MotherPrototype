import {DefaultContainer} from "./DefaultContainer";
import {DefaultText} from "../text/DefaultText";
import {styles} from "./contiStyles";
import {DefaultPageNavigationBtn} from "../buttons/DefaultPageNavigationBtn";
import {View} from "react-native";
import {DefaultButton} from "../buttons/DefaultButton";
import {memo, useCallback, useContext} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import {PrimaryContext} from "../../screens/Context";

// @ts-ignore
const AreYouSureContainer = () => {

  const { user,bottomSheetRef } = useContext(PrimaryContext)
  const navigation = useNavigation();

  const dispatch = useDispatch();

  // @ts-ignore
  const screen = useSelector(state => state.screens.value)

  const onPressRegister = () => // @ts-ignore
    navigation.navigate("Chat", {screen: 'AuthNavigator', params: {screen: screen.register}});

  const onPressLogin = () => // @ts-ignore
    navigation.navigate("Chat", {screen: 'AuthNavigator', params: {screen: screen.login}});

  const deleteHistory = useCallback(async() => {
    dispatch({
      type: 'LOADING',
      payload: true
    });
    try {
      const userObject = {
        user_id: user?.uid
      }
      console.log("user id: ", user?.uid)
      const response = await axios.post("http://192.168.178.51:8000/open/delete-chat-history/",
        userObject
      )
      // @ts-ignore
      setStatus(response.data.status);
      console.log("response: ", response.data.messages, "\n response.status:", response.data.status);
    } catch(error) {
      console.log("error: " + error);
    } finally {
      dispatch({
        type: 'LOADING',
        payload: false
      });
    }
  }, [])
    return(
      <View
          style={{paddingHorizontal: 20, paddingVertical: 50, alignItems: "flex-start", justifyContent: "flex-start"}}>
        {user ? (
          <>
            <DefaultText
                text={"Delete you whole History"}
                moreStyles={styles.modalH4} />
            <View style={{flexDirection: "row"}}>
                <DefaultPageNavigationBtn
                  text={"Skip"}
                  onPressAction={() => bottomSheetRef.current?.close()}
                  extraTextStyles={undefined}
                  extraBtnStyles={undefined}
                />
                <DefaultPageNavigationBtn
                  text={"Do it!"}
                  onPressAction={deleteHistory}
                  extraTextStyles={undefined}
                  extraBtnStyles={undefined}
                />
            </View>
          </>
          ):(
            <View style={{alignItems: "center"}}>
             <DefaultText
               text={"You are not logged in."}
               moreStyles={undefined} />
              <DefaultButton
                extraStyles={undefined}
                onPressAction={onPressLogin}
                text={"Login"}
                secondIcon={undefined} />

              <DefaultButton
                extraStyles={undefined}
                onPressAction={onPressRegister}
                text={"Register"}
                secondIcon={undefined} />
            </View>
          )}
      </View>
    );
}
export default AreYouSureContainer;