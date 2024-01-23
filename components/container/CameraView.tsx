import React, {memo, useCallback, useContext, useState} from "react";
import {Camera, CameraType, FlashMode} from "expo-camera";
import {Pressable, StyleSheet, View} from "react-native";
import {DefaultText} from "../text/DefaultText";
import {PermissionResponse} from "expo-image-picker";
import {MediaContext} from "../../screens/Context";


const CameraView:React.FC = () => {
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState<boolean>(false);


  const [hasPermission, setHasPermission] =
    useState<PermissionResponse>({} as PermissionResponse);


  const { closeCam, cameraClicked } = useContext(MediaContext);

  console.log("closeCam2:",closeCam);

  const [permission, requestPermission] = Camera.useCameraPermissions();


  const changeFlashMode = useCallback(() => {
    console.log("old flashmode state:", flashMode);
    setFlashMode(!flashMode);
  },[flashMode]);


  const flashModeProp = flashMode ? FlashMode.on : FlashMode.off;


  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const noCamPermission = useCallback(() => {
    return <DefaultText text={"No access to Camera"} />
  }, [cameraClicked])


  if (!permission?.granted) {
    return noCamPermission();
  }else {
    return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          flashMode={flashModeProp}
          type={type}
        >
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