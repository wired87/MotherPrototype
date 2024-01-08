import React, {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {DefaultInput} from "../../../../components/input/DefaultInput";
import {postMessageObject, sendObject} from "../../../chat/functions/SendProcess";
import {JwtToken, PrimaryContext, ThemeContext} from "../../../Context";
import {DefaultButton} from "../../../../components/buttons/DefaultButton";
import {DefaultText} from "../../../../components/text/DefaultText";
import firebase from "firebase/compat";

import {Vibration} from "react-native";
import {getToken} from "../../../../AppFunctions";

// STRINGS
const titlePlaceholder: string = "Job Title";
const skillsPlaceholder: string = "Your skills for the Job (optional)";
const contactPlaceholder: string = "Contact Person (optional)";
const languagePlaceholder: string = "Application Language (eng/de/fr/...";
const personalDataPlaceholder: string = "Contact Information's (optional)";

const create: string = "Create";
const filedErrorMessage: string = "This Field is required";
const postUrl: string = "http://wired87.pythonanywhere.com/ai-creation/application-request/";

// INTERFACE
interface InputTypes {
  value: string;
  setState: Dispatch<SetStateAction<string>>;
  numberOfLines?: number;
}

interface ResumeTypes {
  setError: Dispatch<SetStateAction<string>>;
  setResume: Dispatch<SetStateAction<string>>;
}

const ResumeContent: React.FC<ResumeTypes> = (
  {
    setError,
    setResume
  }
) => {
  const [jobTitle, setJobTitle ] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [contactPerson, setContactPerson] = useState<string>("");
  const [personalData, setPersonalData] = useState<string>("");
  const [language, setLanguage] = useState<string>("");

  const [fieldError, setFieldError] = useState<boolean>(false);

  // CONTEXT
  const { customTheme } = useContext(ThemeContext);
  const { setLoading, jwtToken, setJwtToken, user } = useContext(PrimaryContext);

  // REFs
  const jwtTokenRef = useRef<JwtToken | null>(null);

  // STYLES
  const extraInputStyles = {backgroundColor: "transparent", borderColor: customTheme.text}

  const createApplicationObject = (
    user: firebase.User | null
  ) => {
    return {
      "jobTitle": jobTitle,
      "skills": skills,
      "contactPerson": contactPerson,
      "personalData": personalData,
      "language": language,
      "user_id": user?.uid
    }
  }

  useEffect(() => {
    console.log("jwt changed in ChatNavigator:", jwtToken);
    jwtTokenRef.current = jwtToken;
    console.log("jwt ref:", jwtTokenRef.current);
  }, [jwtToken]);

  const handleResumeCreatePress = useCallback(async () => {
    if (jobTitle.length == 0) {
      Vibration.vibrate();
      setFieldError(true);
    }else {
      setError("");
      setFieldError(false);
      setLoading(true);
      const fileObject = createApplicationObject(user);
      let response;
      try {
        if (jwtTokenRef?.current && jwtTokenRef.current.refresh && jwtTokenRef.current.access) {
          response = await sendObject(
            fileObject,
            jwtTokenRef.current,
            setJwtToken,
            postUrl
          )
        }else{
          const newToken = await getToken(setJwtToken);
          if (newToken) {
            response = await sendObject(
              fileObject,
              newToken,
              setJwtToken,
              postUrl
            )
          }else{
            setError("Could not authenticate you. Please contact the support or try again later.")
          }
        }
        if (response && !(response.status === "500")) {
          console.log("response:" , response.status);
          setResume(response.message);
        }else{
          setError(response.message);
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.log("Error while sending the chatCompletion request:", e.message)
          setError(e.message);
          console.log(e.message);
        }
      }finally{
        setLoading(false);
      }
    }
  }, [jobTitle]);

  const FieldError = useMemo(() => {
    if (fieldError) {
      return <DefaultText text={filedErrorMessage} moreStyles={undefined} error={fieldError} />
    }
  }, [fieldError])

  return(
    <>
      <DefaultInput
        placeholder={contactPlaceholder}
        value={contactPerson}
        extraStyles={extraInputStyles}
        onChangeAction={setContactPerson}
      />
      <DefaultInput
        placeholder={titlePlaceholder}
        value={jobTitle}
        extraStyles={extraInputStyles}
        onChangeAction={setJobTitle}
      />
      {FieldError}
      <DefaultInput
        placeholder={skillsPlaceholder}
        value={skills}
        multiline={true}
        numberOfLines={5}
        extraStyles={extraInputStyles}
        onChangeAction={setSkills}
      />

      <DefaultInput
        placeholder={personalDataPlaceholder}
        value={personalData}
        extraStyles={extraInputStyles}
        onChangeAction={setPersonalData}
        keyboardType={"email-address"}
      />

      <DefaultInput
        placeholder={languagePlaceholder}
        value={language}
        extraStyles={extraInputStyles}
        onChangeAction={setLanguage}
      />

      <DefaultButton
        extraStyles={undefined}
        onPressAction={handleResumeCreatePress}
        text={create}
        secondIcon={undefined}
      />

    </>
  );
}

export default memo(ResumeContent);