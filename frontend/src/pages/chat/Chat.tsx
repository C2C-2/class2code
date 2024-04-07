import React, { useCallback, useEffect, useRef } from 'react'
import { FaPlus, FaArrowLeft, FaDotCircle, FaPaperPlane } from "react-icons/fa";
import { Button, Text, TextInput } from '@mantine/core';
import './Chat.css';
import { write, read, updateData } from '../../config/firebase.js';

const Chat = () => {

    const [oldChats, setOldChats] = React.useState([]);
    const [messages, setMessages] = React.useState([]);
    const [chatId, setChatId] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [userId, setUserId] = React.useState(0);
    const [userId2, setUserId2] = React.useState(2);
    const listRef = useRef(null);

    const fetchOldChats = () => {
        read('users/' + userId, (data: {
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
            setOldChats(data?.chats || []);
        });
    };

    const fetchChat = (chatId: string) => {
        read('/chats/' + chatId, (data: {
            messages: [
                {
                    content: string,
                    timestamp: string
                    senderId: number
                }
            ]
        }) => {
            setMessages(data?.messages || []);
        });
    };


    const sendMessage = async (chatId: string, e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await updateData('/chats/' + chatId + '/messages', {
            content: message,
            timestamp: new Date().toISOString(),
            senderId: userId
        })

        await write('/users/' + userId + '/chats/' + chatId, {
            lastMessage: message,
            timestamp: new Date().toISOString(),
            senderId: userId
        })

        await write('/users/' + userId2 + '/chats/' + chatId, {
            lastMessage: message,
            timestamp: new Date().toISOString(),
            senderId: userId
        })

    }

    const fetchData = useCallback(
        () => {
            fetchOldChats();
        },
        [userId],
    )

    useEffect(() => {
        const newUserId = window.prompt("Enter Your Id");

        if (newUserId) {
            console.log(newUserId);
            setUserId(parseInt(newUserId));
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        listRef.current?.scrollIntoView();
    }, [messages]);

    const createChat = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const key = await updateData(`/chats`, { name: "" });
        await updateData(`/users/${userId}/chats/${key}`, { name: "" });
        await updateData(`/users/${userId2}/chats/${key}`, { name: "" });
    }

    const search = (name: any) => {

    }


    return (
        <div className='messages d-flex p-4 bg-light gap-4 justify-content-center'>
            <div className='chat_chats d-flex flex-column col-4 shadow bg-white'>
                <div className='chat_chats_head d-flex justify-content-between align-items-center'>
                    <Button leftSection={<FaArrowLeft size={16} />} variant="light" color="green" size="sm" radius="md">Back</Button>
                    <h4>Chats</h4>
                    <Button variant="filled" color="green" className='add_chat' radius="xl" onClick={createChat}><FaPlus /></Button>
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
                        {Object.values(oldChats)?.map((messages, index) => (
                            <ChatItem
                                onClike={() => {
                                    const chatId = Object.keys(oldChats)[index];
                                    setChatId(chatId);
                                    fetchChat(chatId)
                                }}
                                key={index}
                                lastMessage={messages.lastMessage}
                                image="https://i.pravatar.cc/300"
                            />
                        ))}
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
                    {
                        Object.values(messages)?.map((message, index) => (
                            <MessageItem
                                key={index}
                                userName="User 1"
                                message={message.content}
                                image="https://i.pravatar.cc/300"
                                dir={message.senderId === userId ? 'ltr' : 'rtl'}
                            />
                        ))
                    }
                    <div ref={listRef} />
                </div>
                <form className='chat_messages_send d-flex gap-3 w-100' onSubmit={(e) => sendMessage(chatId, e)}>
                    <TextInput
                        placeholder="Input placeholder"
                        className='w-100'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button type='submit' variant="filled" color="#388E3C" className='send' rightSection={<FaPaperPlane />}>Send &nbsp;</Button>
                </form>
            </div>
        </div>
    )
}

const ChatItem = ({ userName = "User", lastMessage, image, onClike }: { userName: string, lastMessage: string, image: string }) => {
    return (
        <div className='d-flex chat_item gap-4 align-content-center' onClick={onClike}>
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
