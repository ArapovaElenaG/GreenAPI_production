import React from 'react';
import './Input.scss';


function Input({place, completeTask, placeholder}) {
    const [inputValue, setInputValue] = React.useState('');

    const handleInput = (event) => {
        if (event.keyCode) {
            if (event.keyCode == 13 && inputValue) {
                setInputValue('');
                hahdleIcon();
            }
        } else {setInputValue(event.target.value)};
    }

    const hahdleIcon = () => {
        if (inputValue) {
            setInputValue('');
            completeTask(inputValue);
        }
    }


    return (
        <div className='wrapperInput'>
            <input type="text" 
                onChange={handleInput}
                onKeyDown={handleInput}
                value={inputValue}
                className={`input ${place}`}
                placeholder={placeholder}
            />
            <i className="icon fa-solid fa-right-to-bracket" onClick={hahdleIcon}></i>
        </div>
    )
}


export default Input;