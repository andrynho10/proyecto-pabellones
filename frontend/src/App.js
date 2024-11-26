import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import Layout from './components/layout/Layout';
import Dashboard from './views/Dashboard';
import Cirugias from './views/Cirugias';
import Pabellones from './views/Pabellones'
import Asignaciones from './views/Asignaciones';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/cirugias"
          element={
            <PrivateRoute>
              <Layout>
                <Cirugias />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/pabellones"
          element={
              <PrivateRoute>
                  <Layout>
                      <Pabellones />
                  </Layout>
              </PrivateRoute>
          }
        />
        <Route
          path="/asignaciones"
          element={
              <PrivateRoute>
                  <Layout>
                      <Asignaciones />
                  </Layout>
              </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;