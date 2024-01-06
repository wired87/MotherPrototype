import React, {Dispatch, memo, SetStateAction, useCallback, useContext, useMemo, useState} from "react";
import {DefaultInput} from "../../../../components/input/DefaultInput";
import {postMessageObject} from "../../../chat/functions/SendProcess";
import {PrimaryContext, ThemeContext} from "../../../Context";
import {DefaultButton} from "../../../../components/buttons/DefaultButton";
import {DefaultText} from "../../../../components/text/DefaultText";
import firebase from "firebase/compat";

import {Vibration} from "react-native";

// STRINGS
const titlePlaceholder: string = "Job Title";
const skillsPlaceholder: string = "Your skills for the Job (optional)";
const contactPlaceholder: string = "Contact Person (optional)";
const languagePlaceholder: string = "Application Language (eng/de/fr/...";
const personalDataPlaceholder: string = "Contact Information's (optional)";

const create: string = "Create";
const filedErrorMessage = "This Field is required";
const postUrl: string = "http://wired87.pythonanywhere.com/open/text-request/";

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
  const { setLoading, jwtToken } = useContext(PrimaryContext);
  const { user } = useContext(PrimaryContext);

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
      "inputType": "APPLICATION_CREATOR",
      "user_id": user?.uid
    }
  }

  const handleResumeCreatePress = useCallback(async () => {
    if (jobTitle.length == 0) {
      Vibration.vibrate();
      setFieldError(true);
    }else {
      setError("");
      setFieldError(false);
      setLoading(true);
      const fileObject = createApplicationObject(user);
      try {
        const res = await postMessageObject(
          jwtToken?.access || "1",
          fileObject,
          postUrl, {
            timeout: 20000
          }
        )
        setResume(res.message)
      }catch(e:unknown){
        setLoading(false);
        if (e instanceof Error && e){
          setError("Could not create your Resume.\n AI returned the following Issue:" + e?.message);
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