// Defina um nome de usuário e senha
const USERNAME = "usuario"; // Altere para o nome de usuário desejado
const PASSWORD = "senha"; // Altere para a senha desejada

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === USERNAME && password === PASSWORD) {
        // Se as credenciais estiverem corretas, redireciona para a página de faturação
        window.location.href = "index.html";
    } else {
        // Exibe uma mensagem de erro
        document.getElementById('loginError').textContent = "Usuário ou senha incorretos.";
    }
}