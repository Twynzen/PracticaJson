function solicitud(){
url = "https://jsonplaceholder.typicode.com";
var banner = document.getElementById("banner");
var img = document.createElement("img");

var datos = document.createElement("div");
var habilidad = document.createElement("h3");

var boton = document.createElement("button");
var elejir = document.createElement("h4");

var title = document.createElement("h1");


//Performing multiple concurrent requests para utilizar nombre de  los personajes
axios.get(url + "/photos",{
params:{
    _limit:5,
    //name_like: 'cle'
    }
})
.then(function (response) {

  for (let i in response.data) {
    title = document.createElement("h1");
    boton = document.createElement("button");
    elejir = document.createElement("h4");
    img = document.createElement("img");
    img.src = response.data[i].thumbnailUrl;

    datos = document.createElement("div");
    habilidad = document.createElement("h3");
    habilidad.innerText = response.data[i].title;
    datos.appendChild(habilidad);

    banner.appendChild(datos);
    banner.appendChild(img);

    elejir.innerText = "Elejir";
    title.innerText = "Nombre";
    datos.appendChild(boton);
    datos.appendChild(title);
    boton.appendChild(elejir);


  }
    console.log(response.data);

  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
    console.log("axios funciona!")
  });

}
solicitud();
