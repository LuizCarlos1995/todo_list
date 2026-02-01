import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/LoginPage/Login";
import Task from "./components/TaskPage/Task";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <BrowserRouter>
      {/* Layout global com tema */}
      <div className="min-h-screen text-slate-900 dark:text-slate-100">
        {/* Header global */}
        <header
          className="
          border-b border-white/20
          dark:border-slate-800
          text-white
          dark:text-slate-100"
        >
          <div className="max-w-5xl mx-auto p-4 flex items-center justify-between">
            <div className="text-lg font-bold">Task Manager</div>
            <ThemeToggle />
          </div>
        </header>

        {/* Conteúdo das páginas */}
        <main className="max-w-5xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tasks" element={<Task />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
