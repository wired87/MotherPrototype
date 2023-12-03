import React, {memo, Dispatch, SetStateAction} from 'react';
import {ActivityIndicator} from 'react-native';
import {useSelector} from "react-redux";
import {themeColors} from "../../../../colors/theme";

import {ContactDefault} from "./ContactDefault";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";
import {BottomSheetScrollView} from "@gorhom/bottom-sheet";

interface ContactTypes {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  setStatus: Dispatch<SetStateAction<number>>,
}

const Contact: React.FC<ContactTypes> = (
  {
    bottomSheetRef,
    setStatus
  }
) => {

  return (
    <BottomSheetScrollView contentContainerStyle={{justifyContent: "center", alignItems: "center"}} style={{paddingTop: 50}} >
      <ContactDefault  bottomSheetRef={bottomSheetRef} setStatus={setStatus}/>
    </BottomSheetScrollView>
  );
};
export default memo(Contact);




/*
<>
            <HeadingText
              text={"Contact"}
              extraStyles={localStyles.headingExtras}
            />
            {(matchedError? (
              <DefaultText
                text={matchedError.message}
                moreStyles={localStyles.errormessageStyles}
              />
            ):null)}
            <View>
              {inputOptions.map((item, index) => (
                <DefaultInput
                  key={index}
                  placeholder={item.placeholder}
                  onChangeAction={(text: any) => handleChange(text, item.name)}
                  secure={false}
                  editable={true}
                  extraStyles={undefined}
                  keyboardType={item.name === "e_mail" ? "email-address" : undefined}
                  value={
                    index === 0 ? (form as any)["first_name"] :
                    index === 1 ? (form as any)["last_name"] :
                    index === 2 ? (form as any)["e_mail"]: null}
                />
              ))}
            </View>
            <Picker style={[inputStyles.defaultInput, localStyles.inputExtra]}
                    selectedValue={(form as any)["option"]}
                    onValueChange={(itemValue, itemIndex) => handleChange(itemValue, "option")}>
                {options.map((item, index) => (
                  <Picker.Item style={inputStyles.defaultInput} label={item} value={item} key={index}/>
                ))}
            </Picker>

            <MultilineInput
              onChangeText={(text: string) => handleChange(text, "message")}
              placeholder={"Your Message"}
              value={(form as any)["message"]}
            />

            <DefaultButton
              extraStyles={undefined}
              onPressAction={() => onSubmit(form)}
              text={"Send"}
              secondIcon={
                  <MaterialCommunityIcons name={"email-open-multiple-outline"} size={18} color="white" />
              }
            />
            <DefaultText
              text={"Problems with Contact form?\n Send us your E-Mail directly: info@sales-detective.live"}
              moreStyles={[localStyles.extraTextStyles, {color: customTheme.text}]}
            />
          </>
 */