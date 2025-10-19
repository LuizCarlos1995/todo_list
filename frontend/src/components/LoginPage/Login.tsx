import React, { useState } from 'react';
import { LoginService } from '../../services/LoginService';
import { useNavigate } from "react-router-dom";


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (!email.trim() || !password.trim()) {
      setError('Preencha e-mail e senha');
      return false;
    }
    // validação simples de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('E-mail inválido');
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
      // ajusta rota no backend
      // const response = await LoginService.fazerLogin(credentials);
      
      navigate("/tasks");
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err?.message || 'Erro ao realizar login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`login-container`}>
      <form className="task-form" onSubmit={handleSubmit} aria-label="form-login">
        <h3>Entrar</h3>

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
            autoComplete="current-password"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>

        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <small style={{ color: '#6c757d' }}>Ainda não tem conta? Cadastre-se no painel.</small>
        </div>
      </form>
    </div>
  );
};

export default Login;
