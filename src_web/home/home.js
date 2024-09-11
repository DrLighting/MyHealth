import { storage, db } from "../config/fire_config.js"
import { collection, onSnapshot, query } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";


const iduser = localStorage.getItem("uid")

const grid = document.getElementsByClassName("grid-vacinas")[0]



if(iduser == null){
    document.location = "../index/intex.html"
}

const nova = () => {
    document.location  = "../nova-vacina/nova.html"
}

const edit = () =>{
    document.location = "../editar-vacina/editar.html"
}

const out = () => {
    localStorage.removeItem("uid")
    document.location = "../index/intex.html"
}

const cardVac = (vacina, dose, data, img, reforco, id ) => {
    const divVac = document.createElement("div")
    divVac.classList.add("quadro")

    const nomeVac = document.createElement("p")
    nomeVac.classList.add("vacina")
    const pDose = document.createElement("p")
    pDose.classList.add("dose")
    const pData = document.createElement("p")
    pData.classList.add("data")
    const imag = document.createElement("img")
    imag.classList.add("comprovante")
    const prox = document.createElement("p")
    prox.classList.add("reforco")

    const idVac = document.createElement("span")
    idVac.type = 'hidden'
    idVac.hidden = id

    nomeVac.innerHTML = vacina
    pDose.innerHTML = dose
    pData.innerHTML = data
    prox.innerHTML = reforco
    imag.src = img

    divVac.appendChild(nomeVac)
    divVac.appendChild(pDose)
    divVac.appendChild(pData)
    divVac.appendChild(imag)
    divVac.appendChild(prox)
    divVac.appendChild(idVac)
    divVac.onclick = () => editarVac(id)

    return divVac

}

const carregarVac = () => {
    const qy = query(collection(db, `pessoas/${iduser}/vacinas`))

    onSnapshot(qy, (result) =>{
        grid.innerHTML = ""
        result.forEach((documento) => {
            grid.appendChild(cardVac(documento.data().vacina, documento.data().dose, documento.data().dataVaci, documento.data().urlImg, documento.data().proxDose, documento.id))
            
        });
    })
}

const editarVac = (id) =>{
    localStorage.setItem("idVac", id)
    document.location = "../editar-vacina/editar.html"
}



window.onload = () => {
    if(iduser == null){
        document.location = "../index/intex.html"
    }

    carregarVac()


    document.getElementById("logout").addEventListener("click", out)
    document.getElementsByClassName("btm-footer")[0].addEventListener("click", nova)

}