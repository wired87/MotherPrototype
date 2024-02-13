import {
  useCurrentRecording,
  useInput, useMessageBreakOption,
  useMessageIndex, useMessages,
  useMessagesLeft,
  useTyping
} from "../InputHooks";

export const useInputContextHooks = () => {
  const { messageIndex, setMessageIndex } = useMessageIndex();
  const { input, setInput } = useInput();
  const { messagesLeft, setMessagesLeft } = useMessagesLeft();
  const { messages, setMessages } = useMessages();
  const { messageBreakOption, setMessageBreakOption } = useMessageBreakOption();
  const { typing, setTyping } = useTyping();
  const { currentRecording, setCurrentRecording } = useCurrentRecording();

  return {
    input, setInput,
    messagesLeft, setMessagesLeft,
    messages, setMessages,
    messageIndex,
    setMessageIndex,
    messageBreakOption,
    setMessageBreakOption,
    typing, setTyping,
    currentRecording, setCurrentRecording
  }
}