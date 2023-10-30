import React, { useState, useRef, useEffect } from "react";

import {
    Modal,
    View,
    StyleSheet,
    Animated,
    Dimensions,
    PanResponder,
    TouchableWithoutFeedback,
    Easing,
    ImageBackground,
    Keyboard,
    NativeSyntheticEvent,
} from "react-native";

const {height} = Dimensions.get("window");

// @ ts-ignore
export const DefaultModal = (props: {
    duration: any;
    DisableHandAnimation: any;
    onClose: () => void;
    modalVisible: unknown;
    OpenModalDirection: string;
    PressToanimate: unknown;
    PressToanimateDirection: string;
    HeaderStyle: any;
    ContentModalStyle: any;
    MainContainerModal: any;
    fade: any;
    onRequestClose: ((event: NativeSyntheticEvent<any>) => void) | undefined;
    ImageBackgroundModal: any;
    ImageBackgroundModalStyle: any;
    ContentModal: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;
    HeaderContent: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {

    const TIMING_CONFIG = {
        duration: props.duration ? props.duration : 450,
        easing: Easing.inOut(Easing.ease),
    };

    const pan = useRef(new Animated.ValueXY()).current;

    let [isAnimating, setIsAnimating] = useState(
        !!props.DisableHandAnimation
    );

    let animatedValueX = 0;

    let animatedValueY = 0;

    const panResponder = useRef(
        PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: () => false,
            onStartShouldSetPanResponderCapture: () => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                if (isAnimating) {
                    return false;
                }
                return gestureState.dy > 22;

            },
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: animatedValueX,
                    y: animatedValueY,
                });
                pan.setValue({ x: 0, y: 0 }); // Initial value
            },
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dy > 0) {
                    pan.setValue({ x: 0, y: gestureState.dy });
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
                // Flatten the offset so it resets the default positioning
                if (gestureState.dy > 0 && gestureState.vy > 0) {
                    if (gestureState.vy <= -0.7 || gestureState.dy <= -100) {
                        setIsAnimating(true);
                        Animated.timing(pan, {
                            toValue: { x: 0, y: -height },
                            ...TIMING_CONFIG,
                            useNativeDriver: false,
                        }).start(() => {
                            setIsAnimating(false);
                            props.onClose();
                        });
                    } else if (gestureState.vy >= 0.5 || gestureState.dy >= 100) {
                        setIsAnimating(true);
                        Animated.timing(pan, {
                            toValue: { x: 0, y: height },
                            ...TIMING_CONFIG,
                            useNativeDriver: false,
                        }).start(() => {
                            setIsAnimating(false);
                            props.onClose();
                        });
                    } else {
                        setIsAnimating(true);
                        Animated.spring(pan, {
                            toValue: 0,
                            useNativeDriver: false,
                        }).start(() => {
                            setIsAnimating(false);
                            // props.onClose();
                        });
                    }
                } else {
                    setIsAnimating(true);
                    Animated.spring(pan, {
                        toValue: 0,
                        useNativeDriver: false,
                    }).start(() => {
                        setIsAnimating(false);
                        // props.onClose();
                    });
                }
            },
        })
    ).current;

    useEffect(() => {
        if (props.modalVisible) {
            animatedValueX = 0;
            animatedValueY = 0;
            pan.setOffset({
                x: animatedValueX,
                y: animatedValueY,
            });
            pan.setValue({
                x: 0,
                y: props.OpenModalDirection == "up" ? -height : height,
            }); // Initial value
            pan.x.addListener((value) => (animatedValueX = value.value));
            pan.y.addListener((value) => (animatedValueY = value.value));
        }
    }, [props.modalVisible]);

    useEffect(() => {
        if (props.PressToanimate) {
            setIsAnimating(true);
            Animated.timing(pan, {
                toValue: {
                    x: 0,
                    y: props.PressToanimateDirection == "up" ? -height : height,
                },
                ...TIMING_CONFIG,
                useNativeDriver: false,
            }).start(() => {
                setIsAnimating(false);
                props.onClose();
            });
        }
    }, [props.PressToanimate]);

    let handleGetStyle = (opacity: Animated.AnimatedInterpolation<string | number>) => {
        return [
            [
                styles.container,
                {
                    transform: [{ translateX: pan.x }, { translateY: pan.y }],
                    opacity: opacity,
                },
                [props.HeaderStyle],
            ],
        ];
    };

    let handleGetStyleBody = (opacity: Animated.AnimatedInterpolation<string | number>) => {
        return [
            [
                styles.background,
                {
                    transform: [{ translateX: pan.x }, { translateY: pan.y }],
                    opacity: opacity,
                },
            ],
            [props.ContentModalStyle],
        ];
    };
    let handleMainBodyStyle = (opacity: Animated.AnimatedInterpolation<string | number>) => {
        return [
            [
                styles.ContainerModal,
                {
                    opacity: opacity,
                },
            ],
            [props.MainContainerModal],
        ];
    };

    let interpolateBackgroundOpacity = pan.y.interpolate({
        inputRange: [-height, 0, height],
        outputRange: [props.fade ? 0 : 1, 1, props.fade ? 0 : 1],
    });


    return (
        <Modal
            animationType="none"
            transparent={true}
            // @ts-ignore
            visible={props.modalVisible}
            onShow={() => {
                setIsAnimating(true);
                Animated.timing(pan, {
                    ...TIMING_CONFIG,
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false,
                }).start(() => {
                    setIsAnimating(false);
                });
            }}
            onRequestClose={props.onRequestClose}
        >
            <Animated.View style={handleMainBodyStyle(interpolateBackgroundOpacity)}>
                <Animated.View
                    style={handleGetStyleBody(interpolateBackgroundOpacity)}
                    {...panResponder.panHandlers}
                >
                    <TouchableWithoutFeedback
                        onPress={() => Keyboard.dismiss()}
                        style={styles.TouchWithoutFeedBack}
                    >
                        <ImageBackground
                            source={props.ImageBackgroundModal && props.ImageBackgroundModal}
                            style={styles.ImageBackground}
                            imageStyle={
                                props.ImageBackgroundModalStyle &&
                                props.ImageBackgroundModalStyle
                            }
                        >
                            {props.ContentModal}
                        </ImageBackground>
                    </TouchableWithoutFeedback>
                </Animated.View>
                <Animated.View
                    style={handleGetStyle(interpolateBackgroundOpacity)}
                    {...panResponder.panHandlers}
                >
                    <TouchableWithoutFeedback>
                        {props.HeaderContent ? props.HeaderContent : <View />}
                    </TouchableWithoutFeedback>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    background: {
        opacity: 0,
        flex: 1,
        marginTop: 55,
    },
    container: {
        marginTop: 50,
        position: "absolute",
        width: "100%",
    },
    ContainerModal: { backgroundColor: "rgba(0, 0, 0, 0.5)", flex: 1 },
    ImageBackground: {
        width: "100%",
        height: "100%",
    },
    TouchWithoutFeedBack: { flex: 1 },
});
