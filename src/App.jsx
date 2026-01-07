import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import ServiceFrontEnd from './pages/ServiceFrontEnd';
import ServiceIdentidadeVisual from './pages/ServiceIdentidadeVisual';
import ServiceUIUXDesign from './pages/ServiceUIUXDesign';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Login from './pages/Login';
import AdminProjetos from './pages/AdminProjetos';
import AdminBlog from './pages/AdminBlog';
import AdminDepoimentos from './pages/AdminDepoimentos';
import Admin from './pages/Admin';
import BusinessCard from './pages/BusinessCard';
import NotFound from './pages/NotFound';
import './styles/global.css';

import Agradecimento from './pages/Agradecimento';

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
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/cartao" element={<BusinessCard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/agradecimento" element={<Agradecimento />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/projetos" 
            element={
              <ProtectedRoute>
                <AdminProjetos />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/blog" 
            element={
              <ProtectedRoute>
                <AdminBlog />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/depoimentos" 
            element={
              <ProtectedRoute>
                <AdminDepoimentos />
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
