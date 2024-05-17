import "./AIChat.css";
import {
  ActionIcon,
  Button,
  Dialog,
  Divider,
  Group,
  Input,
  Select,
  Text,
} from "@mantine/core";

import { Link } from "react-router-dom";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import MainLogo from "../../../assets/Images/logo2 21.png";
import { IconArrowLeft, IconPlus, IconTrash } from "@tabler/icons-react";
import { AiFillWechat } from "react-icons/ai";
import { Paths } from "../../../assets/Paths";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

function AIChat() {
  const [opened, { toggle }] = useDisclosure();
  const [message, setMessage] = useState("");
  const [projectName, setProjectName] = useState("aaa");
  const [projectId, setProjectId] = useState(0);

  const [openedNewChat, { toggle: toggleNewChat, close: closeNewChat }] =
    useDisclosure(false);

  const GET_OLD_CHATS = gql`
    query GetUser($userId: String!) {
      getUser(userId: $userId) {
        AIChats {
          _id
          Name
        }
      }
    }
  `;

  const {
    loading: oldChatsLoading,
    error: oldChatsError,
    data: oldChatsData,
    refetch: refetchOldChats,
  } = useQuery(GET_OLD_CHATS, {
    variables: { userId: localStorage.getItem("id") },
  });

  const GET_WORKS_COMPANIES = gql`
    query Query($userId: String!) {
      getUser(userId: $userId) {
        WorkCompanies {
          Project {
            _id
            ProjectName
          }
        }
      }
    }
  `;

  const {
    loading: workCompaniesLoading,
    error: workCompaniesError,
    data: workCompanies,
  } = useQuery(GET_WORKS_COMPANIES, {
    variables: { userId: localStorage.getItem("id") },
  });

  const GET_CHAT = gql`
    query GetUser($chatId: Int!) {
      getAIChat(chatId: $chatId) {
        _id
        CreatedDate
        Messages {
          _id
          Question
          Answer
          CreatedDate
        }
        Name
        FileName
      }
    }
  `;
  const [
    getChat,
    {
      loading: getChatLoading,
      error: getChatError,
      data: getChatData,
      refetch: refetchChat,
    },
  ] = useLazyQuery(GET_CHAT);

  const SEND_MESSAGE = gql`
    mutation Mutation($message: String!, $fileName: String!, $aIchatId: Int!) {
      sendAIMessage(
        message: $message
        fileName: $fileName
        AIchatId: $aIchatId
      ) {
        _id
        Question
        Answer
        CreatedDate
      }
    }
  `;

  const [
    sendMessageQuery,
    {
      loading: sendMessageLoading,
      error: sendMessageError,
      data: sendMessageData,
    },
  ] = useMutation(SEND_MESSAGE);

  const sendMessage = async (e, chatId) => {
    e.preventDefault();

    await sendMessageQuery({
      variables: {
        message,
        fileName: getChatData?.getAIChat?.FileName,
        aIchatId: parseInt(chatId),
      },
    }).catch((error) => console.log(error));

    setMessage(() => "");
    refetchChat();
  };

  const CREATE_CHAT = gql`
    mutation Mutation($userId: String!, $name: String!, $projectId: Int!) {
      createNewAIChat(userId: $userId, Name: $name, projectId: $projectId) {
        _id
      }
    }
  `;

  const [createChatQuery] = useMutation(CREATE_CHAT);

  const DELETE_CHAT = gql`
    query Query($aIchatId: Int!) {
      deleteAIChat(AIchatId: $aIchatId)
    }
  `;

  const [deleteChatQuery] = useLazyQuery(DELETE_CHAT);

  return (
    <div className="MainAiDef">
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div className="Header">
            <h4>
              <img src={MainLogo} /> Class<span>2</span>Code
            </h4>
            <div className="HeaderLinks">
              <Link to={Paths.Home}>
                <Button color="#283739">Home</Button>
              </Link>
              <Button
                variant="outline"
                color="red"
                onClick={() => {
                  localStorage.clear();
                }}
              >
                LogOut
              </Button>
            </div>
          </div>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <div className="NavLogo">
            <h4>
              AI <span>Chats</span>
            </h4>
          </div>
          <Divider my="md" />

          <div className="chats">
            {oldChatsData?.getUser.AIChats.map((oldChat, index) => (
              <Button
                key={index}
                variant="light"
                color="green"
                rightSection={
                  <IconTrash
                    color="red"
                    size={24}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChatQuery({
                        variables: { aIchatId: parseInt(oldChat._id) },
                      });
                      refetchOldChats();
                    }}
                  />
                }
                leftSection={<AiFillWechat size={24} />}
                justify="space-between"
                w={"100%"}
                size="lg"
                onClick={() => {
                  getChat({ variables: { chatId: parseInt(oldChat._id) } });
                }}
              >
                <h5>{oldChat?.Name}</h5>
              </Button>
            ))}
          </div>

          <>
            <Group justify="center">
              <Button
                color="#283739"
                rightSection={<IconPlus size={24} />}
                leftSection={<AiFillWechat size={24} />}
                justify="space-between"
                size="md"
                className="CreateNewChat"
                onClick={toggleNewChat}
              >
                New Chat
              </Button>
            </Group>

            <Dialog
              opened={openedNewChat}
              withCloseButton
              onClose={closeNewChat}
              size="lg"
              radius="md"
              position={{ bottom: "5rem", left: "1rem" }}
            >
              <Text size="sm" mb="xs" fw={500}>
                Select Company
              </Text>

              <Group align="flex-end">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await createChatQuery({
                      variables: {
                        userId: localStorage.getItem("id"),
                        name: projectName,
                        projectId: parseInt(projectId),
                      },
                    });

                    refetchOldChats();
                    closeNewChat();
                  }}
                >
                  <Select
                    label="Your Company"
                    placeholder="Pick value"
                    data={workCompanies?.getUser?.WorkCompanies?.map((e) => {
                      return {
                        value: e?.Project?._id,
                        label: e?.Project?.ProjectName,
                      };
                    })}
                    searchable
                    onChange={(value, { label }) => {
                      setProjectName(label);
                      setProjectId(value);
                    }}
                  />
                  <Button type="submit">Select</Button>
                </form>
              </Group>
            </Dialog>
          </>
        </AppShell.Navbar>

        <AppShell.Main>
          <Link to={Paths.Dashboard}>
            <ActionIcon
              variant="filled"
              color="#283739"
              size="lg"
              aria-label="Settings"
              w={"4rem"}
            >
              <IconArrowLeft
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
          </Link>

          <div className="Title">
            <h2>{getChatData?.getAIChat?.Name}</h2>
          </div>

          <div className="ChatBox">
            {getChatData?.getAIChat?.Messages?.map((message, index) => (
              <div key={index}>
                <div className="question">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-message-question"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 9h8" />
                    <path d="M8 13h6" />
                    <path d="M14 18h-1l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5" />
                    <path d="M19 22v.01" />
                    <path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
                  </svg>
                  <div className="Massage">{message.Question}</div>
                </div>
                <div className="answer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-brackets-contain"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 4h-4v16h4" />
                    <path d="M17 4h4v16h-4" />
                    <path d="M8 16h.01" />
                    <path d="M12 16h.01" />
                    <path d="M16 16h.01" />
                  </svg>
                  <div className="Massage">{message.Answer}</div>
                </div>
              </div>
            ))}
          </div>

          {getChatData?.getAIChat?._id && (
            <form
              onSubmit={(e) => sendMessage(e, getChatData?.getAIChat?._id)}
              className="sendMessage"
            >
              <Input
                variant="filled"
                radius="md"
                size="md"
                placeholder="Input component"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              <Button
                type="submit"
                variant="filled"
                color="green"
                size="md"
                radius="md"
              >
                Send &nbsp;
              </Button>
            </form>
          )}

          <div className="Footer">
            <p>© {new Date().getFullYear()} Class2Code.</p>
          </div>
        </AppShell.Main>
      </AppShell>
    </div>
  );
}

export default AIChat;
