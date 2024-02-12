import {Dispatch, memo, SetStateAction, useCallback, useContext, useState} from "react";
import {SafeAreaView, View} from "react-native";
import React from "react";
import {ScrollView} from "react-native-gesture-handler";
import {StyleProps} from "react-native-reanimated";
import {PrimaryContext, ThemeContext} from "../../Context";
import {DefaultButton} from "../../../components/buttons/DefaultButton";
import {uniStyles as us} from "../../universalStyles";
import LockModal from "../../../components/modals/LockModal";
import TextStream from "../../../components/text/TextStream";
import {DefaultInput} from "../../../components/input/DefaultInput";
import {useEmailAuth} from "./Hooks";
import {getAuth} from "firebase/auth";
import {TEXT_REQUEST_URL} from "@env";

// STRINGS
const unLabel: string = "Service Username";
const pwLabel: string = "Service Password"
const unPlaceholder: string = "Email or Username";
const pwPlaceholder: string = "Your Service Password...";

// NUMBERS
const serviceInputLen:number = 100;


// BOOLS
// TODO
const serviceUnlocked:boolean = true;

interface UniversalServiceScreenTypes {
  serviceUnLocked: boolean;
  serviceName: string;
  setServiceUnLocked: Dispatch<SetStateAction<boolean>>;
  unLockService: (() => void);
  lockService: (() => void);
}

interface LockObjectTypes {
  type: string;
  userName: string;
  password: string;
  uid?: string;
}

interface UnlockObjectTypes {
  type: string;
  uid?: string
}

const UniversalServiceScreen: React.FC<UniversalServiceScreenTypes> = (

  {
    serviceUnLocked,
    serviceName,
    setServiceUnLocked,
    unLockService,
    lockService,
  }

) => {

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");

  const [passwordError, setPasswordError] = useState<string>("");
  const [userNameError, setUserNameError] = useState<string>("");
  const [requestError, setRequestError] = useState<string>("");

  const [animationVisible, setAnimationVisible] =
    useState<boolean>(false);

  const { setLoading, defaultPostRequest } = useContext(PrimaryContext);

  // STYLES
  const { customTheme } = useContext(ThemeContext);
  const standardContainer:StyleProps[]  = [
    us.justifyAlignCenter,
    us.fullScreenWidth,
    us.paddingH20,

  ];

  const backgroundColor:StyleProps  = {backgroundColor: customTheme.primary};
  const mainContainerStyles:StyleProps[]  = [us.scrollMain, us.paddingV50, backgroundColor];
  const carouselContainerStyles:StyleProps[] = [
    standardContainer,
    {
      marginVertical: 30,
    }
  ];

  const {
    serviceUserNameOrEmail, setServiceUserNameOrEmail,
    password, setPassword
  } = useEmailAuth();

  // STRINGS
  const buttonIcon:string = serviceUnLocked ? "lock-open-outline" : "lock-outline";
  const buttonText:string = serviceUnLocked ? "Lock Service" : "Unlock Service" ;
  const confirmText:string = serviceUnLocked ? "Service Successfully locked" : "Service Successfully unlocked" ;
  const modalHeadingText: string = serviceUnLocked ? `lock ${serviceName}` : `unlock ${serviceName}`;


  const changeModalVisibility = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  const unlockServiceObject: LockObjectTypes = {
    type: "unlock",
    userName: serviceUserNameOrEmail,
    password: password,
    uid: getAuth()?.currentUser?.uid
  }

  const lockServiceObject:UnlockObjectTypes = {
    type: "lock",
    uid: getAuth()?.currentUser?.uid
  }

  const checkInputValue = () => {
    if (password.trim().length === 0) {
      setPasswordError("Please provide a valid Password...");
      return false
    }else if (serviceUserNameOrEmail.trim().length === 0) {
      setUserNameError("Please provide valid credentials...");
      return false
    }else{
      return true
    }
  }

  const postRequest = async (inputValid:boolean, sendObject:LockObjectTypes | UnlockObjectTypes) => {
    if (inputValid) {
      await defaultPostRequest(
        TEXT_REQUEST_URL,
        sendObject,
        setRequestError,
        setResponse
      )
    }
  };

  const sendRequest = async (infoObject: LockObjectTypes | UnlockObjectTypes) => {
    if (infoObject.type === "unlock"){
      const inputValid = checkInputValue();
      await postRequest(inputValid, infoObject);
    } else {
      await postRequest(true, infoObject);
    }
  }

  const handleConfirmationClick = useCallback(async() => {
    setLoading(true);
    if (serviceUnLocked) {
      try {
        await sendRequest(lockServiceObject)
      }catch(e:unknown) {
        if(e instanceof Error) {
          console.log("Error occurred while try lock a Service:", e);
        }
      } finally {
        setLoading(false);
      }
    }else{
      try {
        await sendRequest(unlockServiceObject)
      }catch(e:unknown) {
        if(e instanceof Error) {
          console.log("Error occurred while try unLock a Service:", e);
        }
      } finally {
        setLoading(false);
      }
    }
  }, [serviceUnLocked]);


  const animationHandler = useCallback(() => {
    const animationSource:string = serviceUnLocked ? "" : "";
    if (animationVisible){
      return(
          <></>
      );
    }else{
      return <></>
    }
  }, [animationVisible, serviceUnLocked]);


  return(
    <SafeAreaView style={mainContainerStyles}>
      <ScrollView  contentContainerStyle={us.justifyAlignCenterStart}>

        <View style={standardContainer}>
          <TextStream message={serviceName} />
        </View>

        <DefaultInput
          onChangeAction={setServiceUserNameOrEmail}
          value={serviceUserNameOrEmail}
          placeholder={unPlaceholder}
          editable={serviceUnlocked}
          keyboardType={"email-address"}
          max_length={serviceInputLen}
          label={unLabel}
        />

        <DefaultInput
          placeholder={pwPlaceholder}
          editable={serviceUnlocked}
          keyboardType={"ascii-capable"}
          max_length={serviceInputLen}
          label={unLabel}
          onChangeAction={setPassword}
          value={password}
        />

        <DefaultButton
          extraStyles={undefined}
          onPressAction={changeModalVisibility}
          text={buttonText}
          secondIcon={buttonIcon}
        />

        <LockModal
          changeModalVisibility={changeModalVisibility}
          modalVisible={modalVisible}
          headingText={modalHeadingText}
          icon={buttonIcon}
          handleConfirmationClick={handleConfirmationClick}
          buttonText={buttonText}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default memo(UniversalServiceScreen);