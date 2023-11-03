import { useState } from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native'
import {styles} from "./styles"

const windowWidth = Dimensions.get('window').width;

// @ts-ignore
const ToggleButton = ({ title, select, setSelect }) => {
    return (
        <TouchableOpacity onPress={setSelect} style={[select ? styles.buttonSelected : styles.button, {width: windowWidth * .9}]}>
            <Text style={styles.buttonText1}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ToggleButton

