import { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './App.css';

function App() {
  const [text, setText] = useState("")

  const compile = async () => {
    let base64Str = btoa(text);
    console.log(base64Str);

    const data = {
      text: text
    }

    try {
      const res = await axios.post('/md', data)
      
      if (res.data != ""){
        navigator.clipboard.writeText(res.data)
      }

    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <>
      <div className="App">
        <textarea className='editor' value={text} onChange={(e) => setText(e.target.value)}></textarea>
        <div className='md' id="md">
          <ReactMarkdown children={text} />          
        </div>
      </div>
      <div className='btns'>
        <button onClick={compile}>Copy base64</button>
      </div>
    </>
  );
}

export default App;
