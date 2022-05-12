import { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import './App.css'

const client = new W3CWebSocket('ws://127.0.0.1:8000');

function App() {
  const [msg, setMsg] = useState("");

  const onButtonClicked = (message) => {
    client.send(
      JSON.stringify({
        type: "message",
        msg: message,
      })
    );
  }

  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected')
    }

    client.onmessage = (message) => {
      const dataFromserver = JSON.parse(message.data);
      console.log('got reply! ', dataFromserver);
    }
  }, [])

  return (
    <div className="App">
      <h2>Web Socket Tuts</h2>

      <div className="message_Box">
        <input type="text" onChange={(e) => setMsg(e.target.value)} />
        <button onClick={() => onButtonClicked(msg)}>Send Message</button>
      </div>
    </div>
  );
}

export default App;
