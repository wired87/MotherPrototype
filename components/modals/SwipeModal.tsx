import React, {useCallback, useContext, useMemo} from "react";
import BottomSheet, { BottomSheetBackdrop, BottomSheetHandle } from '@gorhom/bottom-sheet';
import {ThemeContext} from "../../screens/Context";
import { StyleSheet } from "react-native";

/*
***IMPORTANT***
* react native reanimated need changes on the babel file:
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin', -> last one
    ],
  };
};
*/

interface SwipeModalProps {
  Content: React.ReactNode;
  modalIndex?: number;
  bottomSheetRef: React.Ref<BottomSheet>
}

const modalStyle = StyleSheet.create(
  {
    bottomSheetStyles: {
      borderTopLeftRadius: 14,
      borderTopRightRadius: 14
    }
  }
)

export const SwipeModal: React.FC<SwipeModalProps> = (
    {
      Content,
      modalIndex,
      bottomSheetRef
    }
) => {
  const { customTheme } = useContext(ThemeContext);

  const defaultSnapPoints = useMemo(() => ['25%', '50%', "75%", "90%"], []);

  return(
    <BottomSheet
       ref={bottomSheetRef}
       index={modalIndex || -1} // initial snap index
       snapPoints={defaultSnapPoints}
      // bottom to top
       overDragResistanceFactor={2.5} // how violently(heftig) the modal has to be stopped at pull up
       detached={false} // setup if the bottomSheet is attached to the bottom
       enableContentPanningGesture={true} // Enable content panning gesture interaction.
       enableHandlePanningGesture={true} // Enable handle panning gesture interaction.
       enableOverDrag={true} // activate the overdraw effect (like you are at the bottom at a webapge and scrol more)
       enablePanDownToClose={true} // able to wish the bs down so it closes
       enableDynamicSizing={false} // universal size
       animateOnMount={true} //

       backgroundStyle={{backgroundColor: "transparent"}}
       handleStyle={undefined}
       handleIndicatorStyle={undefined}

      // Layout Configuration
       handleHeight={24} //

      // keyboard configuration
       keyboardBehavior={"interactive"} // extend (extend the bs till max point,
      // fillParent (fill out parrent objects),
      // interactive(offset the sheet for keyboardsize)
       keyboardBlurBehavior={"none"} // none
      // restore
       android_keyboardInputMode={"adjustPan"} // !android only --- adjustResize
       activeOffsetX={undefined} // how far the user has been to swipe Horizontal before bottomsheet detect it
       activeOffsetY={undefined} //how far the user has been to swipe Vertical before bottomsheet detect it
       failOffsetX={undefined} // value if a user swipe too much Horizontal the action will be break
       failOffsetY={undefined} // value if a user swipe too much Horizontal the action will be break

      // Callbacks
       onAnimate={undefined} // called before bottomsheet starts his movement

      // Components
      handleComponent={BottomSheetHandle} // header with the icon to close or swipe up
      backdropComponent={BottomSheetBackdrop} // for the background of the sheet default null. BottomSheetBackdrop
       footerComponent={undefined} // component for the footer
      // styles
       style={
         [
           modalStyle.bottomSheetStyles,
           {
             backgroundColor: customTheme.bottomSheetBg
           }
        ]
       }>
      {Content}
    </BottomSheet>
  );
}

