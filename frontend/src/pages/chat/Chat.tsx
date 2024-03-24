import React from 'react'
import { FaPlus, FaArrowLeft } from "react-icons/fa";
import { TextInput } from '@mantine/core';
import './Chat.css';

const Chat = () => {
    return (
        <div className='chat d-flex p-4 bg-light gap-4 justify-content-center'>
            <div className='chat_chats d-flex flex-column col-4 shadow bg-white'>
                <div className='chat_chats_head d-flex justify-content-around align-items-center'>
                    <button type="button" className="return-back-btn btn btn-dark">
                        <FaArrowLeft size={16}/>
                    </button>
                    <h4>Chats</h4>
                    <FaPlus color='white' className='plus' />
                </div>
                <div className='chat_chats_body px-4'>
                    <TextInput
                        withAsterisk
                        placeholder="search"
                    />
                    <div className='chat_chats_body_chats'>
                        <ChatItem userName="User 1" lastMessage="Last message" />
                        <ChatItem userName="User 2" lastMessage="Last message" />
                    </div>
                </div>
            </div>
            <div className='chat_messages col-7 shadow p-4 bg-white'>
                <div className='chat_messages_head d-flex'>
                    <h4>User 1</h4>
                    <p> . online</p>
                </div>
                <div className='chat_messages_body'>
                    <MessageItem userName="User 1" message="Last message" />
                    <MessageItem userName="User 1" message="Last message" />
                </div>
            </div>
        </div>
    )
}

const ChatItem = ({ userName, lastMessage }: { userName: string, lastMessage: string }) => {
    return (
        <div className='d-flex flex-column'>
            <h6 style={{ fontWeight: 'bold' }}>{userName}</h6>
            <p>{lastMessage}</p>
        </div >
    )
}

const MessageItem = ({ userName, message }: { userName: string, message: string }) => {
    return (
        <div className='d-flex'>
            <h6 style={{ fontWeight: 'bold' }}>{userName}</h6>
            <p>{message}</p>
        </div >
    )
}

export default Chat
