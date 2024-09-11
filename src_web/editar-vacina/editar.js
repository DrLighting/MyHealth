import { storage, db } from "../config/fire_config.js"
import { collection, getDoc, doc, updateDoc, deleteDoc} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { uploadBytes, getDownloadURL, ref } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

const iduser = localStorage.getItem("uid")
const idVac = localStorage.getItem("idVac")

let file

if(iduser == null){
    document.location = "../index/intex.html"
}

const home = () => {
    document.location = "../home/home.html"
}

const out = () =>{
    localStorage.removeItem("uid")
    document.location = "../index/intex.html"
}

const getDataVaci = () => {
    return document.getElementById("data").value
}
const getVacina = () => {
    return document.getElementById("vacina").value
}
const getDose = () => {
    return document.querySelector('input[name="dose"]:checked').value
} 

const getProxVac = () => {
    return document.getElementById("proxData").value
}


const mostrapop = () => {
    const elemento = document.getElementById("popup1");
    elemento.classList.add("monstra")
}

const mosntraDados = () =>{
    getDoc(doc(db, `pessoas/${iduser}/vacinas`, idVac))
    .then((doc) => {
        document.getElementById("data").value = doc.data().dataVaci
        document.getElementById("vacina").value = doc.data().vacina
        document.getElementById("trocafoto").src = doc.data().urlImg
        document.getElementById("proxData").value = doc.data().proxDose
    })
    .catch((error) =>{
        alert("deu erro" + error)
    })

}

const updateVac = () =>{

    const colecao = collection(db, `pessoas/${iduser}/vacinas`)

    const imageRef = ref(storage, "imagens/"+getVacina()+".jpg")

    uploadBytes(imageRef, file)
    .then((upfile) => {
        getDownloadURL(imageRef)
        .then((url) => {
            const documento = {
                vacina: getVacina(),
                dataVaci : getDataVaci(),
                dose : getDose(),
                proxDose : getProxVac(),
                urlImg: url,
            }

            updateDoc(doc(db,`pessoas/${iduser}/vacinas`, idVac ), documento)
            .then((result) =>{
                document.location = "../home/home.html"
            })
            .catch((error) =>{
                alert("deu erro" + error)
            })
        })
    })
    .catch((error) => {
        console.log("erro ao subir"+ JSON.stringify(error))
    })
}

const excluir = () =>{
    deleteDoc(doc(db, `pessoas/${iduser}/vacinas`, idVac))
    .then(() => {
        alert("Documento Excluido")
        document.location = "../home/home.html"
    })
    .catch((error) =>{
        alert("Deu um erro ao deletar " +error)
    })
}




window.onload = () => {
    if(iduser == null){
        document.location = "../index/intex.html"
    }
    mosntraDados()

    document.getElementById("logout").addEventListener('click', out)
    document.getElementById("vacinas").addEventListener('click', home)
    document.getElementsByClassName("esquerdo")[0].addEventListener('click', home)
    document.getElementsByClassName("botaoBaixo")[0].addEventListener('click', updateVac)
    document.getElementsByClassName("confi")[0].addEventListener('click', excluir)
    document.getElementsByClassName("nega")[0].addEventListener('click', home)
    document.getElementsByClassName("btmexcluir")[0].addEventListener('click', mostrapop)
    document.getElementById("foto").addEventListener("change", function(event){
        file = event.target.files[0]
        document.getElementById("trocafoto").src = URL.createObjectURL(file)
    })
}