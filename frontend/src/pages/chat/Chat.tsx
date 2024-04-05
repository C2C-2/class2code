import React, { useCallback, useEffect } from 'react'
import { FaPlus, FaArrowLeft, FaDotCircle, FaPaperPlane } from "react-icons/fa";
import { Button, Text, TextInput } from '@mantine/core';
import './Chat.css';
import { write, read } from '../../config/firebase.js';

const Chat = () => {

    const [oldChats, setOldChats] = React.useState([]);

    const [chat, setChat] = React.useState([]);

    const createChat = () => {

    }

    const search = (name) => {

    }

    const fetchData = useCallback(
        () => {
            const fetchOldChats = async () => {
                await read('users/' + user._id, (data: {
                    chats: [
                        {
                            lastMessage: {
                                content: string,
                                timestamp: string
                                senderId: number
                            }
                        }
                    ]
                }) => {
                    console.log(data);
                    setOldChats(data?.chats || []);
                });
            };

            fetchOldChats();


        },
        [],
    )

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    return (
        <div className='chat d-flex p-4 bg-light gap-4 justify-content-center'>
            <div className='chat_chats d-flex flex-column col-4 shadow bg-white'>
                <div className='chat_chats_head d-flex justify-content-between align-items-center'>
                    <Button leftSection={<FaArrowLeft size={16} />} variant="light" color="green" size="sm" radius="md">Back</Button>
                    <h4>Chats</h4>
                    <Button variant="filled" color="green" className='add_chat' radius="xl"><FaPlus /></Button>
                </div>
                <div className='chat_chats_body px-4 d-flex flex-column gap-3'>
                    <TextInput
                        withAsterisk
                        placeholder="search"
                        variant="filled"
                        radius="md"
                        size="md"
                    />
                    <div className='chat_chats_body_chats d-flex flex-column gap-1'>
                        {/* {oldChats.map((chat, index) => (
                            <ChatItem
                                key={index}
                                lastMessage={chat.lastMessage.content}
                                image="https://i.pravatar.cc/300"
                            />
                        ))} */}
                        <ChatItem userName="User 1" lastMessage="Last message" image="https://i.pravatar.cc/300" />
                        <ChatItem userName="User 2" lastMessage="Last message" image="https://i.pravatar.cc/300" />
                        <ChatItem userName="User 3" lastMessage="Last message" image="https://i.pravatar.cc/300" />
                        <ChatItem userName="User 4" lastMessage="Last message" image="https://i.pravatar.cc/300" />
                        <ChatItem userName="User 5" lastMessage="Last message" image="https://i.pravatar.cc/300" />
                        <ChatItem userName="User 6" lastMessage="Last message" image="https://i.pravatar.cc/300" />

                    </div>
                </div>
            </div>
            <div className='chat_messages col-7 shadow p-4 bg-white d-flex flex-column gap-4'>
                <div className='chat_messages_head d-flex'>
                    <div className='d-flex chat_messages_head_user gap-4 align-content-center'>
                        <img src={"https://i.pravatar.cc/300"} alt={"User 1"} />
                        <div className='d-flex flex-column'>
                            <Text fw={700} size="md">User 1</Text>
                            <Text size="xs" color="green"> <FaDotCircle size={7} /> online</Text>
                        </div >
                    </div>
                </div>
                <div className='chat_messages_body d-flex flex-column gap-4 px-3'>
                    <MessageItem userName="User 1" message="Last message Highlight This, definitely THIS and also this! Last message Highlight This, definitely THIS and also this!" image="https://i.pravatar.cc/300" dir="ltr" />
                    <MessageItem userName="User 1" message="Last message" image="https://i.pravatar.cc/300" dir="rtl" />
                    <MessageItem userName="User 1" message="Last message" image="https://i.pravatar.cc/300" dir="ltr" />
                    <MessageItem userName="User 1" message="Last message" image="https://i.pravatar.cc/300" dir="rtl" />
                    <MessageItem userName="User 1" message="Last message" image="https://i.pravatar.cc/300" dir="ltr" />
                    <MessageItem userName="User 1" message="Last message" image="https://i.pravatar.cc/300" dir="rtl" />
                    <MessageItem userName="User 1" message="Last message" image="https://i.pravatar.cc/300" dir="ltr" />
                    <MessageItem userName="User 1" message="Last message" image="https://i.pravatar.cc/300" dir="rtl" />
                    <MessageItem userName="User 1" message="Last message" image="https://i.pravatar.cc/300" dir="ltr" />
                    <MessageItem userName="User 1" message="Last message" image="https://i.pravatar.cc/300" dir="rtl" />
                    <MessageItem userName="User 1" message="Last message" image="https://i.pravatar.cc/300" dir="ltr" />
                    <MessageItem userName="User 1" message="Last message" image="https://i.pravatar.cc/300" dir="rtl" />
                </div>
                <div className='chat_messages_send d-flex gap-3 w-100'>
                    <TextInput
                        placeholder="Input placeholder"
                        className='w-100'
                    />
                    <Button variant="filled" color="#388E3C" className='send' rightSection={<FaPaperPlane />}>Send &nbsp;</Button>
                </div>
            </div>
        </div>
    )
}

const ChatItem = ({ userName = "User", lastMessage, image }: { userName: string, lastMessage: string, image: string }) => {
    return (
        <div className='d-flex chat_item gap-4 align-content-center'>
            <img src={image} alt={`${userName}`} />
            <div className='d-flex flex-column'>
                <Text fw={600} size="md">{userName}</Text>
                <Text size="sm" c="dimmed">{lastMessage}</Text>
            </div >
        </div>
    )
}

const MessageItem = ({ userName, message, image, dir }: { userName: string, message: string, image: string, dir?: 'ltr' }) => {
    return (
        <div className='d-flex message_item gap-3' dir={dir} >
            <img src={image} alt={`${userName}`} />
            <div className='w-75'>
                <div className='message' style={{ "backgroundColor": dir === 'ltr' ? "#388E3C" : "rgb(235, 235, 235)", "color": dir === 'ltr' ? "white" : "black" }}>
                    {message}
                </div>
            </div>
        </div >
    )
}

export default Chat
