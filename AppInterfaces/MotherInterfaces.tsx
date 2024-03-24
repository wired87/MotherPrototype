import {ReactNode, RefObject} from "react";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";
import {SwitchChangeEvent} from "react-native";

export interface LovoObjectTypes {
  speed: number;
  speaker: string;
  text: string;
}

export interface RightCornerTypes {
  icon: string;
  action: () => void;
}

export interface UniversalServiceScreenTypes {
  serviceUnLocked: boolean;
  serviceName: string;
  actionButton: () => ReactNode;
  children: ReactNode;
  confirmClick: () => void;
  sheetRef?: RefObject<BottomSheetMethods>;
  statusChildren?: ReactNode;
}


export interface LockObjectTypes {
  type: string;
  userName: string;
  password: string;
  synonym: string;
  uid?: string;
}

export interface UnlockObjectTypes {
  type: string;
  uid?: string
}

// Email
export interface SingleEmailServiceInter {
  name: string;
  isUnlocked: boolean;
  onSwitch: ((event: SwitchChangeEvent) => void | Promise<void>);
}


// Google