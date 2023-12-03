import {View, StyleSheet} from "react-native";
import {userStyles} from "../../screens/user/userStyles";
import {HeadingText} from "../text/HeadingText";
import {DefaultInput} from "../input/DefaultInput";
import {DefaultButton} from "../buttons/DefaultButton";
import React, {memo, useContext} from "react";
import {PrimaryContext, ThemeContext} from "../../screens/Context";
import {useSelector} from "react-redux";

const localStyles = StyleSheet.create(
  {
    extraMb: {
      marginBottom: 15
    }
  }
)

const ProfileContainer = (
  {
    // @ts-ignore
    moveToScreen
  }
) => {

  const {user} = useContext(PrimaryContext);
  const { customTheme} = useContext(ThemeContext);

  // @ts-ignore
  const text = useSelector(state => state.text.value);
  // @ts-ignore
  const screens = useSelector(state => state.screens.value)

  return(
    <View style={[userStyles.profileSection, {
      borderBottomColor: customTheme.borderColor}]}>
      <HeadingText
        text={text.profileHeading}
        extraStyles={undefined}
      />
      <View style={userStyles.inputSection}>
        <DefaultInput
          placeholder={undefined}
          value={user?.email || null}
          onChangeAction={null}
          secure={false}
          editable={false}
          keyboardType={undefined}
          extraStyles={undefined}
        />
        <DefaultButton
          text={text.changeEmail}
          onPressAction={moveToScreen(screens.emailChangeScreen)}
          extraStyles={localStyles.extraMb}
          secondIcon={undefined}
        />
        <DefaultInput
          placeholder={null}
          value={text.password}
          onChangeAction={null}
          secure={true}
          editable={false}
          keyboardType={undefined}
          extraStyles={undefined}
        />
        <DefaultButton
          text={text.changePassword}
          onPressAction={moveToScreen(screens.passwordChangeScreen)} extraStyles={undefined}
          secondIcon={undefined}
        />
      </View>
    </View>
  );
}
export default memo(ProfileContainer);