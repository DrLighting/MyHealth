import { auth } from "../config/fire_config.js"
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const aviso = document.getElementById("aviso")

const voltar = () =>{
    document.location = "../entrar/entrar.html"
}

const getEmail = () => {
    return document.getElementById("email").value
}

const recuperaSenha = () => {
    sendPasswordResetEmail(auth, getEmail())
        .then(() => {
            aviso.innerHTML = "E-mail para redefinir sua senha foi enviado"
        })
        .catch((error) => {
            aviso.innerHTML = "E-mail invalido"
        })
}

document.getElementsByClassName("recuperar")[0].addEventListener('click', recuperaSenha)
document.getElementsByClassName("esquerdo")[0].addEventListener('click', voltar)