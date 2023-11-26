import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View} from 'react-native';
export const AlertBox = ({ // @ts-ignore
   modalVisible, setModalVisible, // @ts-ignore
   buttonText, redirectAction, errorAnimation
}) => {

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}
        supportedOrientations={ // just IOS
            ['portrait', 'landscape']
        }>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {errorAnimation}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible)
                  redirectAction()
                }}>
                  <Text style={styles.textStyle}>{buttonText}</Text>
              </Pressable>
            </View>
          </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    errorImg: {
        width: 100,
        height: 100,
        marginVertical: 10,
    }
});

