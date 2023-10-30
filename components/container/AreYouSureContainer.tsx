import {DefaultContainer} from "./DefaultContainer";
import {DefaultText} from "../text/DefaultText";
import {styles} from "./contiStyles";
import {DefaultPageNavigationBtn} from "../buttons/DefaultPageNavigationBtn";
import {View} from "react-native";


// @ts-ignore
export const AreYouSureContainer = ({ text, action, closeModalAction }) => {
    return(
        <DefaultContainer
            extraStyles={undefined}>
            <DefaultText
                text={text}
                moreStyles={styles.modalH4} />
            <View style={{flexDirection: "row"}}>
                <DefaultPageNavigationBtn
                    text={"skip"}
                    onPressAction={closeModalAction}
                    extraTextStyles={undefined}
                    extraBtnStyles={undefined} />
                <DefaultPageNavigationBtn
                    text={"do it!"}
                    onPressAction={action}
                    extraTextStyles={undefined}
                    extraBtnStyles={undefined} />
            </View>
        </DefaultContainer>
    );
}
