
// AppIsReady Hook
import {useState} from "react";

export function useAppIsReady() {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  return {appIsReady, setAppIsReady};
}

// IsConnected Hook
export function useIsConnected() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  return {isConnected, setIsConnected};
}

// BottomSheetLoaded Hook
export function useBottomSheetLoaded() {
  const [bottomSheetLoaded, setBottomSheetLoaded] = useState<boolean>(false);
  return {bottomSheetLoaded, setBottomSheetLoaded};
}

// FirstContact Hook
export function useFirstContact() {
  const [firstContact, setFirstContact] = useState<boolean>(true);
  return {firstContact, setFirstContact};
}