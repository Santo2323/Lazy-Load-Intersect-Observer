"use strict";
const publicaciones = document.querySelector(".publicaciones");

let contador=0;
const createPublicacionCode = (name, content) => {
    const container = document.createElement("DIV");
    const comentarios = document.createElement("DIV");
    const nombre = document.createElement("H3");
    const contenido = document.createElement("P");
    const btnEnviar = document.createElement("INPUT");
    const btnComentario = document.createElement("INPUT");

    container.classList.add("publicacion");
    comentarios.classList.add("comentarios");
    btnEnviar.classList.add("enviar");
    btnComentario.classList.add("comentario");
    btnComentario.setAttribute("placeholder", "Introduce un comentario");
    btnEnviar.type = "submit";
    nombre.textContent = name;
    contenido.textContent = content;

    comentarios.appendChild(btnComentario);
    comentarios.appendChild(btnEnviar);

    container.appendChild(nombre);
    container.appendChild(contenido);
    container.appendChild(comentarios);

    return container
};
const cargarMasPublis = entry =>{
    if (entry[0].isIntersecting) cargarPublicaciones(6);
}
const observer = new IntersectionObserver(cargarMasPublis);

const cargarPublicaciones = async num => {
    const request = await fetch("prueba.txt");
    const content = await request.json();
    const arr = content.content;
    const documentFragment= document.createDocumentFragment();

    for (let i=0; i<num;i++){
    if(arr[contador] != undefined){
        const newPublicacion = createPublicacionCode(arr[contador].nombre,arr[contador].contenido);
        documentFragment.appendChild(newPublicacion);
        contador++;
        if (i == num-1) observer.observe(newPublicacion)
    } else {
        let noMore = document.createElement("h3");
        noMore.textContent = "No hay mas publicaciones";
        noMore.id = "nomore"
        documentFragment.appendChild(noMore);
        publicaciones.appendChild(documentFragment);
        break;
    }
    }
    publicaciones.appendChild(documentFragment);
}


cargarPublicaciones(8);