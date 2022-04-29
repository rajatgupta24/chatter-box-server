import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import jsPDF from "jspdf";

import './App.css';

const doc = new jsPDF();

function App() {
  const [text, setText] = useState("")

  const save = () => {
    doc.text(text, 10, 10);
    doc.save("myDocument.pdf");
  };

  const saveMD = () => {
    doc.text(text, 10, 10);
    doc.save("myDocument.pdf");
  };

  return (
    <>
      <div className="App">
        <textarea className='editor' value={text} onChange={(e) => setText(e.target.value)}></textarea>
        <div className='md'>
          <ReactMarkdown children={text} />          
        </div>
      </div>
      <div className='btns'>
        <button onClick={save}>Save PDF</button>
        <button onClick={save}>Save MD</button>
      </div>
    </>
  );
}

export default App;
