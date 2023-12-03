import React, {memo, useContext} from 'react';
import {Modal, Text, Pressable, View} from 'react-native';
import {ActivityIndicator} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import LottieView from "lottie-react-native";
import {useSelector} from "react-redux";
import {styles} from "./styles";
import {PrimaryContext} from "../../screens/Context";

const AwaitConfirmationModal = (
    // @ts-ignore
    { success, modalVisible, setModalVisible, action, lottieSource }
) => {
    // @ts-ignore
    const screen = useSelector(state => state.screens.screens)
  const {loading} = useContext(PrimaryContext);

  const navigation = useNavigation();

  return (
      <View style={styles.centeredView}>
          <Modal
              animationType="slide"
              transparent={true} // let the backgound transparent -> presentationStyle={"pageSheet"} fill the bg.
              visible={modalVisible}
              onRequestClose={() => {
                  setModalVisible(!modalVisible);
              }}
              supportedOrientations={ // just IOS
                  ['portrait', 'landscape']
              }
          >
              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      {loading? (
                          <ActivityIndicator style={{marginVertical: 30,}} size="small" color="#0000ff" />
                      ):(
                          <LottieView
                              style={[{flex: 1, justifyContent: "center", alignItems: "center"}]}
                              source={lottieSource}
                              autoPlay
                              loop
                              colorFilters={[{keypath: 'Plane', color: 'rgb(255, 100, 0)'}]}
                              resizeMode="cover"/>
                      )}
                      {action}
                      <Pressable
                          style={[styles.redirectLogin]}
                          onPress={() => {
                              setModalVisible(!modalVisible);
                          }}>
                          <Text style={{color: '#fff', fontSize: 15, }}>Go back</Text>
                      </Pressable>
                      {success ? (
                          // @ts-ignore
                          <Pressable onPress={() => {navigation.navigate(screen.toolsMain)}}>
                              <Text style={{color: '#fff', fontSize: 15, }}>
                                  Go Home
                              </Text>
                          </Pressable>
                      ):null}
                  </View>
              </View>
          </Modal>
          {}
      </View>
  );
};

export default memo(AwaitConfirmationModal);

