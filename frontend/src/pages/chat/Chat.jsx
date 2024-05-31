import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaPlus, FaArrowLeft, FaDotCircle, FaPaperPlane } from "react-icons/fa";
import { Button, Modal, Select, Text, TextInput } from "@mantine/core";
import "./Chat.css";
import {
  write,
  read,
  updateData,
  updateField,
  updateFieldWithKey,
} from "../../config/firebase.js";
import { Link } from "react-router-dom";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useDisclosure } from "@mantine/hooks";

const Chat = () => {
  const [oldChats, setOldChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const listRef = useRef(null);
  const [friendImg, setFriendImg] = useState(null);
  const [myImg, setMyImg] = useState(null);
  const [hasNotified, setHasNotified] = useState({});

  const userId = localStorage.getItem("id");

  const GET_USER = gql`
    query Query($userId: String!) {
      getUser(userId: $userId) {
        id
        FirstName
        LastName
        ImageUrl
      }
    }
  `;

  const [getUser, { data: UserData }] = useLazyQuery(GET_USER);

  useEffect(() => {
    getUser({ variables: { userId } }).then((e) => {
      setMyImg(e.data.getUser.ImageUrl);
    });
  }, []);

  const GET_Friends = gql`
    query Query {
      getAllUsers {
        LastName
        ImageUrl
        FirstName
        id
      }
    }
  `;

  const { data: Friends } = useQuery(GET_Friends);

  useEffect(() => {
    if (Friends) {
      setFriends(Friends.getAllUsers.filter((e) => e.id !== userId));
    }
  }, [Friends, userId]);

  const loadOldChats = useCallback(async () => {
    read(`chats/${userId}`, async (data) => {
      if (data) {
        const chats = await Promise.all(
          Object.values(data).map(async (chat) => {
            const friendId = chat.friendId; // Assuming chat object contains friendId
            const { data: friendData } = await getUser({
              variables: { userId: friendId },
            });
            const friendDetails = friendData?.getUser || {};

            return {
              ...chat,
              friendName: `${friendDetails.FirstName} ${friendDetails.LastName}`,
              friendPicture: friendDetails.ImageUrl,
            };
          })
        );
        setOldChats(chats);
      }
    });
  }, [getUser, userId]);

  useEffect(() => {
    loadOldChats();
  }, [loadOldChats]);

  const loadMessages = useCallback(async (chatId) => {
    await read(`messages/${chatId}`, (data) => {
      if (data) {
        setMessages(Object.values(data));
      } else {
        setMessages([]);
      }
    });
    scrollToBottom();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "" || !selectedChat) return;

    const newMessage = {
      senderId: userId,
      content: message,
      timestamp: Date.now(),
    };

    await updateData(`messages/${selectedChat.chatId}`, newMessage);
    setMessage("");
    loadMessages(selectedChat.chatId);

    const chatId = selectedChat.chatId;
    const friendId = selectedChat.friendId;

    await updateLastMessage(chatId, userId, message);
    await updateLastMessage(chatId, friendId, message);

    // Check if a notification has been sent for this chat
    if (!hasNotified[chatId]) {
      await updateFieldWithKey(`notifications/${friendId}`, {
        notification: `You have a new message from ${selectedChat.friendName}`,
      });

      // Mark the chat as notified
      setHasNotified((prev) => ({ ...prev, [chatId]: true }));
    }

    scrollToBottom();
  };

  const scrollToBottom = () => {
    listRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const updateLastMessage = (chatId, userId, lastMessage) => {
    const path = `chats/${userId}/${chatId}/lastMessage`;
    updateField(path, lastMessage)
      .then(() => {
        console.log("Last message updated successfully");
      })
      .catch((error) => {
        console.error("Error updating last message:", error);
      });
  };

  const startChat = (friendId) => {
    const chatId = `${userId}_${friendId}`;
    const chatData = {
      chatId,
      userId,
      friendId,
      lastMessage: "",
      timestamp: Date.now(),
    };

    const friendChat = {
      chatId,
      userId: friendId,
      friendId: userId,
      lastMessage: "",
      timestamp: Date.now(),
    };

    write(`chats/${userId}/${chatId}`, chatData);
    write(`chats/${friendId}/${chatId}`, friendChat);
    setSelectedChat(chatData);
    loadMessages(chatId);
    close();
  };

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="ShowAllPostsAll" id="man">
      <div className="ShowAllPostsMain">
        <div className="ShowAllPostsContent">
          <div className="sideBareFake"></div>
          <div className="messages d-flex p-4 gap-4 justify-content-center">
            <div className="chat_chats d-flex flex-column col-4 shadow bg-white">
              <div className="chat_chats_head d-flex justify-content-between align-items-center">
                <Link to="/Dashboard">
                  <Button
                    leftSection={<FaArrowLeft size={16} />}
                    variant="light"
                    color="green"
                    size="sm"
                    radius="md"
                  >
                    Back
                  </Button>
                </Link>
                <h4>Chats</h4>
                <Modal
                  opened={opened}
                  onClose={close}
                  title="Chat With Your Friend"
                  zIndex={9}
                  xOffset={"30%"}
                  yOffset={"10%"}
                >
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const friendId = e.target.elements.friendId.value;
                      startChat(friendId);
                    }}
                  >
                    <div id="friends_search">
                      <Select
                        name="friendId"
                        label="User Name"
                        placeholder="Pick value"
                        data={friends.map((e) => ({
                          value: e.id,
                          label: `${e.FirstName} ${e.LastName}`,
                        }))}
                        searchable
                        zIndex={10}
                      />
                    </div>
                    <br />
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="filled"
                        color="green"
                        className="add_chat"
                        radius="xl"
                        type="submit"
                        w={"20%"}
                        style={{ position: "absolute", bottom: "4%" }}
                      >
                        Start Chat
                      </Button>
                    </div>
                  </form>
                </Modal>
                <Button
                  variant="filled"
                  color="green"
                  className="add_chat"
                  radius="xl"
                  onClick={open}
                >
                  <FaPlus />
                </Button>
              </div>
              <div className="chat_chats_body px-4 d-flex flex-column gap-3">
                <TextInput
                  withAsterisk
                  placeholder="search"
                  variant="filled"
                  radius="md"
                  size="md"
                />
                <div className="chat_chats_body_chats d-flex flex-column gap-1">
                  {oldChats.map((chat, index) => {
                    return (
                      <ChatItem
                        key={index}
                        onClick={() => {
                          setSelectedChat(chat);
                          loadMessages(chat?.chatId);
                          setFriendImg(chat?.friendPicture);
                        }}
                        lastMessage={chat?.lastMessage}
                        image={chat?.friendPicture}
                        userName={chat?.friendName}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="chat_messages col-7 shadow p-4 bg-white d-flex flex-column gap-4">
              <div className="chat_messages_head d-flex">
                {UserData?.getUser && selectedChat && (
                  <div className="d-flex chat_messages_head_user gap-4 align-content-center">
                    <img
                      src={selectedChat.friendPicture}
                      alt={selectedChat.friendName}
                    />
                    <div className="d-flex flex-column justify-content-center">
                      <Text size="xs" color="green">
                        <FaDotCircle size={7} /> online
                      </Text>
                    </div>
                  </div>
                )}
              </div>
              <div className="chat_messages_body d-flex flex-column gap-4 px-3">
                {messages.map((message, index) => {
                  return message.senderId == userId ? (
                    <MessageItem
                      key={index}
                      userName={message.senderId}
                      message={message.content}
                      image={myImg}
                      dir="ltr"
                    />
                  ) : (
                    <MessageItem
                      key={index}
                      userName={message.senderId}
                      message={message.content}
                      image={friendImg}
                      dir="rtl"
                    />
                  );
                })}
                <div ref={listRef} />
              </div>
              <form
                className="chat_messages_send d-flex gap-3 w-100"
                onSubmit={handleSendMessage}
              >
                <TextInput
                  placeholder="Type your message"
                  className="w-100"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="filled"
                  color="green"
                  className="send"
                  rightSection={<FaPaperPlane />}
                >
                  Send &nbsp;
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatItem = ({ userName, lastMessage, image, onClick }) => {
  return (
    <div
      className="d-flex chat_item gap-4 align-content-center"
      onClick={onClick}
    >
      <img
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        src={image}
        alt={userName}
      />
      <div className="d-flex flex-column">
        <Text fw={600} size="md">
          {userName}
        </Text>
        <Text size="sm" c="dimmed">
          {lastMessage}
        </Text>
      </div>
    </div>
  );
};

const MessageItem = ({ userName, message, image, dir }) => {
  return (
    <div className="d-flex message_item gap-3" dir={dir}>
      <img src={image} alt={userName} />
      <div className="w-75">
        <div
          className="message"
          style={{
            backgroundColor: dir === "ltr" ? "#388E3C" : "rgb(235, 235, 235)",
            color: dir === "ltr" ? "white" : "black",
          }}
        >
          {message}
        </div>
      </div>
    </div>
  );
};

export default Chat;
