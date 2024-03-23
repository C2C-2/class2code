import React from 'react'
import { Icon } from '@iconify/react'
import { FaPlus } from "react-icons/fa";
import { TextInput } from '@mantine/core';

const Chat = () => {
    return (
        <div className='chat d-flex'>
            <div className='chat_chats d-flex flex-column'>
                <div className='chat_chats_head d-flex'>
                    <button type="button" className="btn btn-dark">Dark</button>
                    <h4>Chats</h4>
                    <FaPlus />
                </div>
                <div className='chat_chats_body'>
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
            <div className='chat_messages'></div>
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

export default Chat
