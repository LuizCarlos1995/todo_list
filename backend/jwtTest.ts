import jwt from "jsonwebtoken";

const secret = "SUA_CHAVE_SECRETA"; // depois isso vai pro .env
const payload = { id: 1, email: "luiz@example.com" };

const token = jwt.sign(payload, secret, { expiresIn: "1h" });

console.log("Token gerado:", token);

// Agora vamos verificar o token
try {
    const decoded = jwt.verify(token, secret);
    console.log("Token decodificado:", decoded);
} catch (error) {
    console.error("Token inválido:", error);
}
