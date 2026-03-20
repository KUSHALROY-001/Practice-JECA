import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Exam from './pages/Exam';
import Result from './pages/Result';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col font-sans transition-colors duration-500">
        <main className="flex-grow flex items-center justify-center p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exam" element={<Exam />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
