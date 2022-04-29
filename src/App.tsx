import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import './App.css';

// const doc = new jsPDF();

function App() {
  const [text, setText] = useState("")

  const save = () => {
    const input = document.getElementById("md") as HTMLElement;
    
    html2canvas(input, {
      logging: true,
      useCORS: true,
    }).then(canvas => {
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const imgData = canvas.toDataURL("img/png")
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("new.pdf");
    })
  };

  const savePDF = () => {
    
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
        <button onClick={savePDF}>Save PDF</button>
        <button onClick={save}>Save MD</button>
      </div>
    </>
  );
}

export default App;
