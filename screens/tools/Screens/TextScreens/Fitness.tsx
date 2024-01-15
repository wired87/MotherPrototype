import {memo, useCallback, useContext, useEffect, useState} from "react";

import React from "react";
import {PrimaryContext, ThemeContext, ToolContext} from "../../../Context";
import UniversalTextCreator from "../../../../components/container/Tools/UniversalTextCreator";
import {DefaultInput} from "../../../../components/input/DefaultInput";
import {toolStyles as ts} from "../../toolStyles";
import {ScrollView, Vibration} from "react-native";
import {getLanguage} from "../../../../AppFunctions";
import {TEXT_REQUEST_URL} from "@env";
import fitness from "../../../../assets/animations/fitness.json";
import {DefaultText} from "../../../../components/text/DefaultText";

//STRINGS
const heading:string = "Diet and Training Plan writer";

// INT
const maxLengthSmall:number = 100;
const maxLengthBig:number = 200;

const placeholder:string = `Your custom Plan will be shown here...`;

const FitnessMain: React.FC  = () => {
  const [weight, setWeight] = useState<string>("");
  const [extraInfos, setExtraInfos] = useState<string>("");
  const [planType, setPlanType] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [physique, setPhysique] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [fieldError, setFieldError] = useState<boolean>(false);
  const [alreadyRunning, setAlreadyRunning] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [editable, setEditable] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<string>("");
  const [height, setHeight] = useState<string>("");

  // Context
  const { customTheme } = useContext(ThemeContext);
  const {user, loading } = useContext(PrimaryContext);
  const {toolPostRequest } = useContext(ToolContext);

  // STYLES
  const backgroundColor = {backgroundColor: customTheme.primary};
  const moreInfosInput = [
    ts.input, {minHeight: 80}];


  const getFitnessPostObject = ():object => {
    return {
      "user_id": user?.uid,
      "input_type": "fitness",
      "weight": weight,
      "extraInfos": extraInfos,
      "physique": physique,
      "goal": goal,
      "planType": planType,
      "language": getLanguage(),
      "sex": gender,
    }
  }

  const handleSearch = async () => {
    if (planType.length == 0 || gender.length == 0) {
      Vibration.vibrate();
      console.log("No planType or gender provided...")
      setFieldError(true);
      return;
    }else if (loading) {
      Vibration.vibrate();
      setAlreadyRunning(true);
      return;
    }
    setWeight("")
    setExtraInfos("")
    setPhysique("")
    setGoal("")
    setPlanType("")
    setFieldError(false)
    setAlreadyRunning(false)
    setError("");
    setSearchResult("");

    await toolPostRequest(
      TEXT_REQUEST_URL,
      getFitnessPostObject(),
      setError,
      setSearchResult
    )
  };


  useEffect(() => {
    if(fieldError) {
      setTimeout(() => {
        setFieldError(false);
      }, 4000);
    }
  }, [fieldError]);

  const fieldErrorComp = useCallback(() => {
    if (fieldError) {
      return(
        <DefaultText
          error
          text={"Provide minimum your gender and the wished Plan Type"}
          moreStyles={ts.text}/>
      );
    }else{
      return <></>
    }
  }, [fieldError]);

  return(
    <ScrollView style={backgroundColor} contentContainerStyle={ts.justifyAlign}>
      <UniversalTextCreator
        placeholder={placeholder}
        editable={editable}
        heading={heading}
        source={fitness}
        response={searchResult}
        setResponse={setSearchResult}
        sendData={handleSearch}
        error={error}
        Content={
          <>
            <DefaultInput
              label={"Plan Type"}
              placeholder={"e.g. Diet, Training, ..."}
              value={planType}
              onChangeAction={setPlanType}
              extraStyles={{}}
              max_length={maxLengthSmall}
              recordingOption
              showClearButton
            />

            <DefaultInput
              placeholder={"Goal..."}
              value={goal}
              onChangeAction={setGoal}
              extraStyles={{}}
              max_length={maxLengthBig}
              recordingOption
              showClearButton/>

            <DefaultInput
              label={"Gender"}
              placeholder={"e.g Male..."}
              value={gender}
              onChangeAction={setGender}
              extraStyles={{}}
              max_length={maxLengthBig}
              recordingOption
              showClearButton/>

            <DefaultInput
              label={"Current Weight"}
              placeholder={"in kg"}
              value={weight}
              onChangeAction={setWeight}
              extraStyles={{}}
              max_length={maxLengthBig}
              recordingOption
              showClearButton
              keyboardType={"decimal-pad"}
            />

            <DefaultInput
              label={"Current height"}
              placeholder={"in cm"}
              value={height}
              onChangeAction={setHeight}
              extraStyles={{}}
              max_length={maxLengthBig}
              recordingOption
              showClearButton
              keyboardType={"number-pad"}
            />

            <DefaultInput
              label={"How you would describe yourself?"}
              placeholder={"Normal, Muscular, ..."}
              value={physique}
              onChangeAction={setPhysique}
              extraStyles={{}}
              max_length={maxLengthBig}
              recordingOption
              showClearButton/>

            <DefaultInput
              placeholder={"Extra Information's to provide"}
              value={extraInfos}
              onChangeAction={setExtraInfos}
              extraStyles={moreInfosInput}
              max_length={maxLengthBig}
              recordingOption
              showClearButton
              numberOfLines={4}
            />

            {fieldErrorComp()}

          </>
        }
      />
    </ScrollView>
  );
}


export default memo(FitnessMain);
