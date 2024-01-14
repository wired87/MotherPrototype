import React, {memo, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {ThemeContext} from "../../../Context";

import {ScrollView} from "react-native";
import {toolStyles as ts} from "../../toolStyles";
import UniversalTextCreator from "../../../../components/container/Tools/UniversalTextCreator";
import ResumeContent from "./Content";
import SwipeModal from "../../../../components/modals/SwipeModal";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";
import ErrorContainerSwipeModal from "../../../../components/container/ErrorContainerSwipeModal";

const heading: string = "AI Job Application \n creator"
const placeholderResume: string = "Your written Application will be shown here.."

const ResumeCreator: React.FC = () => {
  const [editable, setEditable] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const [resume, setResume] = useState<string>("");

  
  // Context
  const { customTheme } = useContext(ThemeContext);


  // STYLES
  const backgroundColor = {backgroundColor: customTheme.primary};


  const Content = useMemo(() => {
    return <ResumeContent
              setError={setError}
              setResume={setResume}
    />
  }, []);


  const updateModalIndex = useCallback((number:number) => {
      bottomSheetRef?.current?.snapToIndex(number);
  }, [])


  useEffect(() => {
    if (error.length > 0) {
      console.log("Error in ResumeCreator:", error);
      updateModalIndex(2);
    }
  }, [error]);


  return(
    <ScrollView style={backgroundColor} contentContainerStyle={ts.justifyAlign}>
      <UniversalTextCreator
        placeholder={placeholderResume}
        editable={editable}
        heading={heading}
        Content={Content}
        source={""}      />
      <SwipeModal
        bottomSheetRef={bottomSheetRef}
        modalIndex={-1}
        Content={
          <ErrorContainerSwipeModal error={error}/>
      }
      />
    </ScrollView>
  );
}

export default memo(ResumeCreator);