import React, {memo, useCallback, useContext, useEffect, useState} from "react";
import DefaultContainer from "../../components/container/DefaultContainer";
import TranscribeButton from "../../components/buttons/TranscribeButton";
import {Vibration} from "react-native";
import {LOVO_API_KEY, TEXT_REQUEST_URL} from "@env";
import {PrimaryContext} from "../Context";
import {getLanguage} from "../../AppFunctions";
import {Audio} from 'expo-av';



const lovoErrorCodes = [
  400,
  401,
  402,
  422
]
interface LovoObjectTypes {
  speed: number;
  speaker: string;
  text: string;
}
interface MotherMainTypes {

}

/* ALL STEPS
- USER TRANSCRIBE AUDIO
- SEND AUDIO TO BACKEND
- GEMINI ANSWERS THE TEXT INPUT AND SEND IT BACK
- SEND RESPONSE TO LOVO ENDPOINT
- RECEIVE THE AUDIO URL
- PLAY THE AUDIO
 */



const MotherMain: React.FC<MotherMainTypes> = (

) => {

  const [error, setError] = useState<string>("");
  const [transcript, setTranscript] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [sound, setSound] = useState<Audio.Sound>();

  const {user, defaultPostRequest } = useContext(PrimaryContext);

  const getData = ():object => {
    return {
      "user_id": user?.uid,
      "input_type": "talk",
      "language": getLanguage(),
      "input": transcript,
    }
  }

  const sendData = useCallback(async () => {
    if ( transcript.length == 0 ) {
      Vibration.vibrate();
      console.log("No planType or gender provided...")
      setError("No planType or gender provided...");
      return;
    }
    await defaultPostRequest(
      TEXT_REQUEST_URL,
      getData(),
      setError,
      setResponse,
    )
  }, [transcript]);


  useEffect(() => {
    if ( transcript.length > 0 ) {
      console.log("Send the transcript...")
      sendData()
        .then(() => {
          console.log("Talk Data sent...");
          setTranscript("");
        }
      )
    }
  }, [transcript]);
  async function playSound(fileUri:string) {
    console.log('Loading Sound...');
    if (fileUri) {
      const { sound } = await Audio.Sound.createAsync({uri: fileUri});
      setSound(sound);

      console.log('Playing Sound...');
      await sound.playAsync();
    }
  }

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);


  const errorHandling = () => {

  }
  const getLovoObject = (): LovoObjectTypes => {
    return{
      speed: 1,
      text: response,
      speaker: "63b417fb241a82001d51df6a"
    }
  };

  const textToSpeech = useCallback(async() => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-KEY': LOVO_API_KEY
      },
      body: JSON.stringify(getLovoObject())
    };
    try {
      const speechResponse = await fetch('https://api.genny.lovo.ai/api/v1/tts/sync', options);
      const jsonResponse = await speechResponse.json();
      console.log("JSONRESPONSE LOVO:", jsonResponse);
      if (lovoErrorCodes.includes(jsonResponse.statusCode)) {
        errorHandling();
      } else if(jsonResponse && jsonResponse.data[0] && jsonResponse.data[0].urls) {
        await playSound(jsonResponse.data.urls);
      }else {
        console.log("Something unexpected happened...");
        setError("Unexpected Error. Please try again...")
      }
    }catch(e:unknown) {
      if( e instanceof Error ) {
        console.log("Error occurred:", e);
        setError(e.toString());
      }
    }
  }, [response]);




  useEffect(() => {
    if ( response.length > 0 ) {
      console.log("Response.length > 0:",response);
      textToSpeech()
        .then(() => {
          console.log("tts finished...")
      })
    }
  }, [response]);

  const updateTranscript = (text: string) => {
    setTranscript(text)
  }

  return(
    <DefaultContainer>
      <TranscribeButton
        setError={setError}
        transcript={transcript}
        setTranscript={updateTranscript}
      />
    </DefaultContainer>
  );
}

export default memo(MotherMain);


/* EXAMPLE SPEAKER
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




