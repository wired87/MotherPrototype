import React, {memo, useContext} from "react";
import { DefaultContainer } from "../../../components/container/DefaultContainer";
import { HeadingText } from "../../../components/text/HeadingText";
import { DefaultText } from "../../../components/text/DefaultText";
import { DefaultButton } from "../../../components/buttons/DefaultButton";
import { useNavigation } from "@react-navigation/native";
import {pwResetStyles as styles} from "./forgotpwstyles"
import { StyleSheet } from "react-native";
import {ThemeContext} from "../../Context";

const confirmText: string = "We have sent you a confirmation Mail.\n" +
  "          Please close this window and follow the steps as described.";
const goBackText: string = "Go Back";
const confirmPasswordText: string = "Choose your new Password";

const localStyles = StyleSheet.create(
  {
    main: {
      flex: 1,
      width: "100%",
      height: "100%",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "column",
      paddingTop: 150,
      elevation: 20,
      paddingVertical: 50,
    },

  }
)

const NewPasswordConfirmation = () => {

  const { customTheme } = useContext(ThemeContext);

  const navigation = useNavigation();

  const moreTextStyles = {textAlign: "center", color: customTheme.errorText};
  const mainExtraStyles: any[] = [localStyles.main, {backgroundColor: customTheme.primary}];

  return (
    <DefaultContainer extraStyles={mainExtraStyles}>
      <HeadingText text={confirmPasswordText} extraStyles={undefined} />
      <DefaultContainer extraStyles={styles.numPadView} >
        <DefaultText
          moreStyles={moreTextStyles}
          text={confirmText}
        />
        <DefaultButton
          extraStyles={undefined}
          // @ts-ignore
          onPressAction={() => navigation.navigate("Login")}
          text={goBackText}
          secondIcon={undefined}
        />
      </DefaultContainer>
    </DefaultContainer>
  );
};

export default memo(NewPasswordConfirmation);

/*



<HeadingText text="Confirm your Password" extraStyles={undefined} />
      <DefaultContainer extraStyles={styles.numPadView} >
        <PinInput
          length={4}
          onFillEnded={otp => checkPin(otp)}
          inputProps={undefined}
          inputStyle={undefined}
          containerProps={undefined}
          containerStyle={undefined}
        />

        {correct ? (
          <>
            <DefaultText text="Success!" moreStyles={undefined} />
            <HeadingText text="Set new Password" extraStyles={undefined} />
            <DefaultInput placeholder="Set new Password" secure={false} value={undefined} onChangeAction={undefined}
                          editable={undefined} keyboardType={undefined} />
            <DefaultInput placeholder="Confirm new Password" secure={false} value={undefined} onChangeAction={undefined}
                          editable={undefined} keyboardType={undefined} />
            <DefaultButton text="Confirm"
extraStyles={undefined} onPressAction={undefined} secondIcon={undefined}  Define onPressAction or remove it if it's not required />
</>
) : (
  <DefaultText text="Please check your input!" moreStyles={ }} />
)}
</DefaultContainer>
          <PINCode
            status={'choose'}
            alphabetCharsVisible={true}
            buttonDeleteText={""}
            customBackSpaceIcon={() => {return(<MaterialCommunityIcons  name={"less-than"}/>)}}
            disableLockScreen={false}
            endProcessFunction={confirmPin}
            handleResultEnterPin={checkPin}
            //iconComponentLockedPage={<></>}
            //lockedIconComponent={undefined}
            //lockedPage={undefined} // view component for too masny trys
            maxAttempts={5}
            onClickButtonLockedPage={() => navigation.goBack()} //
            //onFail={undefined}
            //passwordComponent={undefined} // the safe digit view icon
            passwordLength={4}
          //pinAttemptsAsyncStorageName={undefined} // how to use asynchstorage
          // -> maybe for value of questions the user haas allready taken?

          //pinCodeVisible={true} // or none
    */