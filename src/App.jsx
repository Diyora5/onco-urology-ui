import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Home from './pages/Home/Home.jsx';
import EmployeeDetail from './pages/EmployeeDetail/EmployeeDetail.jsx';

function App() {
  return (
    <div className="app">
      <Header />

      <main className="container app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees/:id" element={<EmployeeDetail />} />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} DoctorInfo — информация о специалистах</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
