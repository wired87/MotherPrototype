import React, {useCallback, useContext, useMemo, useState} from "react";
import BottomSheet, { BottomSheetBackdrop, BottomSheetHandle } from '@gorhom/bottom-sheet';
import {PrimaryContext} from "../../screens/Context";

/*
***IMPORTANT***
* react native reanimated need changes on teh babel file:
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
    ],
  };
};
*/

interface SwipeModalProps {
  animation?: any; // Ersetze 'any' durch einen spezifischen Typ, falls verfügbar
  Content: React.ReactNode;
  modalIndex: number;
  bottomSheetRef: React.Ref<BottomSheet>
}

export const SwipeModal: React.FC<SwipeModalProps> = (
    // @ts-ignore
    {
      Content,
      modalIndex,
    }
) => {
  const {bottomSheetRef} = useContext(PrimaryContext);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const defaultSnapPoints = useMemo(() => ['25%', '50%', "75%", "90%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

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

       backgroundStyle={undefined}
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
       onChange={handleSheetChanges} // called when the sheet positio changed
       onAnimate={undefined} // called before bottomsheet starts his movement

      // Components
      handleComponent={BottomSheetHandle} // header with the icon to close or swipe up
      backdropComponent={BottomSheetBackdrop} // for the background of the sheet default null. BottomSheetBackdrop
       footerComponent={undefined} // component for the footer
      // styles
       style={{
         backgroundColor: "transparent",
       }}>
      {Content}
    </BottomSheet>
  );
}

