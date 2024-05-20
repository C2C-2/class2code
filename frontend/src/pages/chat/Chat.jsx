import React, { useCallback, useEffect, useRef } from "react";
import { FaPlus, FaArrowLeft, FaDotCircle, FaPaperPlane } from "react-icons/fa";
import {
  Button,
  Card,
  Modal,
  NativeSelect,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import "./Chat.css";
import { write, read, updateData } from "../../config/firebase.js";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useDisclosure } from "@mantine/hooks";

const Chat = () => {
  const [oldChats, setOldChats] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [chatId, setChatId] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [userId, setUserId] = React.useState(localStorage.getItem("id"));
  const [userId2, setUserId2] = React.useState(0);
  const listRef = useRef(null);

  const [friends, setFriends] = React.useState([]);
  const [friendID, setFriendID] = React.useState(0);

  const fetchOldChats = () => {
    read("users/" + userId, (data) => {
      setOldChats(data?.chats || []);
    });
  };

  const fetchChat = (chatId) => {
    read("/chats/" + chatId, (data) => {
      setMessages(data?.messages || []);
    });
  };

  const sendMessage = async (chatId, e) => {
    e.preventDefault();
    await updateData("/chats/" + chatId + "/messages", {
      content: message,
      timestamp: new Date().toISOString(),
      senderId: userId,
    });

    await write("/users/" + userId + "/chats/" + chatId, {
      lastMessage: message,
      timestamp: new Date().toISOString(),
      senderId: userId,
    });

    await write("/users/" + userId2 + "/chats/" + chatId, {
      lastMessage: message,
      timestamp: new Date().toISOString(),
      senderId: userId,
    });
  };

  const fetchData = useCallback(() => {
    fetchOldChats();
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    listRef.current?.scrollIntoView();
  }, [messages]);

  const createChat = async (e, friendId) => {
    e.preventDefault();

    const key = await updateData(`/chats`, { name: "" });
    await updateData(`/users/${userId}/chats/${key}`, { name: "" });
    await updateData(`/users/${friendId}/chats/${key}`, { name: "" });
  };

  const GET_USER = gql`
    query Query($userId: String!) {
      getUser(userId: $userId) {
        FirstName
        LastName
        ImageUrl
      }
    }
  `;

  // useLazyQuery

  const [getPosts, { data: UserData }] = useLazyQuery(GET_USER);

  const GET_Friends = gql`
    query Query($userId: String!) {
      getUser(userId: $userId) {
        MyCompanies {
          Teams {
            Members {
              FirstName
              LastName
              id
            }
          }
        }
        WorkCompanies {
          Teams {
            Members {
              LastName
              FirstName
              id
            }
          }
        }
      }
    }
  `;

  const { data: Friends } = useQuery(GET_Friends, {
    variables: { userId: localStorage.getItem("id") },
  });

  useEffect(() => {
    if (Friends) {
      console.log(Friends);
      setFriends(() => Friends.getUser?.MyCompanies?.Teams?.Members);
      setFriends((e) =>
        e?.concat(Friends.getUser?.WorkCompanies?.Teams?.Members)
      );
    }
  }, [Friends]);

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
                      createChat(e, friendID);
                      e.preventDefault();
                      close();
                    }}
                  >
                    <div id="friends_search">
                      <Select
                        label="User Name"
                        placeholder="Pick value"
                        data={friends?.map((e) => {
                          return {
                            value: e.id,
                            label: e.FirstName + " " + e.LastName,
                          };
                        })}
                        searchable
                        zIndex={10}
                        onChange={(e) => {
                          setFriendID(e);
                        }}
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
                  {Object.values(oldChats)?.map((messages, index) => (
                    <ChatItem
                      onClike={() => {
                        const chatId = Object.keys(oldChats)[index];
                        setChatId(chatId);
                        fetchChat(chatId);
                      }}
                      key={index}
                      lastMessage={messages?.lastMessage}
                      image="https://i.pravatar.cc/300"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="chat_messages col-7 shadow p-4 bg-white d-flex flex-column gap-4">
              <div className="chat_messages_head d-flex">
                {UserData?.getUser && (
                  <div className="d-flex chat_messages_head_user gap-4 align-content-center">
                    <img src={UserData?.getUser?.ImageUrl} alt={"User 1"} />
                    <div className="d-flex flex-column">
                      <Text fw={700} size="md">
                        {UserData?.getUser?.FirstName +
                          " " +
                          UserData?.getUser?.LastName}
                      </Text>
                      <Text size="xs" color="green">
                        {" "}
                        <FaDotCircle size={7} /> online
                      </Text>
                    </div>
                  </div>
                )}
              </div>
              <div className="chat_messages_body d-flex flex-column gap-4 px-3">
                {Object.values(messages)?.map((message, index) => (
                  <MessageItem
                    key={index}
                    userName="User 1"
                    message={message.content}
                    image="https://i.pravatar.cc/300"
                    dir={message.senderId === userId ? "ltr" : "rtl"}
                  />
                ))}
                <div ref={listRef} />
              </div>
              <form
                className="chat_messages_send d-flex gap-3 w-100"
                onSubmit={(e) => sendMessage(chatId, e)}
              >
                <TextInput
                  placeholder="Input placeholder"
                  className="w-100"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="filled"
                  color="#388E3C"
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

const ChatItem = ({ userName = "User", lastMessage, image, onClike }) => {
  return (
    <div
      className="d-flex chat_item gap-4 align-content-center"
      onClick={onClike}
    >
      <img src={image} alt={`${userName}`} />
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
      <img src={image} alt={`${userName}`} />
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

const SearchFriends = ({ isSearching, createChatBtnOnClick }) => {
  return (
    <Card
      style={{ display: isSearching ? "block" : "none" }}
      id="chat_search_card"
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <TextInput
        label="User Name"
        placeholder="Mohammad Abu Salh"
        description="Enter Name to Search"
      />

      <NativeSelect
        mt="md"
        label="Users"
        data={["React", "Angular", "Vue", "Svelte"]}
        description="This All Users With Entered Name"
      />
      <br />
      <div id="chat_search_card_btn_div" dir="rtl">
        <Button
          onClick={createChatBtnOnClick}
          id="chat_search_card_btn"
          variant="filled"
          color="green"
        >
          Start Chat
        </Button>
      </div>
    </Card>
  );
};

export default Chat;
