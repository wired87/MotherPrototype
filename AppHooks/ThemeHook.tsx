
// Darkmode Hook
import {useState} from "react";
import {darkModeTheme, lightModeTheme, Theme} from "../screens/Context";

export function useDarkmode() {
  const [darkmode, setDarkmode] = useState<boolean>(false);

  const toggleTheme = () => setDarkmode(!darkmode);

  return {darkmode, setDarkmode, toggleTheme};
}

// CustomTheme Hook
export function useCustomTheme() {
  const {darkmode} = useDarkmode();
  const [customTheme, setCustomTheme] =
    useState<Theme>(darkmode ? darkModeTheme : lightModeTheme);
  return {customTheme, setCustomTheme};
}