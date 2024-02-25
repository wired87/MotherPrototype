import {useState} from "react";


export const useBoolTrue = () => {
  const [bool, setBool] = useState<boolean>(true);
  const toggleSwitch = () => setBool(previousState => !previousState);

  return { bool, setBool, toggleSwitch }
}