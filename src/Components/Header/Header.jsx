import React from 'react';
import './Header.scss';
import iconMessage from './images/chat-left-text-fill.svg';



function Header({phoneNum, avatar}) {
    return (
        <header className={`header ${phoneNum ? 'headerWindow' : ''}`}>

            <div 
                className='avatar'
                style={{'backgroundImage': `url(${avatar})`}} 
            >
            </div>


            {!phoneNum ? 
            <div className='icons'>
                <i className="icon fa-solid fa-users-line"></i>
                <i className="icon fa-solid fa-circle-notch"></i>
                <img src={iconMessage} alt="" height="20" className='icon'/>
                <i className="icon fa-solid fa-ellipsis-vertical"></i>
            </div>
            :
            <div className='number'>{phoneNum}</div>
            }
            
        </header>
    )
}

export default Header;