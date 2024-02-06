"use client";
import Image from "next/image";
import Link from "next/link";
import usePage from "./usePage";
import deleteIcon from "@/public/icons/delete-button.svg";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { chatHistory, CreatNewChat, DeleteChat } = usePage();

  return (
    <section>
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-indigo-400 flex-shrink-0">
            <div className="flex flex-row items-center justify-center h-12 w-full">
              <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              </div>
              <div className="ml-2 font-bold text-2xl">Chat AI</div>
            </div>
            <div className="flex flex-row items-center justify-center h-12 w-full mt-3 mb-2">
              <button
                className="bg-stone-500 hover:bg-stone-600 rounded-xl text-white px-4 py-1 flex-shrink-0 font-bold"
                onClick={CreatNewChat}
              >
                New Chat
              </button>
            </div>
            <div className="flex flex-row items-start justify-center h-full w-full overflow-y-auto">
              <ul>
                {chatHistory &&
                  chatHistory.map((history: string) => {
                    return (
                      <li
                        key={history}
                        className="font-bold flex-shrink-0 h-8 w-80 flex flex-row justify-center items-center"
                      >
                        <div className="hover:bg-stone-500 rounded-xl px-2 py-1">
                          <Link href={"/chat/" + history}>
                            ChatId: {history}
                          </Link>
                        </div>
                        <div>
                          <button className="flex items-center justify-center text-black-700 hover:opacity-20" onClick={() => DeleteChat(history)}>
                            <Image width={20} src={deleteIcon} alt="SVG" />
                          </button>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
