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


const EmailMain: React.FC  = () => {

  const [kind, setKind] = useState<string>("");
  const [extraInfos, setExtraInfos] = useState<string>("");
  const [goal, setGoal] = useState<string>("");

  const [editable, setEditable] = useState<boolean>(false);

  const {user } = useContext(PrimaryContext);

  const getCardPostObject = ():object => {
    return {
      "user_id": user?.uid,
      "input_type": "email",
      "kind": kind,
      "extraInfos": extraInfos,
      "goal": goal
    }
  }

  return(
    <>
      <UniversalTextCreator
        placeholder={placeholder}
        editable={editable}
        heading={heading}
        postObject={getCardPostObject}
        Content={
          <>
            <DefaultInput
              placeholder={"Which kind of E-Mail?"}
              value={kind}
              onChangeAction={setKind}
              extraStyles={{}}
              max_length= {maxLengthSmall}
              recordingOption
              showClearButton
            />
            <DefaultInput
              placeholder={"Goals?"}
              value={goal}
              onChangeAction={setGoal}
              extraStyles={{}}
              max_length={maxLengthBig}
              recordingOption
              showClearButton
            />
            <DefaultInput
              placeholder={"Extra Information's to provide?"}
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


export default memo(EmailMain);
