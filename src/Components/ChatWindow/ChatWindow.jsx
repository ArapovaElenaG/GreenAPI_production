import React from 'react';
import './ChatWindow.scss';
import Header from '../Header/Header';
import MessageFeed from './MessageFeed/MessageFeed';
import MessageEnter from './MessageEnter/MessageEnter';
import {useSelector} from 'react-redux';


function ChatWindow({phoneNum}) {
    const chats = useSelector(state => state.chats);

    return (
        <div className='chatWindow'>
            {chats.map(item => {
                return (
                    <div className={`wrapperChat ${item.status}Chat`} key={item.phoneNum}>
                        <Header 
                            phoneNum={item.phoneNum}
                            avatar={item.avatar}
                        />
                        <MessageFeed phoneNum={item.phoneNum}/>
                        <MessageEnter phoneNum={item.phoneNum}/>
                    </div>
                )
            })}
        </div>
    )
}


export default ChatWindow;