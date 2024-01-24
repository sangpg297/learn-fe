import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const usePage = () => {
  const router = useRouter();
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  useEffect(() => {
    setChatHistory(localStorage.getItem("chatHistory")?.split(",") as []);
  }, []);

  const CreatNewChat = async () => {
    const chatId = Date.now().toString();
    localStorage.setItem(chatId, JSON.stringify([]));
    if (localStorage.getItem("chatHistory")) {
      localStorage.setItem(
        "chatHistory",
        localStorage.getItem("chatHistory") + "," + chatId
      );
    } else {
      localStorage.setItem("chatHistory", chatId);
    }

    let listChat = localStorage.getItem("chatHistory")?.split(",");
    setChatHistory(listChat?.sort((a, b) => Number(b) - Number(a)) as []);
    router.push("/chat/" + chatId);
  };

  return {
    isDisable,
    isLoading,
    chatHistory,
    CreatNewChat,
  };
};

export default usePage;
