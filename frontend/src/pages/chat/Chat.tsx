import React, { useCallback, useEffect, useRef } from 'react'
import { FaPlus, FaArrowLeft, FaDotCircle, FaPaperPlane } from "react-icons/fa";
import { Button, Card, NativeSelect, Text, TextInput } from '@mantine/core';
import './Chat.css';
import { write, read, updateData } from '../../config/firebase.js';

const Chat = () => {

    const [oldChats, setOldChats] = React.useState([]);
    const [messages, setMessages] = React.useState([]);
    const [chatId, setChatId] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [userId, setUserId] = React.useState(0);
    const [userId2, setUserId2] = React.useState(0);
    const [isSearch, setIsSearch] = React.useState(false);
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

        const newUserId2 = window.prompt("Enter friend Id");
        if (newUserId) {
            console.log(newUserId);
            setUserId2(parseInt(newUserId2));
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        listRef.current?.scrollIntoView();
    }, [messages]);

    const createChat = async (e: { preventDefault: () => void; }, friendId: number) => {
        e.preventDefault();
        setIsSearch((e) => true);
        console.log(isSearch);

        // const key = await updateData(`/chats`, { name: "" });
        // await updateData(`/users/${userId}/chats/${key}`, { name: "" });
        // await updateData(`/users/${friendId}/chats/${key}`, { name: "" });
    }

    const createChatBtnOnClick = () => {

    }


    return (
        <div className='messages d-flex p-4 bg-light gap-4 justify-content-center'>
            <div className='chat_chats d-flex flex-column col-4 shadow bg-white'>
                <div className='chat_chats_head d-flex justify-content-between align-items-center'>
                    <Link to="/Dashboard"><Button leftSection={<FaArrowLeft size={16} />} variant="light" color="green" size="sm" radius="md">Back</Button></Link>
                    <h4>Chats</h4>
                    <Button variant="filled" color="green" className='add_chat' radius="xl" onClick={(e) => createChat(e, userId2)}><FaPlus /></Button>
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
                                lastMessage={messages?.lastMessage}
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
            {/* <div id='chat_search'>
                <SearchFriends isSearching={isSearch} createChatBtnOnClick={createChatBtnOnClick} />
            </div> */}
        </div>
    )
}

const ChatItem = ({ userName = "User", lastMessage, image, onClike }: { userName: string, lastMessage: string, image: string, onClike: () => void }) => {
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

const SearchFriends = ({ isSearching, createChatBtnOnClick }: { isSearching?: boolean, createChatBtnOnClick?: () => void }) => {
    return (
        <Card style={{ display: isSearching ? 'block' : 'none' }} id='chat_search_card' shadow="sm" padding="lg" radius="md" withBorder>
            <TextInput
                label="User Name"
                placeholder="Mohammad Abu Salh"
                description="Enter Name to Search"
            />

            <NativeSelect
                mt="md"
                label="Users"
                data={['React', 'Angular', 'Vue', 'Svelte']}
                description="This All Users With Entered Name"
            />
            <br />
            <div id='chat_search_card_btn_div' dir='rtl'>
                <Button onClick={createChatBtnOnClick} id='chat_search_card_btn' variant="filled" color="green">Start Chat</Button>
            </div>
        </Card>
    )
}

export default Chat
