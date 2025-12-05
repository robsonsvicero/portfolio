import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import ServiceFrontEnd from './pages/ServiceFrontEnd';
import ServiceIdentidadeVisual from './pages/ServiceIdentidadeVisual';
import ServiceUIUXDesign from './pages/ServiceUIUXDesign';
import Login from './pages/Login';
import AdminProjetos from './pages/AdminProjetos';
import NotFound from './pages/NotFound';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agenda" element={<Schedule />} />
          <Route path="/servico-front-end" element={<ServiceFrontEnd />} />
          <Route path="/servico-identidade-visual" element={<ServiceIdentidadeVisual />} />
          <Route path="/servico-ui-design" element={<ServiceUIUXDesign />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin/projetos" 
            element={
              <ProtectedRoute>
                <AdminProjetos />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
