import React, {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";
import {DefaultInput} from "../../../../components/input/DefaultInput";
import {sendObject} from "../../../chat/functions/SendProcess";
import {PrimaryContext, ThemeContext, ToolContext} from "../../../Context";
import {DefaultButton} from "../../../../components/buttons/DefaultButton";
import {DefaultText} from "../../../../components/text/DefaultText";
import firebase from "firebase/compat";

import {Vibration} from "react-native";
import {getCurrentLanguage, getToken} from "../../../../AppFunctions";
import {toolStyles as ts} from "../../toolStyles";
import {showToolAds} from "../../../chat/functions/AdLogic";

// STRINGS
const titlePlaceholder: string = "Job Title";
const skillsPlaceholder: string = "Your skills for the Job (optional)";
const contactPlaceholder: string = "Contact Person (optional)";
const languagePlaceholder: string = "Application Language (eng/de/fr/...";
const personalDataPlaceholder: string = "Contact Information's (optional)";
const workExperiencePlaceholder: string = "Work experience (optional)";


const create: string = "Create";
const filedErrorMessage: string = "This Field is required";
const postUrl: string = "http://wired87.pythonanywhere.com/ai-creation/application-request/";




// INTERFACE

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
  const [workExperience, setWorkExperience] = useState<string>("");
  const [fieldError, setFieldError] = useState<boolean>(false);

  // CONTEXT
  const { customTheme } = useContext(ThemeContext);
  const { setToolActionValue, toolActionValue } = useContext(ToolContext);

  const { setLoading,
    jwtToken,
    setJwtToken,
    user } = useContext(PrimaryContext);

  // STYLES
  const extraInputStyles = {backgroundColor: "transparent", borderColor: customTheme.text}
  const workExperienceStyles = [ts.input, {minHeight: 100}];

  const get_language = useCallback((language: string) => {
    return language.length === 0? getCurrentLanguage() : language
  }, [])

  const createApplicationObject = (
    user: firebase.User | null
  ) => {
    return {
      "jobTitle": jobTitle,
      "skills": skills,
      "contactPerson": contactPerson,
      "personalData": personalData,
      "language": get_language(language),
      "workExperience": workExperience,
      "userId": user?.uid || "1"
    }
  }

  const handleResumeCreatePress = useCallback(async () => {
    console.log("jwtToken n Application Content:", jwtToken);
    if (toolActionValue === "0") {
      console.log("User has 0 Actions left. Init Ads...")
      await showToolAds(toolActionValue, setToolActionValue);
    }
    if (jobTitle.length == 0) {
      Vibration.vibrate();
      setFieldError(true);
    }else {
      setToolActionValue("0");
      setError("");
      setFieldError(false);
      setLoading(true);
      const fileObject: object = createApplicationObject(user);
      let response;
      try {
        if (jwtToken?.refresh && jwtToken.access) {
          console.log("Application data sent: ", fileObject);
          response = await sendObject(
            fileObject,
            jwtToken,
            setJwtToken,
            postUrl
          );
        } else {
          console.error("No token provided");
          const newToken = await getToken(setJwtToken);
          if (newToken) {
            response = await sendObject(
              fileObject,
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
          console.log("Application response Successfully:", response);
          setResume(response);
        } else {
          console.error("Received no result:", response);
          setError("Error occurred. Please try again or contact the support.");
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
          console.error("Error while contact submit occurred:", e.message);
        }
      } finally {
        console.log("Application request finished without trouble...");
        setLoading(false);
      }
    }
  }, [jobTitle, jwtToken]);

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
        placeholder={workExperiencePlaceholder}
        value={workExperience}
        multiline
        numberOfLines={10}
        extraStyles={workExperienceStyles}
        onChangeAction={setWorkExperience}
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