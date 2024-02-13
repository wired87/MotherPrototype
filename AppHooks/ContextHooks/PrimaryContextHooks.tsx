
import {useJwt, useUser} from "../AuthHooks";
import {useBottomSheetLoaded, useIsConnected} from "../InitHooks";
import {useDarkmode} from "../ThemeHook";
import {useError, useLoading} from "../PrimaryHooks";
import {Dispatch, SetStateAction} from "react";
import {sendObject} from "../../screens/chat/functions/SendProcess";
import {getToken} from "../../AppFunctions/AppFunctions";
import {useToolHooks} from "../ToolHooks";
import {useClearMessages} from "../ChatMessageHooks";
import {useAlreadyRunning} from "../InputHooks";

let errorCodes:string[] = [
  "400",
  "401",
  "404",
  "505",
  "500",
  "300",
]

export const usePrimaryContextHooks = () => {
  // AUTH HOOKS
  const { user, setUser } = useUser();
  const {jwtToken, setJwtToken} = useJwt();

  // INIT HOOKS
  const {isConnected, setIsConnected} = useIsConnected();
  const {bottomSheetLoaded, setBottomSheetLoaded} = useBottomSheetLoaded();
  const {alreadyRunning, updateAlreadyRunning} = useAlreadyRunning();

  // THEME HOOKS
  const {darkmode, setDarkmode, toggleTheme}= useDarkmode();

  // TOOL HOOKS
  const {setToolActionValue, checkToolActionValueProcess} = useToolHooks()

  // PRIMARY HOOKS
  const {loading, setLoading} = useLoading();
  const {error, setError} = useError();

  // MESSAGE HOOKS
  const {clearMessages, setClearMessages} = useClearMessages();

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





  return {
    darkmode, setDarkmode, toggleTheme,
    user, setUser,
    loading, setLoading,
    clearMessages, setClearMessages,
    jwtToken, setJwtToken,
    isConnected, setIsConnected,
    bottomSheetLoaded, setBottomSheetLoaded,
    defaultPostRequest,
    alreadyRunning, updateAlreadyRunning
  };
}