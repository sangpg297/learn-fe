import { TYPE_CHAT } from "@/constants/chat";
import { IMessage } from "@/declares/models";
import chatApi from "@/services/api/chat";
import { useState, useEffect, useRef } from "react";
const usePageDetail = (props: any) => {
  const chatId = props?.params?.id;
  const [message, setMessage] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listMessage, setListMessage] = useState<[IMessage]>([{} as IMessage]);

  useEffect(() => {
    setListMessage(JSON.parse(localStorage.getItem(chatId) as string));
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (listMessage?.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [listMessage?.length]);

  const handleTyping = (value: string) => {
    setMessage(value);
  };
  const handleSubmit = async () => {
    const question = message;
    if (question.trim() === "") return;
    setIsDisable(true);
    setIsLoading(true);
    setMessage("");

    listMessage.push({
      id: Date.now(),
      name: "Me",
      message: question,
      created_at: new Date().toJSON(),
      type: TYPE_CHAT.TO,
    });

    let data: string;
    try {
      const response = await chatApi.sendMessage({ message: question });
      data = response.data;
    } catch (error: any) {
      data = error?.message;
    }

    listMessage.push({
      id: Date.now(),
      name: "GPT",
      message: data,
      created_at: new Date().toJSON(),
      type: TYPE_CHAT.FROM,
    });
    setListMessage(listMessage);
    setIsDisable(false);
    setIsLoading(false);
    localStorage.setItem(chatId, JSON.stringify(listMessage));
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return {
    handleKeyDown,
    handleTyping,
    handleSubmit,
    ref,
    message,
    isDisable,
    isLoading,
    listMessage,
  };
};

export default usePageDetail;
