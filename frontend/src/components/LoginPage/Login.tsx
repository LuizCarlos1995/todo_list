import React, { useState } from "react";
import { LoginService } from "../../services/LoginService";
import { useNavigate } from "react-router-dom";
import ModalCadastrar from "./ModalCadastrar.tsx";
import { EyeIcon, EyeOffIcon } from "../icons/SvgIcone.jsx";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    if (!email.trim() || !password.trim()) {
      setError("Preencha e-mail e senha");
      return false;
    }
    // validação simples de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("E-mail inválido");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      setError(null);

      const credentials = { email, password };
      await LoginService.fazerLogin(credentials);

      navigate("/tasks");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err?.message || "Erro ao realizar login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="w-full max-w-md">
        <form
          className="
          rounded-2xl p-6 shadow-xl border
          bg-white/95 dark:bg-slate-900/90
          border-slate-200 dark:border-slate-800
          backdrop-blur
        "
          onSubmit={handleSubmit}
          aria-label="form-login"
        >
          <h3 className="text-xl font-semibold text-center mb-6">Entrar</h3>

          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200">
              {error}
            </div>
          )}

          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
              w-full rounded-md px-3 py-2 border
              bg-white dark:bg-slate-800
              text-slate-900 dark:text-slate-100
              border-slate-300 dark:border-slate-700
              placeholder:text-slate-400
              focus:outline-none focus:ring-2 focus:ring-sky-400
            "
              required
              autoComplete="email"
            />
          </div>

          <div className="mb-4">
            <div className="relative">
              <input
                className="
                w-full rounded-md px-3 py-2 pr-10 border
                bg-white dark:bg-slate-800
                text-slate-900 dark:text-slate-100
                border-slate-300 dark:border-slate-700
                placeholder:text-slate-400
                focus:outline-none focus:ring-2 focus:ring-sky-400
              "
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
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
                {showPassword ? <EyeOffIcon/>  : <EyeIcon/> }
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="
            w-full rounded-md py-2 font-medium
            bg-sky-500 text-white hover:bg-sky-600
            disabled:opacity-60 disabled:cursor-not-allowed
          "
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <div className="mt-4 text-center">
            <small className="text-slate-600 dark:text-slate-300">
              Ainda não tem conta? Cadastre-se no painel.
            </small>
          </div>

          <div className="mt-4">
            <button
              type="button"
              className="
              w-full rounded-md py-2 font-medium
              border border-slate-300 text-slate-700 hover:bg-slate-50
              dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800
              disabled:opacity-60 disabled:cursor-not-allowed
            "
              disabled={loading}
              onClick={() => setShowModal(true)}
            >
              Cadastrar-se
            </button>
          </div>
        </form>

        <ModalCadastrar
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      </div>
    </div>
  );
};

export default Login;
