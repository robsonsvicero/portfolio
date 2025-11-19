import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import ServiceFrontEnd from './pages/ServiceFrontEnd';
import ServiceIdentidadeVisual from './pages/ServiceIdentidadeVisual';
import ServiceUIUXDesign from './pages/ServiceUIUXDesign';
import NotFound from './pages/NotFound';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agenda" element={<Schedule />} />
        <Route path="/servico-front-end" element={<ServiceFrontEnd />} />
        <Route path="/servico-identidade-visual" element={<ServiceIdentidadeVisual />} />
        <Route path="/servico-ui-design" element={<ServiceUIUXDesign />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
