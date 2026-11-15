const form = document.querySelector('#loginForm');
const mensagem = document.querySelector('#mensagem');
const campoSenha = document.querySelector('#senha');
const botaoMostrar = document.querySelector('#alternarSenha');
const botaoEntrar = form.querySelector('.botao-entrar');

// Mostrar ou ocultar a senha
botaoMostrar.addEventListener('click', () => {
    const estaOculta = campoSenha.type === 'password';
    campoSenha.type = estaOculta ? 'text' : 'password';
    botaoMostrar.textContent = estaOculta ? 'Ocultar' : 'Mostrar';
    botaoMostrar.setAttribute('aria-label', estaOculta ? 'Ocultar senha' : 'Mostrar senha');
    botaoMostrar.setAttribute('aria-pressed', String(estaOculta));
});

function exibirMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = 'mensagem ' + tipo;
}

// Validação local de login e redirecionamento
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const usuarioDigitado = document.querySelector('#matricula').value.trim();
    const senhaDigitada = campoSenha.value;

    botaoEntrar.disabled = true;
    botaoEntrar.textContent = 'Verificando...';
    exibirMensagem('', '');

    // Pequeno atraso simulando verificação para melhor experiência do usuário
    setTimeout(() => {
        if (usuarioDigitado === 'admin' && senhaDigitada === '1234') {
            exibirMensagem('Login bem-sucedido! Redirecionando...', 'sucesso');
            
            // Salva a sessão no navegador
            sessionStorage.setItem('estaLogado', 'true');
            sessionStorage.setItem('usuarioLogado', usuarioDigitado);

            // Redireciona para a página inicial após 1 segundo
            setTimeout(() => {
                window.location.href = 'paginainicial.html'; 
            }, 1000);

        } else {
            exibirMensagem('Matrícula ou senha incorretos.', 'erro');
            botaoEntrar.disabled = false;
            botaoEntrar.textContent = 'Entrar';
        }
    }, 600);
});