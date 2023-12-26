import {memo, useCallback, useContext} from "react";
import {IconButton} from "react-native-paper";
import {styles as s} from "./styles"
import {InputContext, ThemeContext} from "../../screens/Context";
import {startRecording} from "../../screens/chat/functions/recordingLogic";
const RecordingButtonTTS = () => {

  const { customTheme } = useContext(ThemeContext);
  const { userRecording, setUserRecording } = useContext(InputContext);

  // styles
  const recordingButtonStyles = [s.redordingButton, {borderColor: customTheme.text}]

  const handlePressIn = useCallback(async() => {
    await startRecording({setUserRecording});
  }, [userRecording])


  const handlePressOut = useCallback(async() => {
    await startRecording({setUserRecording});
  }, [userRecording])


  return(
    <IconButton icon={"microphone"} style={recordingButtonStyles} onPressIn={handlePressIn} onPressOut={}/>

  );

}

export default memo(RecordingButtonTTS);