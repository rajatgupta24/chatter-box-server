import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

function App() {
  const [text, setText] = useState("")

  return (
    <div className="App">
      <textarea className='editor' value={text} onChange={(e) => setText(e.target.value)}></textarea>
      <div className='md'>
        <ReactMarkdown children={text} />
      </div>
    </div>
  );
}

export default App;
