import React, { useState } from "react";
import { UserService } from "../../services/UserService";
import { EyeIcon, EyeOffIcon } from "../icons/SvgIcone.jsx";
// import "./ModalCadastrar.css";

interface ModalCadastrarProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCadastrar: React.FC<ModalCadastrarProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null; // Se o modal não estiver aberto, não renderiza nada

  const handleCadastrar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      await UserService.cadastrar({ name, email, password });

      setMessage("Usuário cadastrado com sucesso!");
      setTimeout(() => {
        onClose(); // Fecha o modal após o sucesso
      }, 1500);
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // return (
  //     <div className="modal-overlay">
  //         <div className="modal-content">
  //             <h3>Cadastrar Novo Usuário</h3>

  //             {message && <p className="modal-message">{message}</p>}

  //             <form onSubmit={handleCadastrar}>
  //                 <div className="form-group">
  //                     <input className="modal-input"
  //                         type="text"
  //                         placeholder="Nome"
  //                         value={name}
  //                         onChange={(e) => setName(e.target.value)}
  //                         required
  //                     />
  //                 </div>

  //                 <div className="form-group">
  //                     <input className="modal-input"
  //                         type="email"
  //                         placeholder="E-mail"
  //                         value={email}
  //                         onChange={(e) => setEmail(e.target.value)}
  //                         required
  //                     />
  //                 </div>

  //                 <div className="password-wrapper">
  //                     <input className="modal-input"
  //                         type={showPassword ? "text" : "password"}
  //                         placeholder="Senha"
  //                         value={password}
  //                         onChange={(e) => setPassword(e.target.value)}
  //                         required
  //                     />
  //                     <button
  //                         type="button"
  //                         className="toggle-password"
  //                         onClick={() => setShowPassword(!showPassword)}
  //                     >
  //                         {showPassword ? "🙈" : "👁️"}
  //                     </button>
  //                 </div>

  //                 <div className="modal-actions">
  //                     <button type="submit" className="btn btn-entrar" disabled={loading}>
  //                         {loading ? "Salvando..." : "Salvar"}
  //                     </button>
  //                     <button type="button" className="btn btn-cancelar" onClick={onClose}>
  //                         Cancelar
  //                     </button>
  //                 </div>
  //             </form>
  //         </div>
  //     </div>
  // );

  return (
    <div
    onClick={onClose}
    className="
      fixed inset-0 z-[1000]
      flex items-center justify-center
      bg-black/55 backdrop-blur-sm
      px-4
    "
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="
        w-full max-w-md
        rounded-2xl border
        bg-white/95 dark:bg-slate-900/90
        border-slate-200 dark:border-slate-800
        shadow-2xl
        p-6
        animate-[fadeInScale_.2s_ease-out]
      "
    >
        <h3 className="text-xl font-semibold text-center mb-4">
          Cadastrar Novo Usuário
        </h3>

        {message && (
          <p className="text-center text-sm mb-4 text-slate-700 dark:text-slate-200">
            {message}
          </p>
        )}

        <form onSubmit={handleCadastrar} className="space-y-4">
          <div>
            <input
              className="
              w-full rounded-md px-3 py-2 border
              bg-white dark:bg-slate-800
              text-slate-900 dark:text-slate-100
              border-slate-300 dark:border-slate-700
              placeholder:text-slate-400
              focus:outline-none focus:ring-2 focus:ring-sky-400
              disabled:opacity-60 disabled:cursor-not-allowed
            "
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              className="
              w-full rounded-md px-3 py-2 border
              bg-white dark:bg-slate-800
              text-slate-900 dark:text-slate-100
              border-slate-300 dark:border-slate-700
              placeholder:text-slate-400
              focus:outline-none focus:ring-2 focus:ring-sky-400
              disabled:opacity-60 disabled:cursor-not-allowed
            "
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <input
              className="
              w-full rounded-md px-3 py-2 pr-10 border
              bg-white dark:bg-slate-800
              text-slate-900 dark:text-slate-100
              border-slate-300 dark:border-slate-700
              placeholder:text-slate-400
              focus:outline-none focus:ring-2 focus:ring-sky-400
              disabled:opacity-60 disabled:cursor-not-allowed
            "
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
              absolute right-2 top-1/2 -translate-y-1/2
              p-1 rounded-md
              text-slate-500 hover:text-sky-500
              dark:text-slate-300 dark:hover:text-sky-400
            "
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              title={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              className="
              px-4 py-2 rounded-md font-medium
              border border-slate-300 text-slate-700 hover:bg-slate-50
              dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800
            "
              onClick={onClose}
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
              px-4 py-2 rounded-md font-medium
              bg-sky-500 text-white hover:bg-sky-600
              disabled:opacity-60 disabled:cursor-not-allowed
            "
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
      
      <style>
        {`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}
      </style>
    </div>
  );
};

export default ModalCadastrar;
