import {ACTIONS} from './actions';
import avatar from '../Components/images/avatar.jpg';
import sharedAvatar from '../Components/images/person-fill.svg';


const initialState = {
    messageFeed: [],
    phoneNum: '',
    chats: [
        {
            name: 'developer Elena Arapova',
            phoneNum: '79128819285',
            status: 'active',
            avatar: avatar,
            messageFeed: []
        },
    ]
}

const reduсer = (state = initialState, action) => {
    switch(action.type) {

        case ACTIONS.ADD_MESSAGE_TO_FEED:
            let updateChats = state.chats.map(item => {
                if (
                    item.phoneNum === action.num && 
                    (!item.messageFeed.length || item.messageFeed[item.messageFeed.length - 1].id !== action.message.id)
                    ) {
                    return {
                        name: item.name, 
                        phoneNum: item.phoneNum, 
                        status: item.status,
                        avatar: item.avatar, 
                        messageFeed: [...item.messageFeed, action.message]}}
                else {return item}
            })
            return {
                ...state,
                chats: updateChats
            }


        case ACTIONS.ADD_CHAT:
            if (state.chats.length < 3) {
                let index = state.chats.findIndex(item => item.phoneNum === action.num);
                if(index <= 0) {
                    return {
                        ...state,
                        chats: [...state.chats, {
                            phoneNum: action.num, 
                            status: '',
                            avatar: sharedAvatar, 
                            messageFeed: []
                        }]
                    }
                } else {return state}
            } else {return state}

        case ACTIONS.MAKE_ACTIVE_CHAT:
            return {
                ...state,
                chats: [...state.chats.map(item => {
                    if (item.phoneNum === action.num) {
                        return ({...item, status: 'active'})
                    } else {return ({...item, status: ''})}
                })]
            }


        default:
            return state
    }
}





export default reduсer;




