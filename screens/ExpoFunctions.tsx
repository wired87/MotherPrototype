import {Share} from "react-native";
import * as Sharing from 'expo-sharing';
import {Dispatch, SetStateAction} from "react";

export const share = async(
  customTheme: any,
  content?: any,
  title? : string,
) => {
  try {
    const result = await Share.share({
        title: title || "Share AIX",
        message: content || "AIX the AI of you",
        url: "https://example.de",
      },
      {
        dialogTitle: "Look at this cool new App!",
        subject: "The cooles App ever!",
        tintColor: customTheme.text,
      }
    );
    if (result?.action === Share.sharedAction) {
      if (result.activityType) {
        console.log("1")
      } else {
        console.log("2")
      }
    } else if (result.action === Share.dismissedAction) {
      console.log("3")
    }
  } catch (error: any) {
    console.log(error.message);
  }
}

export const sharePdf = async (
  pdfUri: any, setError: Dispatch<SetStateAction<string>>
  ) => {
  try {
    // Überprüfen, ob das Teilen von Dateien möglich ist
    if (!(await Sharing.isAvailableAsync())) {
      console.log("Das Teilen ist auf diesem Gerät nicht verfügbar.");
      return;
    }
    // Teilen der PDF-Datei
    await Sharing.shareAsync(pdfUri, {
      mimeType: 'application/pdf', // Setzt den MIME-Type auf PDF
      dialogTitle: "Share this PDF",
      UTI: 'com.adobe.pdf'
    });
  } catch (error: unknown) {
    if (error instanceof Error) setError(error.message);
  }
};