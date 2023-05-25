import React from 'react';
import './ChatList.scss';
import Header from '../Header/Header';
import SearchChat from './SearchChat/SearchChat';
import {useDispatch, useSelector} from 'react-redux';
import {makeActiveChat, addMessageToFeed} from '../../Store/actions';
import axios from 'axios';


function ChatList() {
    const [beginedTrackingIncoming, setBeginedTrackingIncoming] = React.useState(false);
    const [idIncoming, setIdIncoming] = React.useState('');

    const chats = useSelector(state => state.chats);

    const dispatch = useDispatch();

    const makeActive = (num) => {
        dispatch(makeActiveChat(num))
    }


    const getNotification = () => {
        axios
            // .get('https://api.green-api.com/waInstance1101821599/ReceiveNotification/b99e7dc1b2a34a49b8923049dc49c930cd2485bb5fc640c7ad')
            .get('https://api.green-api.com/waInstance1101824540/ReceiveNotification/69ed8401b93c4e45979f7f9b79bb097ed432ab91d43145f4a2')
            .then(result => {
                if (result.data) {
                    setIdIncoming(result.data.body.idMessage);
                    if (result.data.body.idMessage !== idIncoming) {
                        let phoneNum = result.data.body.senderData.chatId.slice(0, 11);
                        dispatch(addMessageToFeed(phoneNum, {
                            type: 'messageIncoming',
                            body: result.data.body.messageData.textMessageData.textMessage,
                            date: Date.now(),
                            id: result.data.body.idMessage
                        })) 
                    }
                    axios
                        // .delete(`https://api.green-api.com/waInstance1101821599/DeleteNotification/b99e7dc1b2a34a49b8923049dc49c930cd2485bb5fc640c7ad/${result.data.receiptId}`)
                        .delete(`https://api.green-api.com/waInstance1101824540/DeleteNotification/69ed8401b93c4e45979f7f9b79bb097ed432ab91d43145f4a2/${result.data.receiptId}`)
                        .then(result => {
                                // console.log('Результат запроса на удаление', result);
                        })
                        .catch(error => {
                            // console.log('ошибка удаления', error);
                        })
                }
            })
            .catch(error => {
                // console.log(error);
            });
    }

    
    let timerId = null;
    if (!beginedTrackingIncoming) {
        setBeginedTrackingIncoming(true);
        timerId = setInterval(getNotification, 5000);
    }


    return (
        <div className='chatList'>
            <Header/>
            <SearchChat/>


            {chats.map(item => {
                return (
                    <div 
                        className={`itemChat ${item.status}`} 
                        onClick={() => makeActive(item.phoneNum)} 
                        key={item.phoneNum}
                    >
                        <div 
                            className='avatar' 
                            style={{'backgroundImage': `url(${item.avatar})`}} 
                        >
                        </div>
                        <div>
                            <div className='name'>
                                {item.name ? item.name : item.phoneNum}
                            </div>
                        </div>
                    </div>
                )
            })}

            <div className='greating'>
                Привет! 
                Это тестовый проект, который позволяет обмениваться текстовыми сообщениями с пользователями WhatsApp с помощью API компании GreenAPI.
                <br/>
                К проекту подключен бесплатный тариф, который имеет ограничения:
                <br/>
                - максимальное количество чатов - 3;
                <br/>
                - максимальное количество сообщений в месяц - 1000.
                <br/>
                <br/>
                Один чат уже занят номером разработчика.
                Вы можете добавить еще два чата.
                <br/>
                Все вопросы и пожелания вы можете отправить разработчику на WhatsApp через этот сайт. Постараюсь ответить быстро!
                <br/>
                <br/>
                С уважением, разработчик Елена Арапова.

            </div>
        </div>
    )
}



export default ChatList;