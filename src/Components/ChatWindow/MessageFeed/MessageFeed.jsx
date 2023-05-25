import React from 'react';
import './MessageFeed.scss';
import {useSelector} from 'react-redux';


function MessageFeed({phoneNum}) {
    const chats = useSelector(state => state.chats);
    let messages = chats.filter(item => item.phoneNum === phoneNum)

    return (
        <div className='wrapper'>
            <div className='messageFeed'>
                {messages[0].messageFeed.map((item, index) => {
                    return (
                        <div className={item.type} key={item.id}>
                            <div className='bodyMessage'>
                                {item.body}
                            </div>
                            <div className='date'>
                                {new Date(item.date).getHours()}:{new Date(item.date).getMinutes()}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}





export default MessageFeed;