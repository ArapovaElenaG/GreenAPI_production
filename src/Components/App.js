import React from 'react';
import './App.scss';
import ChatList from './ChatList/ChatList';
import ChatWindow from './ChatWindow/ChatWindow';

function App() {
  // const [phoneNum, setPhoneNum] = React.useState('');

  // const addPhoneNum = (num) => {
  //   setPhoneNum(num);
  // }
  

  return (
    <div className="App">
      <ChatList 
      // phoneNum={phoneNum} addPhoneNum={addPhoneNum}
      />
      <ChatWindow 
      // phoneNum={phoneNum}
      />
    </div>
  );
}

export default App;
