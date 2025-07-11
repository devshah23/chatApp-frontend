import { Stack } from "@mui/material";
import ChatItem from "../shared/ChatItem";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import {
  setIsDeleteMenu,
  setSelectedDeleteChat,
} from "../../redux/reducers/misc";
import DeleteChatMenu from "../dialogs/DeleteChatMenu";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
}) => {
  const dispatch = useDispatch();
  const deleteMenuAnchor = useRef(null);
  const handleDeleteChat = (e, chatId, groupChat) => {
    dispatch(setIsDeleteMenu(true));
    dispatch(setSelectedDeleteChat({ chatId, groupChat }));
    deleteMenuAnchor.current = e.currentTarget;
  };
  return (
    <>
      <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor} />
      <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"}>
        {chats?.map((data, index) => {
          const { avatar, _id, name, groupChat, members } = data;

          const newMessageAlert = newMessagesAlert.find(
            ({ chatId }) => chatId === _id
          );

          const isOnline = members?.some((member) =>
            onlineUsers.includes(member)
          );

          return (
            <ChatItem
              index={index}
              newMessageAlert={newMessageAlert}
              isOnline={isOnline}
              avatar={avatar}
              name={name}
              _id={_id}
              key={_id}
              groupChat={groupChat}
              sameSender={chatId === _id}
              handleDeleteChat={handleDeleteChat}
            />
          );
        })}
      </Stack>
    </>
  );
};

export default ChatList;
