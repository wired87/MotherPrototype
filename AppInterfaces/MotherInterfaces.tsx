import {Dispatch, SetStateAction} from "react";

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
  setServiceUnLocked: Dispatch<SetStateAction<boolean>>;
  unLockService: (() => void);
  lockService: (() => void);
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