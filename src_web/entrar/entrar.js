import { auth } from "../config/fire_config.js"
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";


const aviso = document.getElementById("aviso")

const voltar = () =>{
    document.location = "../index/intex.html"
}

const getEmail = () => {
    return document.getElementById("email").value;
}

const getSenha = () => {
    return document.getElementById("senha").value;
}

const entrar = () =>{
    aviso.innerHTML=""
    signInWithEmailAndPassword(auth, getEmail(), getSenha())
    .then((result) =>{
        localStorage.setItem("uid", result.user.uid)
        document.location = "../home/home.html"
    })
    .catch(() => {
        aviso.innerHTML="E-mail ou senha invalidos"
    })
}

window.onload = () => {
    document.getElementsByClassName("botao")[0].addEventListener('click' , entrar)
    document.getElementsByClassName("esquerdo")[0].addEventListener('click', voltar)
}

