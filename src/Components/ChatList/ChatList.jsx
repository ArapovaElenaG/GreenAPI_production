import React from 'react';
import './ChatList.scss';
import Header from '../Header/Header';
import SearchChat from './SearchChat/SearchChat';
import {useDispatch, useSelector} from 'react-redux';
import {makeActiveChat, addMessageToFeed, removeChat} from '../../Store/actions';
import axios from 'axios';
import sharedAvatar from '../images/person-fill.svg';
import cross from '../images/Cross.svg';


function ChatList() {
    const [beginedTrackingIncoming, setBeginedTrackingIncoming] = React.useState(false);
    const [idIncoming, setIdIncoming] = React.useState('');

    const idInstance = useSelector(state => state.idInstance);
    const apiTokenInstance = useSelector(state => state.apiTokenInstance);
    const chats = useSelector(state => state.chats);

    const dispatch = useDispatch();

    const makeActive = (num) => {
        dispatch(makeActiveChat(num))
    }

    const removeNum = (num, status) => {
        
        if (status === 'active') {
            makeActive('79128819285');
        }
        dispatch(removeChat(num))
    }


    const getNotification = () => {
        const instance = axios.create({
            baseURL: 'https://api.green-api.com',
        });

        instance
            .get(`/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`)
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
                    instance
                        .delete(`/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${result.data.receiptId}`)
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


    if (!beginedTrackingIncoming) {
        setBeginedTrackingIncoming(true);
        setInterval(getNotification, 5000);
    }


    return (
        <div className='chatList'>
            <div>
                <Header avatar={sharedAvatar}/>
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
                            <div className='wrapperNameChat'>
                                <div className='name'>
                                    {item.name ? item.name : item.phoneNum}
                                </div>
                                {item.name ? '' : <img src={cross} alt="" width={10} onClick={() => removeNum(item.phoneNum, item.status)}/>}
                            </div>
                        </div>
                    )
                })}
            </div>
            

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