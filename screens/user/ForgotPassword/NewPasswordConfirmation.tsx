import React, {useEffect, useState} from "react";
import { View } from "react-native";
import { DefaultContainer } from "../../../components/container/DefaultContainer";
import { HeadingText } from "../../../components/text/HeadingText";
import { DefaultInput } from "../../../components/input/DefaultInput";
import { DefaultText } from "../../../components/text/DefaultText";
import { DefaultButton } from "../../../components/buttons/DefaultButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../../../colors/theme";
import {pwResetStyles as styles} from "./forgotpwstyles"
import { PinInput } from '@pakenfit/react-native-pin-input';
import {getAuth, verifyPasswordResetCode} from "firebase/auth";
import {useSelector} from "react-redux";

export const NewPasswordConfirmation = () => {
  const [pin, setPin] = useState("");
  const [correct, setCorrect] = useState(false); // This should likely be a state if its value is supposed to change
  const [error, setError] = useState("");
  const [totalTrys, setTotalTrys] = useState(5);
  const navigation = useNavigation();

  // @ts-ignore
  const errors = useSelector(state => state.errors.value)
  const setPinFunction = (enteredPin: React.SetStateAction<string>) => {
    setPin(enteredPin); // You should simply set the pin without spreading it
  };

  const confirmPin = () => {
    // Logic for confirming the pin
  };

  const checkPin = async (otp: string) => {
    try {
      await verifyPasswordResetCode(getAuth(), otp)
      setCorrect(true)
    } catch(e) {
      // @ts-ignore
      setError(e.message)
      setTotalTrys(prevTrys => prevTrys - 1);
    }
  };

  useEffect(() => {
    if (totalTrys === 0) {
      //  lock the screen
    }
  }, [totalTrys]);




  // If other functions like `confirmPin` or `checkPin` change the state of `correct`, then you would also display the success message or error accordingly.

  // @ts-ignore

  return (
    <DefaultContainer extraStyles={{marginTop: 150}}>
      <HeadingText text="Confirm your Password" extraStyles={undefined} />
      <DefaultContainer extraStyles={styles.numPadView} >
        {/*// @ts-ignore*/}
        <DefaultText
          moreStyles={{textAlign: "center", color: themeColors.deleteRed}}
          text={"We have send you a confirmation Mail.\n" +
            "          Please close this window and follow the steps as described."} />
        <DefaultButton
          extraStyles={undefined}
          // @ts-ignore
          onPressAction={() => navigation.navigate("Login")}
          text={"Go Back"}
          secondIcon={undefined}
        />
      </DefaultContainer>
    </DefaultContainer>
  );
};



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