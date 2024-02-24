import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CircularProgress } from '@mui/material';
import Login from './components/Login/Login';
import PrivateRoutes from './shared/util/privateRoute';

function App() {
  return (
    <>
      <Router>
        <div className="app-wrapper">
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<>Hi</>}></Route>
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
