import {useState} from "react";


export const useBoolTrue = () => {
  const [bool, setBool] = useState<boolean>(true);
  const toggleSwitch = () => setBool(previousState => !previousState);

  return { bool, setBool, toggleSwitch }
}

export const useBoolFalse = () => {
  const [boolF, setBoolF] = useState<boolean>(false);
  const toggleBoolF = () => setBoolF(previousState => !previousState);

  return { boolF, setBoolF, toggleBoolF }
}