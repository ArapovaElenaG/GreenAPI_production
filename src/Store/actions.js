export const ACTIONS = {
    ADD_CHAT: 'ADD_CHAT',
    MAKE_ACTIVE_CHAT: 'MAKE_ACTIVE_CHAT',
    ADD_MESSAGE_TO_FEED: 'ADD_MESSAGE_TO_FEED',
}


export const addChat = (num) => {
    return {
        type: ACTIONS.ADD_CHAT,
        num
    }
}

export const makeActiveChat = (num) => {
    return {
        type: ACTIONS.MAKE_ACTIVE_CHAT,
        num
    }
}

export const addMessageToFeed = (num, message) => {
    return {
        type: ACTIONS.ADD_MESSAGE_TO_FEED,
        num,
        message
    }
}


