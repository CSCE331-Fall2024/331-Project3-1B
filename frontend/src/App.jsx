import './App.css';
import Customer from './customer/customer.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {

  return (
    <Router>
            <Routes>
                <Route path="/" element={<Customer/>} />
            </Routes>
        </Router>
  )
}

export default App
