import React, {memo} from "react";
import {StyleSheet} from "react-native";
import {MotherNavContext} from "../screens/Context";
import {ReactNodeInterface} from "../AppInterfaces/UniversalHookInterfaces";
import {useToggleScreen} from "../AppHooks/MotherHooks/useToggleScreen";


const ls = StyleSheet.create(
  {
    main: {
      width: 100,
      height: 100,
      backgroundColor: "red",
    }
  }
)

const MotherNavContextProvider: React.FC<ReactNodeInterface> = (
  {
    children
  }
) => {

  const { toggleScreen, setToggleScreen, updateToggleScreen } = useToggleScreen();

  return(
    <MotherNavContext.Provider value={{toggleScreen, updateToggleScreen}} >
      {
        children
      }
    </MotherNavContext.Provider>
  );
}

export default memo(MotherNavContextProvider);
