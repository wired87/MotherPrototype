import {memo, useContext, useState} from "react";

import React from "react";
import {PrimaryContext, ThemeContext} from "../../../Context";
import UniversalTextCreator from "../../../../components/container/Tools/UniversalTextCreator";
import {DefaultInput} from "../../../../components/input/DefaultInput";
import {toolStyles as ts} from "../../toolStyles";
import {ScrollView} from "react-native";


//STRINGS
const heading:string = "Diet and Training Plan writer";

// INT
const maxLengthSmall:number = 100;
const maxLengthBig:number = 200;


const placeholder:string = `Your written Tex will be shown here...`


const FitnessMain: React.FC  = () => {

  const [weight, setWeight] = useState<string>("");
  const [extraInfos, setExtraInfos] = useState<string>("");
  const [planType, setPlanType] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [physique, setPhysique] = useState<string>("");

  const [editable, setEditable] = useState<boolean>(false);

  // Context
  const { customTheme } = useContext(ThemeContext);
  const {user } = useContext(PrimaryContext);

  // STYLES
  const backgroundColor = {backgroundColor: customTheme.primary};

  const getFitnessPostObject = ():object => {
    return {
      "user_id": user?.uid,
      "input_type": "fitness",
      "weight": weight,
      "extraInfos": extraInfos,
      "physique": physique,
      "goal": goal,
      "planType": planType
    }
  }

  return(
    <ScrollView style={backgroundColor} contentContainerStyle={ts.justifyAlign}>
    <UniversalTextCreator
      placeholder={placeholder}
      editable={editable}
      heading={heading}
      postObject={getFitnessPostObject}
      Content={<>
        <DefaultInput
          label={"Plan Type"}
          placeholder={"Diet Plan, Training Plan..."}
          value={planType}
          onChangeAction={setPlanType}
          extraStyles={{}}
          max_length={maxLengthSmall}
          recordingOption
          showClearButton/>

        <DefaultInput
          placeholder={"Goal..."}
          value={goal}
          onChangeAction={setGoal}
          extraStyles={{}}
          max_length={maxLengthBig}
          recordingOption
          showClearButton/>

        <DefaultInput
          label={"Current Weight"}
          placeholder={"default: kg..."}
          value={weight}
          onChangeAction={setWeight}
          extraStyles={{}}
          max_length={maxLengthBig}
          recordingOption
          showClearButton/>

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
          extraStyles={{}}
          max_length={maxLengthBig}
          recordingOption
          showClearButton/>
      </>} source={""}      />
    </ScrollView>
  );
}


export default memo(FitnessMain);
