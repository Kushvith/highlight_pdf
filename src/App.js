import './App.css';
import Pdfhighlighter from './pdfhighlighter';
import { jsPDF } from "jspdf";
function App() {
  const doc = new jsPDF();

  doc.text("This is a dummy PDF for testing", 10, 10);
  doc.text("You can add more content here.", 10, 20);
  doc.text("You can add more content here.", 10, 30);

  doc.addPage();
  doc.text("This is the second page.", 10, 10);
  doc.text("You can add more content here.", 10, 20);
  doc.text("You can add more content here.", 10, 30);

  const pdfBlob = doc.output("blob");

  const highlights = [
    { pageIndex: 0, top: 40, left: 30, width: 230, height: 20,text: "This is the first page." },
    { pageIndex: 0, top: 10, left: 30, width: 230, height: 20,text: "This is the first page." },
    { pageIndex: 1, top: 50, left: 40, width: 230, height: 20,text: "This is the second page." }, 
    { pageIndex: 1, top: 80, left: 60, width: 230, height: 20,text: "This is the second page." },
  ];

  return <Pdfhighlighter pdfBlob={pdfBlob} highlights={highlights} />;
}

export default App;