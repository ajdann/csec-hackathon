import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CircularProgress } from '@mui/material';
import Login from './components/Login/Login';
import PrivateRoutes from './shared/util/privateRoute';
import Readings from './components/Readings/Reading';

function App() {
  return (
    <>
      <Router>
        <div className="app-wrapper">
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Readings readings={[]}></Readings>}></Route>
            </Route>
            <Route path="/login" element={<Login />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
