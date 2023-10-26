import { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {themeColors} from "../../../theme/theme";

const ToggleButton = ({ title, select, setSelect }) => {
    return (
        <TouchableOpacity onPress={setSelect} style={select ? styles.buttonSelected : styles.button}>
            <Text style={styles.buttonText1}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ToggleButton

