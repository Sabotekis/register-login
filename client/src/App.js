import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Users from './pages/Users';
import Protected from './pages/Protected';
import Home from './pages/Home';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/protected" element={<Protected />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>    
        </div>
    )
}

export default App;