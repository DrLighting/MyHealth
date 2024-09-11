import { storage, db } from "../config/fire_config.js"
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { uploadBytes, getDownloadURL, ref } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";


const iduser = localStorage.getItem("uid")


let file

if(iduser == null){
    document.location = "../index/intex.html"
}

const out = () => {
    localStorage.removeItem("uid")
    document.location = "../index/intex.html"
} 

const home = () => {
    document.location = "../home/home.html"
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

const cadastra = () =>{

    const colecao = collection(db, `pessoas/${iduser}/vacinas`)

    const imageRef = ref(storage, "imagens/"+getVacina()+".jpg")

    uploadBytes(imageRef, file)
    .then((upfile) => {
        getDownloadURL(imageRef)
        .then((url) => {
            const doc = {
                vacina: getVacina(),
                dataVaci : getDataVaci(),
                dose : getDose(),
                proxDose : getProxVac(),
                urlImg: url,
            }

            addDoc(colecao, doc)
            .then((result) => {
                document.location = "../home/home.html"
            })
            .catch((error) =>{
                alert("Não foi possivel envair os dados")
            })
        })
    })
    .catch((error) => {
        console.log("erro ao subir"+ JSON.stringify(error))
    })

}  



window.onload = () => {
    if(iduser == null){
        document.location = "../index/intex.html"
    }
    document.getElementById("logout").addEventListener("click", out)
    document.getElementsByClassName("botaoBaixo")[0].addEventListener('click', cadastra)
    document.getElementById("vacinas").addEventListener('click', home)
    document.getElementById("foto").addEventListener("change", function(event){
        file = event.target.files[0]
        document.getElementById("trocafoto").src = URL.createObjectURL(file)
    })
}