import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Exam from './pages/Exam';
import Result from './pages/Result';
import Contact from './pages/Contact';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col font-sans transition-colors duration-500">
        <main className="flex-grow flex flex-col w-full h-full bg-slate-950">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exam" element={<div className="flex-grow flex items-center justify-center p-2 w-full bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen"><Exam /></div>} />
            <Route path="/result" element={<div className="flex-grow flex items-center justify-center p-2 w-full bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen"><Result /></div>} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
