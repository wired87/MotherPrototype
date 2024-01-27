import {memo, useCallback, useContext, useEffect, useState} from "react";

import React from "react";
import {PrimaryContext, ThemeContext} from "../../../Context";
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
  const [fieldError, setFieldError] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string>("");
  const [height, setHeight] = useState<string>("");

  // Context
  const { customTheme } = useContext(ThemeContext);
  const {user, loading, defaultPostRequest } = useContext(PrimaryContext);

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

  const sendData = useCallback(async () => {
    if (planType.length == 0 || gender.length == 0) {
      Vibration.vibrate();
      console.log("No planType or gender provided...")
      setFieldError("No planType or gender provided...");
      return;
    }

    await defaultPostRequest(
      TEXT_REQUEST_URL,
      getFitnessPostObject(),
      setError,
      setSearchResult,undefined,
      true,

    )
  }, [loading, planType, gender]);


  useEffect(() => {
    if(fieldError) {
      setTimeout(() => {
        setFieldError("");
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
        heading={heading}
        source={fitness}
        response={searchResult}
        setResponse={setSearchResult}
        sendData={sendData}
        error={error}
        successAnimation={fitness}
        Content={<>
          <DefaultInput
            label={"Plan Type"}
            placeholder={"e.g. Diet, Training, ..."}
            value={planType}
            onChangeAction={setPlanType}
            max_length={maxLengthSmall}
          />

          <DefaultInput
            label={"Your Goal"}
            placeholder={"e.g. Build Muscle..."}
            value={goal}
            onChangeAction={setGoal}
            max_length={maxLengthBig}
          />

          <DefaultInput
            label={"Your Gender"}
            placeholder={"e.g Male..."}
            value={gender}
            onChangeAction={setGender}
            max_length={maxLengthBig}
          />

          <DefaultInput
            label={"Current Weight"}
            placeholder={"in kg"}
            value={weight}
            onChangeAction={setWeight}
            max_length={maxLengthBig}
            keyboardType={"decimal-pad"}
          />

          <DefaultInput
            label={"Current height"}
            placeholder={"in cm"}
            value={height}
            onChangeAction={setHeight}
            max_length={maxLengthBig}
            keyboardType={"number-pad"}
          />

          <DefaultInput
            label={"How you would describe yourself?"}
            placeholder={"Normal, Muscular, ..."}
            value={physique}
            onChangeAction={setPhysique}
            max_length={maxLengthBig}
          />

          <DefaultInput
            label={"Extra information's"}
            placeholder={"Extra Information's to provide"}
            value={extraInfos}
            onChangeAction={setExtraInfos}
            extraStyles={moreInfosInput}
            max_length={maxLengthBig}
            numberOfLines={4}
          />

          {
            fieldErrorComp()
          }
        </>
      }
      />
    </ScrollView>
  );
}


export default memo(FitnessMain);
