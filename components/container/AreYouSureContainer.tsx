import {DefaultContainer} from "./DefaultContainer";
import {DefaultText} from "../text/DefaultText";
import {styles} from "./contiStyles";
import {DefaultPageNavigationBtn} from "../buttons/DefaultPageNavigationBtn";
import {View} from "react-native";
import {getAuth} from "firebase/auth";
import {DefaultButton} from "../buttons/DefaultButton";
import {useCallback} from "react";
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";


// @ts-ignore
export const AreYouSureContainer = ({ text, action, closeModalAction }) => {
  const user = getAuth().currentUser
  // @ts-ignore
  const screen = useSelector(state => state.screens.value)
  const navigation = useNavigation();

  const onPressRegister = useCallback(() => // @ts-ignore
    navigation.navigate("Chat", {screen: 'AuthNavigator', params: {screen: screen.register}}), []);

  const onPressLogin = useCallback(() => // @ts-ignore
    navigation.navigate("Chat", {screen: 'AuthNavigator', params: {screen: screem.login}}), []);


    return(
      <DefaultContainer
          extraStyles={{paddingHorizontal: 20, gap: 50,}}>
        {user ? (
          <>
            <DefaultText
                text={text}
                moreStyles={styles.modalH4} />
            <View style={{flexDirection: "row"}}>
                <DefaultPageNavigationBtn
                    text={"Skip"}
                    onPressAction={closeModalAction}
                    extraTextStyles={undefined}
                    extraBtnStyles={undefined} />
                <DefaultPageNavigationBtn
                    text={"Do it!"}
                    onPressAction={action}
                    extraTextStyles={undefined}
                    extraBtnStyles={undefined} />
            </View>
          </>
          ):(
            <>
             <DefaultText text={"You are not logged in."} moreStyles={undefined} />
              <DefaultButton
                extraStyles={undefined}
                onPressAction={undefined}
                text={"Login"}
                secondIcon={undefined} />
              <DefaultButton
                extraStyles={undefined}
                onPressAction={undefined}
                text={"Register"}
                secondIcon={undefined} />
            </>
          )}
      </DefaultContainer>
    );
}
