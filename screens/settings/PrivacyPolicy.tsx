import {StyleSheet, Text, View} from "react-native";
import {DefaultText} from "../../components/text/DefaultText";
import {BottomSheetScrollView} from "@gorhom/bottom-sheet";
import {memo, useContext} from "react";
import {ThemeContext} from "../Context";

const styles = StyleSheet.create({
  text: {
    textAlign: "left",
    fontSize: 14,
    lineHeight: 30,
    color: "black"
  },
  textContainer: {
    gap: 15,
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  heading: {
    fontSize: 29
  },
})

const PrivacyPolicy = () => {

  const { customTheme } = useContext(ThemeContext);
  const policyTextStyles = {color: customTheme.text}
  return (
    <BottomSheetScrollView
      style={styles.scrollView}>
      <Text style={[styles.heading, policyTextStyles]}>
        Privacy Policy
      </Text>

      <View style={styles.textContainer}>
        <DefaultText
          moreStyles={policyTextStyles}
          text={ "Privacy Policy " +
            "            \n" +
            "            \n" +
            "            \nLast updated: November 08, 2023 " +
            "            \n" +
            "            \nThis Privacy Policy describes Our policies and procedures on the collection, " +
            "            \nuse and disclosure of Your information when You use the Service and tells You " +
            "            \nabout Your privacy rights and how the law protects You. " +
            "           \n " +
            "           \n We use Your Personal data to provide and improve the Service. By using the " +
            "            \nService, You agree to the collection and use of information in accordance with " +
            "            \nthis Privacy Policy. This Privacy Policy has been created with the help of the " +
            "            \n[Privacy Policy Generator](https://www.privacypolicies.com/privacy-policy- " +
            "           \ngenerator/). " +
            "          \n  " +
            "           \n " +
            "\n" +
            "          \n "}/>
      </View>

      <View  style={styles.textContainer}>
        <DefaultText
          moreStyles={policyTextStyles}
          text={"Interpretation and Definitions \nInterpretation " +
            "\n" +
            "          \n  " +
            "           \n The words of which the initial letter is capitalized have meanings defined " +
            "            \nunder the following conditions. The following definitions shall have the same " +
            "            \nmeaning regardless of whether they appear in singular or in plural. " +
            "            \n" +
            "            \nDefinitions " +
            "            \n~~~~~~~~~~~ " +
            "            \n" +
            "            \nFor the purposes of this Privacy Policy: " +
            "            \n" +
            "            \n* Account means a unique account created for You to access our Service or " +
            "            \nparts of our Service. " +
            "            \n" +
            "            \n* Affiliate means an entity that controls, is controlled by or is under " +
            "            \ncommon control with a party, where \"control\" means ownership of 50% or " +
            "            \nmore of the shares, equity interest or other securities entitled to vote " +
            "            \nfor election of directors or other managing authority. " +
            "            \n" +
            "            \n* Application refers to AIX, the software program provided by the Company. " +
            "            \n" +
            "            \n* Company (referred to as either \"the Company\", \"We\", \"Us\" or \"Our\" in this " +
            "            \nAgreement) refers to codingWizard, Klingestr. 22. " +
            "            \n" +
            "            \n* Country refers to: Sachsen, Germany " +
            "            \n" +
            "            *\n Device means any device that can access the Service such as a computer, a " +
            "           \ncellphone or a digital tablet. " +
            "           \n " +
            "            \n* Personal Data is any information that relates to an identified or " +
            "            \nidentifiable individual. " +
            "           \n " +
            "           \n\n * Service refers to the Application. " +
            "         \n   " +
            "          \n  * Service Provider means any natural or legal person who processes the data " +
            "        \n    on behalf of the Company. It refers to third-party companies or " +
            "         \n   individuals employed by the Company to facilitate the Service, to provide " +
            "          \n  the Service on behalf of the Company, to perform services related to the " +
            "          \n  Service or to assist the Company in analyzing how the Service is used. " +
            "        \n    " +
            "        \n\n    * Usage Data refers to data collected automatically, either generated by the " +
            "        \n    use of the Service or from the Service infrastructure itself (for example, " +
            "           \n the duration of a page visit). " +
            "        \n    " +
            "        \n    * You means the individual accessing or using the Service, or the company, " +
            "          \n  or other legal entity on behalf of which such individual is accessing or " +
            "      \n      using the Service, as applicable. " +
            "        \n     " +
            "           \n"}/>
      </View>
      <View  style={styles.textContainer}>
        <DefaultText
          moreStyles={policyTextStyles}
          text={"Collecting and Using Your Personal Data " +
            "        \n    --------------------------------------- " +
            "        \n    " +
            "       \n     Types of Data Collected " +
            "       \n     ~~~~~~~~~~~~~~~~~~~~~~~ " +
            "     \n       " +
            "      \n      Personal Data " +
            "       \n     ************* " +
            "       \n     " +
            "        \n    While using Our Service, We may ask You to provide Us with certain personally " +
            "    \n        identifiable information that can be used to contact or identify You. " +
            "      \n      Personally identifiable information may include, but is not limited to: " +
            "      \n      " +
            "       \n     * Email address " +
            "       \n     " +
            "       \n     * Usage Data " +
            "  \n          " +
            "   \n         " +
            "    \n        Usage Data " +
            "    \n        ********** " +
            "     \n       " +
            "     \n       Usage Data is collected automatically when using the Service. " +
            "     \n       " +
            "     \n       Usage Data may include information such as Your Device's Internet Protocol " +
            "      \n      address (e.g. IP address), browser type, browser version, the pages of our " +
            "      \n      Service that You visit, the time and date of Your visit, the time spent on " +
            "      \n      those pages, unique device identifiers and other diagnostic data. " +
            "     \n       " +
            "     \n       When You access the Service by or through a mobile device, We may collect " +
            "    \n        certain information automatically, including, but not limited to, the type of " +
            "    \n        mobile device You use, Your mobile device unique ID, the IP address of Your " +
            "    \n        mobile device, Your mobile operating system, the type of mobile Internet " +
            "     \n       browser You use, unique device identifiers and other diagnostic data. " +
            "       \n     " +
            "      \n      We may also collect information that Your browser sends whenever You visit our " +
            "      \n      Service or when You access the Service by or through a mobile device. " +
            "      \n      "}/>
      </View>
      <View  style={styles.textContainer}>
        <DefaultText
          moreStyles={policyTextStyles}
          text={ "\n" +
            "            Use of Your Personal Data " +
            " " +
            "            \n" +
            "            \nThe Company may use Personal Data for the following purposes:\n " +
            "            \n" +
            "            \n* To provide and maintain our Service , including to monitor the usage of " +
            "            \nour Service. " +
            "            \n" +
            "            \n* To manage Your Account: to manage Your registration as a user of the " +
            "            \nService. The Personal Data You provide can give You access to different " +
            "            \nfunctionalities of the Service that are available to You as a registered " +
            "            \nuser. " +
            "            \n" +
            "            \n* For the performance of a contract: the development, compliance and \n" +
            "            undertaking of the purchase contract for the products, items or services \n" +
            "            You have purchased or of any other contract with Us through the Service.\n" +
            "            \n" +
            "            * To contact You: To contact You by email, telephone calls, SMS, or other \n" +
            "            equivalent forms of electronic communication, such as a mobile\n " +
            "            application's push notifications regarding updates or informative \n" +
            "            communications related to the functionalities, products or contracted \n" +
            "            services, including the security updates, when necessary or reasonable for \n" +
            "            their implementation. \n" +
            "            \n" +
            "            * To provide You with news, special offers and general information about \n" +
            "            other goods, services and events which we offer that are similar to those \n" +
            "            that you have already purchased or enquired about unless You have opted \n" +
            "            not to receive such information.\n " +
            "            \n" +
            "            * To manage Your requests: To attend and manage Your requests to Us.\n " +
            "            \n" +
            "            * For business transfers: We may use Your information to evaluate or conduct\n " +
            "            a merger, divestiture, restructuring, reorganization, dissolution, or\n " +
            "            other sale or transfer of some or all of Our assets, whether as a going \n" +
            "            concern or as part of bankruptcy, liquidation, or similar proceeding, in \n" +
            "            which Personal Data held by Us about our Service users is among the assets \n" +
            "            transferred. \n" +
            "            \n" +
            "            * For other purposes : We may use Your information for other purposes, such \n" +
            "            as data analysis, identifying usage trends, determining the effectiveness \n" +
            "            of our promotional campaigns and to evaluate and improve our Service, \n" +
            "            products, services, marketing and your experience.\n " +
            "            \n" +
            "            \n" +
            "            We may share Your personal information in the following situations: \n" +
            "            \n" +
            "            * With Service Providers: We may share Your personal information with v" +
            "            Service Providers to monitor and analyze the use of our Service, to \n" +
            "            contact You. \n" +
            "            * For business transfers: We may share or transfer Your personal information \n" +
            "            in connection with, or during negotiations of, any merger, sale of Company \n" +
            "            assets, financing, or acquisition of all or a portion of Our business to \n" +
            "            another company. \n" +
            "            * With Affiliates: We may share Your information with Our affiliates, in \n" +
            "            which case we will require those affiliates to honor this Privacy Policy. \n" +
            "            Affiliates include Our parent company and any other subsidiaries, joint\n " +
            "            venture partners or other companies that We control or that are under \n" +
            "            common control with Us.\n " +
            "            * With business partners: We may share Your information with Our business \n" +
            "            partners to offer You certain products, services or promotions. \n" +
            "            * With other users: when You share personal information or otherwise\n " +
            "            interact in the public areas with other users, such information may be\n " +
            "            viewed by all users and may be publicly distributed outside. \n" +
            "            * With Your consent : We may disclose Your personal information for any \n" +
            "            other purpose with Your consent. \n" +
            "            \n" +
            "            Retention of Your Personal Data \n" +
            "            \n" +
            "            \n" +
            "            The Company will retain Your Personal Data only for as long as is necessary\n " +
            "            for the purposes set out in this Privacy Policy. We will retain and use Your \n" +
            "            Personal Data to the extent necessary to comply with our legal obligations \n" +
            "            (for example, if we are required to retain your data to comply with applicable \n" +
            "            laws), resolve disputes, and enforce our legal agreements and policies.\n " +
            "            \n" +
            "            The Company will also retain Usage Data for internal analysis purposes. Usage \n" +
            "            Data is generally retained for a shorter period of time, except when this data\n " +
            "            is used to strengthen the security or to improve the functionality of Our\n " +
            "            Service, or We are legally obligated to retain this data for longer time \n" +
            "            periods. " +
            "            \n"}/>
      </View>
      <View  style={styles.textContainer}>
        <DefaultText
          moreStyles={policyTextStyles}
          text={"Transfer of Your Personal Data\n " +
            "            \n" +
            "            " +
            "            Your information, including Personal Data, is processed at the Company's\n " +
            "            operating offices and in any other places where the parties involved in the\n " +
            "            processing are located. It means that this information may be transferred to —\n " +
            "            and maintained on — computers located outside of Your state, province, country \n" +
            "            or other governmental jurisdiction where the data protection laws may differ \n" +
            "            than those from Your jurisdiction. \n" +
            "            \n" +
            "            Your consent to this Privacy Policy followed by Your submission of such \n" +
            "            information represents Your agreement to that transfer. \n" +
            "            \n" +
            "            The Company will take all steps reasonably necessary to ensure that Your data\n " +
            "            is treated securely and in accordance with this Privacy Policy and no transfer\n " +
            "            of Your Personal Data will take place to an organization or a country unless\n " +
            "            there are adequate controls in place including the security of Your data and \n" +
            "            other personal information. \n" +
            "           \n" +
            "            Delete Your Personal Data \n" +
            "            \n " +
            "            \n" +
            "            You have the right to delete or request that We assist in deleting the \n" +
            "            Personal Data that We have collected about You. \n" +
            "            " +
            "            Our Service may give You the ability to delete certain information about You\n " +
            "            from within the Service. \n" +
            "            \n" +
            "            You may update, amend, or delete Your information at any time by signing in to \n" +
            "            Your Account, if you have one, and visiting the account settings section that\n " +
            "            allows you to manage Your personal information. You may also contact Us to\n " +
            "            request access to, correct, or delete any personal information that You have\n " +
            "            provided to Us.\n " +
            "            \n" +
            "            Please note, however, that We may need to retain certain information when we \n" +
            "            have a legal obligation or lawful basis to do so. \n" +
            "            \n" +
            "            Disclosure of Your Personal Data\n " +
            "            \n " +
            "            \n" +
            "            Business Transactions\n " +
            "            \n" +
            "            " +
            "            If the Company is involved in a merger, acquisition or asset sale, Your\n " +
            "            Personal Data may be transferred. We will provide notice before Your Personal\n " +
            "            Data is transferred and becomes subject to a different Privacy Policy. \n" +
            "            " +
            "            Law enforcement\n " +
            "             \n" +
            "            \n" +
            "            Under certain circumstances, the Company may be required to disclose Your \n" +
            "            Personal Data if required to do so by law or in response to valid requests by\n " +
            "            public authorities (e.g. a court or a government agency). \n" +
            "            " +
            "            Other legal requirements \n" +
            "            ************************ \n" +
            "            " +
            "            The Company may disclose Your Personal Data in the good faith belief that such\n " +
            "            action is necessary to: \n" +
            "            " +
            "            * Comply with a legal obligation \n" +
            "            * Protect and defend the rights or property of the Company\n " +
            "            * Prevent or investigate possible wrongdoing in connection with the Service\n " +
            "            * Protect the personal safety of Users of the Service or the public\n " +
            "            * Protect against legal liability \n"}/>
      </View>
      <View  style={styles.textContainer}>
        <DefaultText
          moreStyles={policyTextStyles}
          text={"Security of Your Personal Data \n" +
            "            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n" +
            "            \n" +
            "            The security of Your Personal Data is important to Us, but remember that no \n" +
            "            method of transmission over the Internet, or method of electronic storage is \n" +
            "            100% secure. While We strive to use commercially acceptable means to protect \n" +
            "            Your Personal Data, We cannot guarantee its absolute security. \n" +
            "            \n" +
            "            Children's Privacy \n" +
            "            ------------------ \n" +
            "            \n" +
            "            Our Service does not address anyone under the age of 13. We do not knowingly \n" +
            "            collect personally identifiable information from anyone under the age of 13. \n" +
            "            If You are a parent or guardian and You are aware that Your child has provided \n" +
            "            Us with Personal Data, please contact Us. If We become aware that We have \n" +
            "            collected Personal Data from anyone under the age of 13 without verification \n" +
            "            of parental consent, We take steps to remove that information from Our \n" +
            "            servers. \n" +
            "            \n" +
            "            If We need to rely on consent as a legal basis for processing Your information \n" +
            "            and Your country requires consent from a parent, We may require Your parent's \n" +
            "            consent before We collect and use that information. \n" +
            "            \n" +
            "            Links to Other Websites \n" +
            "            ----------------------- \n" +
            "            \n" +
            "            Our Service may contain links to other websites that are not operated by Us. \n" +
            "            If You click on a third party link, You will be directed to that third party's \n" +
            "            site. We strongly advise You to review the Privacy Policy of every site You \n" +
            "            visit. \n" +
            "            \n" +
            "            We have no control over and assume no responsibility for the content, privacy \n" +
            "            policies or practices of any third party sites or services. \n" +
            "            dddddsad\n" +
            "            Changes to this Privacy Policy \n" +
            "            ------------------------------ \n" +
            "            \n" +
            "            We may update Our Privacy Policy from time to time. We will notify You of any \n" +
            "            changes by posting the new Privacy Policy on this page. \n" +
            "            \n" +
            "            We will let You know via email and/or a prominent notice on Our Service, prior \n" +
            "            to the change becoming effective and update the \"Last updated\" date at the top \n" +
            "            of this Privacy Policy. \n" +
            "            \n" +
            "            You are advised to review this Privacy Policy periodically for any changes. \n" +
            "            Changes to this Privacy Policy are effective when they are posted on this \n" +
            "            page. \n" +
            "            \n" +
            "            Contact Us \n" +
            "            ---------- \n" +
            "            \n" +
            "            If you have any questions about this Privacy Policy, You can contact us: \n" +
            "            \n" +
            "            * By email: codingwizardaix@gmail.com "}/>
      </View>

    </BottomSheetScrollView>
  );
}

export default memo(PrivacyPolicy);
/*

         <FlatList data={sections}
      renderItem={({ item, index }) => (
        <View key={index} style={styles.textContainer}>
          <Text style={styles.text} key={index}>
            {item.text}
          </Text>
        </View>
      )}/>

       {sections.map((item, index) => (
        <View key={index} style={styles.textContainer}>
          <Text style={styles.text} key={index}>
            {item.text}
          </Text>
        </View>
      ))}
 */