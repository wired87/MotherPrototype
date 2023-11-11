// this file define all the possible cases for updating a state

import {HistorySent} from "./Actions";

export const updateUser = () => ({
    type: "SING_IN"
})

export const loading = () => ({
    type: "LOADING"
})

export const logout = () => ({
    type: "LOGOUT"
})

export const user = () => ({
    type: "USER"
})

export const historySent= () => ({
    type: "HistorySent"
})

export const text = () => ({
    type: "TEXT"
})

export const icon = () => ({
    type: "ICON"
})

export const screens = () => ({
    type: "SCREENS"
})

export const darkmode = () => ({
    type: "DARKMODE"
})
export const colors = () => ({
    type: "COLORS"
})

export const errors = () => ({
    type: "ERRORS"
})
