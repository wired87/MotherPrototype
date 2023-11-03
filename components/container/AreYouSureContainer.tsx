import {DefaultContainer} from "./DefaultContainer";
import {DefaultText} from "../text/DefaultText";
import {styles} from "./contiStyles";
import {DefaultPageNavigationBtn} from "../buttons/DefaultPageNavigationBtn";
import {View} from "react-native";


// @ts-ignore
export const AreYouSureContainer = ({ text, action, closeModalAction }) => {
    return(
        <DefaultContainer
            extraStyles={{paddingHorizontal: 20, gap: 50,}}>
            <DefaultText
                text={text}
                moreStyles={styles.modalH4} />
            <View style={{flexDirection: "row"}}>
                <DefaultPageNavigationBtn
                    text={"Skip"}
                    onPressAction={closeModalAction}
                    extraTextStyles={undefined}
                    extraBtnStyles={undefined} />
                <DefaultPageNavigationBtn
                    text={"Do it!"}
                    onPressAction={action}
                    extraTextStyles={undefined}
                    extraBtnStyles={undefined} />
            </View>
        </DefaultContainer>
    );
}
