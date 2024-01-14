import {memo, useCallback, useContext, useRef, useState} from "react";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";
import {PrimaryContext, ToolContext} from "../../../Context";
import React from "react";
import UniversalTextCreator from "../../../../components/container/Tools/UniversalTextCreator";
import {DefaultInput} from "../../../../components/input/DefaultInput";

//STRINGS
const clear:string = "close";
const create:string = "create";
const placeholder:string = "Your written Card will be shown here";
const heading:string = "Create Cards for every occasion";

// INT
const maxLengthSmall = 100;
const maxLengthBig = 200;


const CardMain: React.FC  = () => {

  const [personFor, setPersonFor] = useState<string>("");
  const [extraInfos, setExtraInfos] = useState<string>("");
  const [moods, setMoods] = useState<string>("");

  const [editable, setEditable] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const bottomSheetRef = useRef<BottomSheetMethods>(null);


  // Context
  const {setResponse, response } = useContext(ToolContext);


  const {user } = useContext(PrimaryContext);

  const getCardPostObject = ():object => {
    return {
      "user_id": user?.uid,
      "input_type": "card",
      "personFor": personFor,
      "extraInfos": extraInfos,
      "moods": moods
    }
  }

  const handleClearField = useCallback(() => {
    setResponse("");
  }, [response])

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
              placeholder={"The Card is for... "}
              value={personFor}
              onChangeAction={handleClearField}
              extraStyles={{}}
              max_length= {maxLengthSmall}
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


export default memo(CardMain)
