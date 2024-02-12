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
import {PrimaryContext, ThemeContext} from "../../../Context";
import {DefaultButton} from "../../../../components/buttons/DefaultButton";
import {DefaultText} from "../../../../components/text/DefaultText";

import {Vibration} from "react-native";
import {getCurrentLanguage} from "../../../../AppFunctions/AppFunctions";
import {toolStyles as ts} from "../../toolStyles";
import {StyleProps} from "react-native-reanimated";
import { RESUME_URL } from "@env";

// STRINGS
const titlePlaceholder: string = "Job Title";
const skillsPlaceholder: string = "Your skills for the Job (optional)";
const contactPlaceholder: string = "Contact Person (optional)";
const languagePlaceholder: string = "Application Language (eng/de/fr/...";
const personalDataPlaceholder: string = "Contact Information's (optional)";
const workExperiencePlaceholder: string = "Work experience (optional)";


const create: string = "Create";
const filedErrorMessage: string = "This Field is required";





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

  const {user,defaultPostRequest } = useContext(PrimaryContext);

  // STYLES
  const extraInputStyles: StyleProps = {backgroundColor: "transparent", borderColor: customTheme.text}
  const workExperienceStyles: StyleProps = [ts.input, {minHeight: 100}];

  const get_language = useCallback((language: string) => {
    return language.length === 0? getCurrentLanguage() : language
  }, []);

  const createApplicationObject = (
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

  const handleSearch = async () => {
    if (jobTitle.length == 0) {
      Vibration.vibrate();
      setFieldError(true);
      return;
    }
    await defaultPostRequest(
      RESUME_URL,
      createApplicationObject(),
      setError,
      setResume,
      undefined,
      true
    )
  };

  const FieldError = useMemo(() => {
    if (fieldError) {
      return <DefaultText text={filedErrorMessage} moreStyles={undefined} error={fieldError} />
    }
  }, [fieldError])

  return(
    <>
      <DefaultInput
        label={"Job Title"}
        placeholder={titlePlaceholder}
        value={jobTitle}
        extraStyles={extraInputStyles}
        onChangeAction={setJobTitle}
      />

      {FieldError}

      <DefaultInput
        label={"Skills"}
        placeholder={skillsPlaceholder}
        value={skills}
        multiline={true}
        numberOfLines={5}
        extraStyles={workExperienceStyles}
        onChangeAction={setSkills}
      />

      <DefaultInput
        label={"Work Experience"}
        placeholder={workExperiencePlaceholder}
        value={workExperience}
        multiline
        numberOfLines={10}
        extraStyles={workExperienceStyles}
        onChangeAction={setWorkExperience}
      />

      <DefaultInput
        label={"Contact Person"}
        placeholder={contactPlaceholder}
        value={contactPerson}
        extraStyles={extraInputStyles}
        onChangeAction={setContactPerson}
      />

      <DefaultInput
        label={"Personal Data"}
        placeholder={personalDataPlaceholder}
        value={personalData}
        extraStyles={extraInputStyles}
        onChangeAction={setPersonalData}
        keyboardType={"email-address"}
      />

      <DefaultInput
        label={"Language"}
        placeholder={languagePlaceholder}
        value={language}
        extraStyles={extraInputStyles}
        onChangeAction={setLanguage}
      />

      <DefaultButton
        extraStyles={undefined}
        onPressAction={handleSearch}
        text={create}
        secondIcon={undefined}
      />

    </>
  );
}

export default memo(ResumeContent);