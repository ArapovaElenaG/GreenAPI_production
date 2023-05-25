import React from 'react';
import './SearchChat.scss';
import {useDispatch} from 'react-redux';
import {addChat} from '../../../Store/actions';
import Input from '../../Input/Input';


function SearchChat() {
    const dispatch = useDispatch();


    const validate = (value) => {
        const regExpTel = /^7\d{10}$/;
        if (regExpTel.test(value)) {return true}
        else {return false}
    }

    const addNewChat = (num) => {
        if (validate(num)) {
            dispatch(addChat(num));
        } 
    }


    return (
        <div className='searchChat'>
            <Input
                place={'inputEnterNumber'}
                completeTask={addNewChat}
                placeholder={'Bведите номер в формате 79000000000'}
            />
        </div>
    )
}



export default SearchChat;