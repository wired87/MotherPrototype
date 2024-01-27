import React, {useCallback, useContext, useRef, useState} from "react";
import {Camera, CameraCapturedPicture, CameraType, FlashMode, ImageType, VideoCodec} from "expo-camera";
import {Pressable, StyleSheet, Vibration, View, Image} from "react-native";
import {DefaultText} from "../text/DefaultText";
import {windowWidth} from "../../screens/chat/chatStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {MediaContext, PrimaryContext} from "../../screens/Context";


const CameraView:React.FC = (

) => {
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState<boolean>(false);
  const [muteVideo, setMuteVideo] = useState<boolean>(false);
  const [imageMirror, setImageMirror] = useState<boolean>(false);
  const [status, setStatus] = useState<number>(0);
  const [currentVideoRecording, setCurrentVideoRecording] =
    useState<boolean>(false);

  // CONTEXT
  const {loading, setLoading} = useContext(PrimaryContext);

  const {
    picture,
    updatePicture,
    video,
    updateVideo,
    cameraClicked,
    closeCam
  } = useContext(MediaContext);

  const cameraRef = useRef<Camera>(null);


  const [permission, requestPermission] = Camera.useCameraPermissions();


  const changeFlashMode = useCallback(() => {
    console.log("old flashmode state:", flashMode);
    setFlashMode(!flashMode);
  },[flashMode]);


  const flashModeProp = flashMode ? FlashMode.on : FlashMode.off;


  function toggleCameraType() {
    console.log("toggleCameraType called...")
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }


  const noCamPermission = useCallback(() => {
    return <DefaultText text={"No access to Camera"} />
  }, [cameraClicked])



  const stopVideoRecording = useCallback(() => {
    console.log("Check if there is an Video to stop...")
    if (!picture?.uri && video?.uri){
      console.log("Video stopped...")
      setCurrentVideoRecording(false);
      cameraRef.current?.stopRecording();
    }
  }, [picture, video])


  const handleRecordPicture = useCallback(async () => {
    setLoading(true)
    console.log("Record an image...");
     try{
       const image = await cameraRef.current?.takePictureAsync({
         base64: true,
         imageType: ImageType.png,
         isImageMirror: imageMirror,
         quality: 1,
         skipProcessing: false
       })
       console.log("Image recorded:", image?.uri);
       if (image) {
         console.log("setImage...")
         updatePicture(image);
       }
     }catch(e:unknown) {
       if (e instanceof Error) {
         console.log("Error while try recording an image:", e);
         setStatus(505);
       }
     }finally{
       setLoading(false);
     }
    }, [picture]);


  const startVideoRecording = useCallback(async()=> {
    Vibration.vibrate();
    console.log("Record an video...");
    setCurrentVideoRecording(true);
    try {
      const recording = await cameraRef.current?.recordAsync({
        codec: VideoCodec.AppleProRes422,
        maxDuration: 120,
        maxFileSize: undefined,
        mute: muteVideo,
        quality: '1080p'
      })
      console.log("Video recorded:", recording);
      if (recording){
        console.log("setVideo...")
        updateVideo(recording)
      }
    }catch(e:unknown){
      if (e instanceof Error){
        console.log("Error while try recording an Video:", e);
        setStatus(505);
      }
    }
  }, [video]);


  const toggleMuteVideo = useCallback(() => {
    setMuteVideo(!muteVideo)
  }, [muteVideo]);


  const handleDeleteImage = () => {
    updatePicture({} as CameraCapturedPicture);
  }



  const contentPreview  = useCallback(() => {

  }, [picture, loading, video]);


  const noPermissionView = () => {
    if (!permission?.granted) {
      return noCamPermission();
    }
  }
 // {videoPreview()}

  if (picture && picture.uri && !video?.uri && !loading) {
    console.log("Image uri available...");
    return (
      <View style={styles.container}>
      <Image source={{uri: picture.uri}}/>
        <View style={styles.bottomContainer}>
          <View style={styles.checkIconContainer}>
            <MaterialCommunityIcons name={"close"} size={40} onPress={handleDeleteImage}/>
          </View>
          <View style={styles.checkIconContainer}>
            <MaterialCommunityIcons name={"check"} size={40} onPress={closeCam}/>
          </View>
        </View>
      </View>
    )

  }else if(video && video?.uri && !loading && !picture?.uri){
    console.log("Video uri available...");
    return(
      <View style={styles.container}>

      <View style={styles.bottomContainer}>
          <View style={styles.checkIconContainer}>
            <MaterialCommunityIcons name={"close"} size={40} onPress={handleDeleteImage}/>
          </View>
          <View style={styles.checkIconContainer}>
            <MaterialCommunityIcons name={"check"} size={40} onPress={closeCam}/>
          </View>
        </View>
      </View>
    );

  }else{
    console.log("No uri available...");
    return(
      <View style={styles.container}>





      <Camera
        style={styles.camera}
        flashMode={flashModeProp}
        type={type}
        ref={cameraRef}>
        <View>
          <Pressable onPress={changeFlashMode}>
            <DefaultText text={"flashMode"} />
          </Pressable>

          <Pressable onPress={toggleCameraType}>
            <DefaultText text={"front/back cam"} />
          </Pressable>

          <Pressable onPress={closeCam}>
            <DefaultText text={"close"} />
          </Pressable>

          <Pressable onPress={toggleMuteVideo}>
            <DefaultText text={"mute video"} />
          </Pressable>

          <Pressable onPress={handleRecordPicture} onLongPress={startVideoRecording} onPressOut={stopVideoRecording}>
            <DefaultText text={"record Video"} />
          </Pressable>

        </View>
      </Camera>
      </View>

    );
  }
}


export default CameraView;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    /*
    width: windowWidth,
    height: windowHeight
    */
  },
  checkIconContainer: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    width: windowWidth,
    height: 70,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    left: 0,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  camera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',
  },
});


/*
recordAsync(options);
resumePreview();
stopRecording();
 */



