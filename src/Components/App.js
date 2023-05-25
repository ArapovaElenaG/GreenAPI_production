import React from 'react';
import './App.scss';
import ChatList from './ChatList/ChatList';
import ChatWindow from './ChatWindow/ChatWindow';

function App() {

  return (
    <div className="App">
      <ChatList />
      <ChatWindow/>
    </div>
  );
}

export default App;
