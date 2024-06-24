import './style/home.css';
import { Routes, Route } from 'react-router-dom'; 
import Home from './view/Home'
import AttackStepOne from './view/AttackStepOne';
import AttackStepTwo from './view/AttackStepTwo';
import AttackStepThree from './view/AttackStepThree';
import Results from './view/Results'; 
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
       <ToastContainer autoClose={1500} />
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/step-1" element={<AttackStepOne />} />
        <Route path="/step-2" element={<AttackStepTwo />} />
        <Route path="/step-3" element={<AttackStepThree />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );
}

export default App;
