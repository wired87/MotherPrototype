// this file define all the possible cases for updating a state


export const setNewValue = () => ({
    type: "UPDATE_OBJECT"
});

export const updateUser = () => ({
    type: "SING_IN"
})

export const loading = () => ({
    type: "LOADING"
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
export const purchaseScreenAccessPointBool = () => ({
    type: "PURCHASEACCESS"
})
export const newLogout = () => ({
    type: "NEW_LOGOUT"
})