
import React, {Dispatch, memo, SetStateAction, useEffect} from "react";
import {useAuthenticated, useJwt, useUser} from "../AppHooks/AuthHooks";
import {useIsConnected, useLoading} from "../AppHooks/PrimaryHooks";
import {useBottomSheetLoaded} from "../AppHooks/InitHooks";
import {useAlreadyRunning} from "../AppHooks/InputHooks";
import {useDarkmode} from "../AppHooks/ThemeHook";
import {useToolHooks} from "../AppHooks/ToolHooks";
import {useClearMessages} from "../AppHooks/ChatMessageHooks";
import {sendObject} from "../screens/chat/functions/SendProcess";
import {getToken} from "../AppFunctions/JwtFunctions";
import { PrimaryContext } from "../screens/Context";
import NetInfo from "@react-native-community/netinfo";
import {useInitError} from "../AppHooks/ErrorHooks/InitErrorHook";
import {UseIsConnectedParams} from "../AppInterfaces/PrimaryContextHooks";
import {UserParamInterface} from "../AppInterfaces/HookInterfaces/AuthHookInterface";
import {ContextProviderInterface} from "../AppInterfaces/ContextProviderInterface";


let errorCodes:string[] = [
  "400",
  "401",
  "404",
  "505",
  "500",
  "300",
]



const PrimaryContextProvider: React.FC<ContextProviderInterface> = (
  {
    children
  }
) => {


  const {jwtToken, setJwtToken,updateJwtToken} = useJwt();

  const {bottomSheetLoaded, setBottomSheetLoaded} = useBottomSheetLoaded();
  const {alreadyRunning, updateAlreadyRunning} = useAlreadyRunning();

  // TOOL HOOKS
  const {setToolActionValue, checkToolActionValueProcess} = useToolHooks();

  // PRIMARY HOOKS
  const {loading, setLoading} = useLoading();

  // MESSAGE HOOKS
  const {clearMessages, setClearMessages} = useClearMessages();
  const {authenticated, updateAuthenticated} = useAuthenticated();

  // AUTH HOOKS
  const useUserArgs:UserParamInterface = {authenticated, updateAuthenticated, updateJwtToken};
  const { user, setUser, updateUser } = useUser(useUserArgs);

  // INIT HOOKS
  const {updateInitError} = useInitError();
  const useIcConnectedParams: UseIsConnectedParams = {updateUser, updateAuthenticated, updateInitError}
  const {isConnected, updateIsConnected} = useIsConnected(useIcConnectedParams);

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      console.log("Internet Connection set:", state.isConnected, typeof state.isConnected);
      updateIsConnected(state.isConnected || false);
    });
  }, []);


  const defaultPostRequest = async (
    postUrl: string,
    postObject: any,
    setError: Dispatch<SetStateAction<string>>,
    setResponse: Dispatch<SetStateAction<string>>,
    setStatus?:Dispatch<SetStateAction<number>>,
    toolAction?: boolean
  ):Promise<any> => {
    console.log("jwtToken n Application Content:", jwtToken);
    if (postObject.type !== "contact" && toolAction) { // check for tA because i can handle the show process better
      await checkToolActionValueProcess();
    }
    // just show if in one of the tool screens
    /*if (toolActionValue === "0" && toolAction && !toolSuccess) {
      console.log("User has 0 Actions left. Init Ads...")
      await showToolAds( toolActionValue, setToolActionValue);
    }*/
    if (toolAction) {
      console.log("SET TOOL ACTION VALUE TO 0...")
      setToolActionValue("0");
    }

    setLoading(true);
    setError("");

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
        console.error("No token provided. Current Access Token:", jwtToken?.access, "\n\n current refresh token:", jwtToken?.refresh);
        const newToken = await getToken(setJwtToken, user?.uid);
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
        if (response.message && !response.error && !errorCodes.includes(response.status)){
          console.log("Response Successfully:", response);
          setResponse(response.message);
        }else if(!response.message && response.error || errorCodes.includes(response.status)) {
          console.error("Received no result:", response);
          setError(response.error);
          if (setStatus){
            setStatus(Number(response.status));
          }
        }else{
          try{
            setError(response.message)
          }catch(e:unknown){
            if (e instanceof Error) {
              console.error("Could nat classify the response:", e)
              setError("An unexpected error occurred. Please try again or contact the Support.")
            }
            if (setStatus){
              setStatus(500);
            }
          }
        }
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
        console.error("Error while contact submit occurred:", e.message);
      }
      if (setStatus){
        setStatus(500);
      }
    } finally {
      console.log("Application request finished without trouble...");
      setLoading(false);
    }
  }

  const elements = {
    user, setUser,
    loading, setLoading,
    clearMessages, setClearMessages,
    jwtToken, setJwtToken,
    isConnected, updateIsConnected,
    bottomSheetLoaded, setBottomSheetLoaded,
    defaultPostRequest,
    alreadyRunning, updateAlreadyRunning
  };

  return(
    <PrimaryContext.Provider value={elements}>
      {children}
    </PrimaryContext.Provider>
  )
}

export default memo(PrimaryContextProvider);