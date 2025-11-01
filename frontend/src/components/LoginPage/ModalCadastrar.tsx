import React, { useState } from "react";
import { UserService } from "../../services/UserService";
import "./ModalCadastrar.css"

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

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Cadastrar Novo Usuário</h3>

                {message && <p className="modal-message">{message}</p>}

                <form onSubmit={handleCadastrar}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="submit" className="btn btn-entrar" disabled={loading}>
                            {loading ? "Salvando..." : "Salvar"}
                        </button>
                        <button type="button" className="btn btn-cancelar" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalCadastrar;
