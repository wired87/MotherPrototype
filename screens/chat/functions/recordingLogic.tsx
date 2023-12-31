import { Dispatch, SetStateAction } from "react";
import {Audio} from "expo-av";
import {Recording} from "expo-av/build/Audio/Recording";

type StartRecordingFunction = (args: {
  setUserRecording: Dispatch<SetStateAction<any>>,
}) => Promise<void>;

export const startRecording: StartRecordingFunction = async (
  {
    setUserRecording,
  }
) => {
  try {
    console.log('Requesting permissions...');
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true
    });
    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
    await recording.startAsync();
    console.log('Starting recording...');
    console.log("RECORDING:", recording)
    setUserRecording(recording);
  } catch (err) {
    console.error('Failed to start recording', err);
  } finally {
    console.log("userRecording startRecording");
  }
}


export const stopRecordingProcess = async( userRecording: Recording | null ) => {
  console.log('Stopping recording..');
  try {
    await userRecording?.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({allowsRecordingIOS: false});
    return userRecording?.getURI();
  }catch(e: unknown) {
    if (e instanceof Error) {
      console.log("Error occurred while stopping the Audio:", e);
    }
  }
  return null
}
