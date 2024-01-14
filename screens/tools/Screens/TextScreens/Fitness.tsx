import {memo, useContext, useState} from "react";

import React from "react";
import {PrimaryContext} from "../../../Context";
import UniversalTextCreator from "../../../../components/container/Tools/UniversalTextCreator";
import {DefaultInput} from "../../../../components/input/DefaultInput";


//STRINGS
const heading:string = "Create Story's, Poems and much more...";

// INT
const maxLengthSmall:number = 100;
const maxLengthBig:number = 200;


const placeholder:string = `Your written Tex will be shown here...`


const FitnessMain: React.FC  = () => {

  const [weight, setWeight] = useState<string>("");
  const [extraInfos, setExtraInfos] = useState<string>("");
  const [planType, setPlanType] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [selfDescription, setSelfDescription] = useState<string>("");

  const [editable, setEditable] = useState<boolean>(false);

  const {user } = useContext(PrimaryContext);

  const getFitnessPostObject = ():object => {
    return {
      "user_id": user?.uid,
      "input_type": "fitness",
      "weight": weight,
      "extraInfos": extraInfos,
      "selfDescription": selfDescription,
      "goal": goal
    }
  }

  return(
    <>
      <UniversalTextCreator
        placeholder={placeholder}
        editable={editable}
        heading={heading}
        postObject={getFitnessPostObject}
        Content={
          <>
            <DefaultInput
              label={"Plan Type"}
              placeholder={"Diet Plan, Training Plan..."}
              value={planType}
              onChangeAction={setPlanType}
              extraStyles={{}}
              max_length= {maxLengthSmall}
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
              showClearButton
            />
            <DefaultInput
              label={"Current Weight"}
              placeholder={"default: kg..."}
              value={weight}
              onChangeAction={setWeight}
              extraStyles={{}}
              max_length={maxLengthBig}
              recordingOption
              showClearButton
            />
            <DefaultInput
              label={"How you would describe yourself?"}
              placeholder={"normal, Muscular, ..."}
              value={selfDescription}
              onChangeAction={setSelfDescription}
              extraStyles={{}}
              max_length={maxLengthBig}
              recordingOption
              showClearButton
            />
            <DefaultInput
              placeholder={"Extra Information's to provide"}
              value={extraInfos}
              onChangeAction={setExtraInfos}
              extraStyles={{}}
              max_length={maxLengthBig}
              recordingOption
              showClearButton
            />
          </>
        }
      />
    </>
  );
}


export default memo(FitnessMain);
