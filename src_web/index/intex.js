const CriarConta = () => {
    document.location = "../criar-conta/criar.html"
}

const entrar = () => {
    document.location = "../entrar/entrar.html"
}

window.onload = () => {
    document.getElementsByClassName("criarConta")[0].addEventListener('click', CriarConta)
    document.getElementsByClassName("direito")[0].addEventListener('click', entrar)
}