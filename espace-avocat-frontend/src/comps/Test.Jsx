import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RegisterForm from './pages/auth/RegisterForm';
import ProfilAvocatForm from './pages/auth/ProfilAvocatForm';
import Dashboard from './pages/auth/Dashboard';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/"         element={<Navigate to="/register" />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/profil"   element={<ProfilAvocatForm />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;