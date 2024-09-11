import { auth, db } from "../config/fire_config.js"
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const voltar = () => {
    document.location = "../index/intex.html"
}

const conferesenha = () => {
    const senha = document.getElementById("senha1").value
    const confere = document.getElementById("senha2").value

    const h4 = document.createElement("h4")
    h4.innerHTML = "Senha não confere"

    const h5 = document.createElement("h4")
    h5.innerHTML = "Campo senha vazio"

    if (senha != confere) {
        document.getElementsByClassName('aviso')[0].appendChild(h4)

    }

    else if (senha == 0) {
        document.getElementsByClassName('aviso')[0].appendChild(h5)
    }
    else {
        CadastroUsu();
    }
}

const getNome = () => {
    return document.getElementById("nome").value;
}

const getSexo = () => {
    return document.querySelector('input[name="sexo"]:checked').value
}

const getDataNasc = () => {
    return document.getElementById("datanasc").value
}

const getEmail = () => {
    return document.getElementById("email").value
}

const getSenha = () => {
    return document.getElementById("senha1").value
}

const CadastroUsu = () => {

    let email = getEmail()
    let nome = getNome()
    let nasci = getDataNasc()
    let sexo = getSexo()

    createUserWithEmailAndPassword(auth, getEmail(), getSenha())
        .then((result) => {
            localStorage.setItem("uid", result.user.uid)
            cadastrar(email, nome, nasci, sexo)







            /*const colecao = collection(db, "pessoas")
            const doc = {
                nome: getNome(),
                dataNasc: getDataNasc(),
                sexo: getSexo(),
                email: getEmail(),
            }
            addDoc(colecao, doc)
                .then((retorno) => {
                    localStorage.setItem("id", retorno.id)
                    document.location = "../home/home.html"
                    
                })
                .catch((error) => {
                    console.log("deu errado" + JSON.stringify(error))
                })

            
            
            
            let email = getEmail()
            let nome = getNome()
            let nasci = getDataNasc()
            let sexo = getSexo()
            setDoc(doc(db, "pessoas", result.user.uid), {
                nome: nome,
                dataNasc: nasci,
                sexo: sexo,
                email: email,
            })
            .then((result) => {
                console.log("deu certo")
            })
            .catch((error) => {
                console.log("deu errado")
            })
            */


        })
        .catch((error) => {
            console.log("deu erro " + error)
        })
        
    const cadastrar = (email, nome, nasci, sexo) => {
        setDoc(doc(db, "pessoas", auth.currentUser.uid), {
            nome: nome,
            dataNasc: nasci,
            sexo: sexo,
            email: email,
        })
            .then((result) => {
                window.location.href = "../home/home.html"
            })
            .catch((error) => {
                alert(error)
            })

    }
}



    document.getElementById("cadastro").addEventListener("click", conferesenha)
    document.getElementsByClassName("esquerdo")[0].addEventListener("click", voltar)

