import React, {useCallback, useContext} from "react";
import DefaultContainer from "../../components/container/DefaultContainer";
import {useMotherResponse, useSound} from "../../AppHooks/AudioHooks";
import {MOTHER_URL} from "@env";
import {getMotherRequestData} from "../../AppFunctions/GetObjectFunctions";
import {useLoading, useMotherError} from "../../AppHooks/PrimaryHooks";
import {PrimaryContext} from "../Context";
import {MotherTranscriptButton} from "../../components/buttons/MotherTranscriptButton";
import {SpeechErrorEvent, SpeechResultsEvent} from "@react-native-voice/voice";
import {Vibration} from "react-native";
import {textToSpeech} from "../../AppFunctions/TTSFunctions";

interface MotherMainTypes {

}

/* ALL STEPS
- USER TRANSCRIBE AUDIO
- SEND AUDIO TO BACKEND
- GEMINI ANSWERS THE TEXT INPUT AND SEND IT BACK
- CHECK THE LEN AND SPLIT IT
- LOOP THROUGH THE LIST AND SEND EVERY ITEM TO LOVO ENDPOINT
- RECEIVE THE AUDIO URL
- PLAY THE AUDIO
 */


export const MotherMain: React.FC<MotherMainTypes> = () => {
  // HOOKS
  const { updateSound } = useSound();
  const { updateMotherError , setMotherError} = useMotherError();
  const {updateLoading} = useLoading();
  const {defaultPostRequest, user} = useContext(PrimaryContext);
  const {setMotherResponse} = useMotherResponse();

  const splitString = (inputString:string) => {
    let stringList = [];
    while (inputString.length > 500) {
      stringList.push(inputString.substring(0, 499));
      inputString = inputString.substring(499);
    }
    stringList.push(inputString);
    return stringList;
  }


  const _onSpeechResults = (r:SpeechResultsEvent) => {
    console.log("Speech Result created. Begin sending Process...");
    const newTranscript:string | undefined = r?.value?.[0];
    if ( newTranscript && newTranscript.length > 0 ) {
      updateLoading();
      console.log("Send the transcript...")
      sendData(newTranscript)
        .then(() => {
            console.log("Talk Data sent...");
          }
        )
    }else {
      Vibration.vibrate();
      console.log("Transcript Length === 0...")
      setMotherError("Couldn't transcribe anything...");
    }
  }

  const sendData = useCallback(async (newTranscript: string) => {
    try{
      await defaultPostRequest(
        MOTHER_URL,
        getMotherRequestData(newTranscript, user?.uid),
        setMotherError,
        setMotherResponse,
      )
    }catch(e:unknown) {
      if(e instanceof Error) {
        console.log("Could not send the Mother Request cause the following error:", e);
      }
    }finally {
      updateLoading();
    }
  }, [setMotherError, setMotherResponse]);

  const errorHandling = () => {};

  const _onSpeechError = (e: SpeechErrorEvent) => {
    console.error("Error occurred while handling the speech:", e);
    textToSpeech(
      "Sorry, i couldn't hear anything. Please repeat it a bit louder. Im not the youngest",
      errorHandling,
      updateMotherError,
      updateLoading,
      updateSound,
    )
      .then(() => {
        console.log("ErrorMessage Sent")
      })
  }

  return(
    <DefaultContainer>
      <MotherTranscriptButton
        onSpeechError={_onSpeechError}
        onSpeechResults={_onSpeechResults}
      />
    </DefaultContainer>
  );
}



/* EXAMPLE SPEAKER

  const motherAnimation = useCallback(() => {
    if (loading){
      return <></>
    }else {
      return(
        <>

        </>
      );
    }
  }, [
    loading
  ]);

      "id": "63b417fb241a82001d51df6a",
      "displayName": "Aahna Konar",
      "locale": "ta-MY",
      "gender": "female",
      "imageUrl": "https://cdn.lovo.ai/f5349e2d/Aahna+Konar.jpeg",
      "speakerType": "global",
      "speakerStyles": [
        {
          "deprecated": false,
          "id": "63b417fb241a82001d51df6b",
          "displayName": "Default",
          "sampleTtsUrl": "https://cdn.lovo.ai/speaker-tts-samples/prod/ta-MY-KaniNeural-default.wav"
        }
      ]
    },
     */


/* EXAMPLE RESPONSE
{
  "data": [
    {
      "pronunciations": [],
      "status": "succeeded",
      "text": "Alo o live places!!!",
      "speaker": "63b417fb241a82001d51df6a",
      "speakerStyle": "63b417fb241a82001d51df6b",
      "speed": 1,
      "pause": [],
      "emphasis": [],
      "urls": [
        "https://cdn.lovo.ai/private/team%2F65c661b6b9103364a71a1d2b%2Fjobs%2F65c685f3dfb5e46802d8e509%2Fivrq8amK4d.wav?Expires=1707595640&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9jZG4ubG92by5haS9wcml2YXRlL3RlYW0lMkY2NWM2NjFiNmI5MTAzMzY0YTcxYTFkMmIlMkZqb2JzJTJGNjVjNjg1ZjNkZmI1ZTQ2ODAyZDhlNTA5JTJGaXZycThhbUs0ZC53YXYiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3MDc1OTU2NDB9fX1dfQ__&Signature=hm-OTqofZ5OFaiNsGz0-IQYCLKx9JQ6rEi7r3B37dZtnSxFb3SsTfmDPczMS08BiXwE7DTov2-C6NEt0IBc9Tio5j-tTBT%7EiVnQAQ9UEvxGjqOOxpm3Dy2MdYEtPXJnujCiLFn1c03wvUIUUEP6Jv5rGEJGCooAKJzBJEy5hMXCktQsdbPIwcd8tYt3xmo5aKawdlYf4Axu%7Ec3vI1Dva2sQRe3aZo8BaVVYIsuFYz3dC6FZytXdesmd30N1wb0B-y4fX-frmuhKmQpS8ddpQc6tfxewCybnOZj7RfP%7ETqa1KA1JjD02yMAI25pHqapg%7E4Muwim8rYMvVx2GR9nu01g__&Key-Pair-Id=K2HY7WG95BORGX"
      ]
    }
  ],
  "id": "65c685f3dfb5e46802d8e509",
  "type": "tts",
  "status": "done",
  "progress": 100,
  "team": "65c661b6b9103364a71a1d2b",
  "createdAt": "2024-02-09T20:07:15.825Z"
}
 */




