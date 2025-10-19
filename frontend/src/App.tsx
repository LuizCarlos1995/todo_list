// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/LoginPage/Login';
import Task from "./components/TaskPage/Task"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/tasks" element={<Task />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
