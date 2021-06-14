import logo from './logo.svg';
import './App.css';
import socketIOClient from 'socket.io-client';
import { useEffect, useState } from 'react';

function App(){
  const [response, setResponse ] = useState("");
  useEffect(() => {
    const socket = socketIOClient("https://smart-access-api.herokuapp.com")
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        {response}
        </p>
      </header>
    </div>
  );
}

export default App;
