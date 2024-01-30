
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import FileUpload from './components/fileupload';
// import Filters from './components/filters';
import Dashboard from './components/dashboard';
import FilterContainer from './components/filtercontainer';
import Filters from './components/filters';
import YourComponent from './components/filters';

const App = () => {
  return (
    <Router>
      <Routes>

     
        <Route path="/" element={< Dashboard />} />
       
      </Routes>
    </Router>
  );
};

export default App;
