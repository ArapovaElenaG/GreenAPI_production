import React from 'react';
import './MessageEnter.scss';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {addMessageToFeed} from '../../../Store/actions';
import Input from '../../Input/Input';



function MessageEnter({phoneNum}) {
    const dispatch = useDispatch();

    const sendMessage = (value) => {
        const data = {
            "chatId": `${phoneNum}@c.us`,
            "message": value
        }
        // const url = 'https://api.green-api.com/waInstance1101821599/SendMessage/b99e7dc1b2a34a49b8923049dc49c930cd2485bb5fc640c7ad';
        

        const url = 'https://api.green-api.com/waInstance1101824540/SendMessage/69ed8401b93c4e45979f7f9b79bb097ed432ab91d43145f4a2';
        axios
            .post(url, data)
            .then(result => {
                if (result.status === 200) {
                    dispatch(addMessageToFeed(phoneNum, {
                        type: 'messageOutgoing',
                        body: value,
                        date: Date.now(),
                        id: result.data.idMessage
                    }));
                } else {
                    let randomID = Math.random().toString(36).substring(2);
                    dispatch(addMessageToFeed(phoneNum, {
                        type: 'messageServer',
                        body: `Что-то пошло не так: \nсообщение \n"${value}" \nне отправлено`,
                        date: Date.now(),
                        id: randomID
                    }))
                }
            })
            .catch((error) => {
                // console.log(error);
                let randomID = Math.random().toString(36).substring(2);
                dispatch(addMessageToFeed(phoneNum, {
                    type: 'messageServer',
                    body: `Ошибка отправки. \nCообщение "${value}" не отправлено. \nСтатус ошибки ${error.response.status}`,
                    date: Date.now(),
                    status: error.response.status,
                    id: randomID
                }))
            });
    }




    return (
        <div className='messageEnter'>
            <i className="icon fa-regular fa-face-laugh"></i>
            <i className="icon fa-solid fa-paperclip"></i>
            <Input
                place={'inputEnterMessage'}
                completeTask={sendMessage}
                placeholder={'Введите сообщение и нажмите Enter'}
            />
        </div>
    )
}



export default MessageEnter;