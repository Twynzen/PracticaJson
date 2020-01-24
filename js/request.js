function solicitud() {
  //1Primero traemos el json
  var url = "https://jsonplaceholder.typicode.com";

  invoVariables();

  //2Se crean las funciones que moveran los post
  function getUser() {
    //Funcion que trae los usuarios
    return axios.get(url + "/users", {
      params: {
        _limit: 5
      }
    });
  }
  function getPhotos() {
    //Funcion que trae las fotos e imagenes
    return axios.get(url + "/photos", {
      params: {
        _limit: 5
      }
    });
  }
  //3se utiliza axios.all para llamar las funciones anteriores
  axios
    .all([getUser(), getPhotos()])

    //4Usamos las promesas de axios para llamar los post
    .then(
      axios.spread(function(users, photos) {
        dinamizmo();
        function dinamizmo() {
          //modal es la pestaña de muestra al elegir un personaje
          var modal = document.getElementById("modal-text");
          //Un for que recorre cada post basado en su limite
          for (let i in users.data && photos.data) {
            /*CREACIÓN DE ELEMENTOS DINÁMICOS*/
            //Creo el div que contendrá carrusel
            datos = document.createElement("div");
            //Le creo una clase al div
            datos.classList.add("lista");

            /*Descripción general carrusel*/
            //Creamos el h3 de la descripcion en el carrusel
            //importamos data del json y lo volvemos hijo del div principal
            habilidad = document.createElement("h3");
            habilidad.innerText = photos.data[i].title;
            datos.appendChild(habilidad);

            /*Nombre personaje carrusel*/
            //Creación del h1 que contiene nombre del personaje/usuario
            title = document.createElement("h1");
            title.innerText = users.data[i].username;
            datos.appendChild(title);

            /*boton de elegir*/
            boton = document.createElement("button");
            datos.appendChild(boton);

            //Imagen de fondo carrusel por cada personaje
            img = document.createElement("img");
            //extraer imagenes de json
            img.src = photos.data[i].url;
            //Creamos un id para cada div del carrusel
            datos.id = "background" + i;
            //vuelvo el div hijo del id banner
            banner.appendChild(datos);
            //convierto las imagenes del json en el fondo del carrusel
            datos.style.backgroundImage = "url('" + photos.data[i].url + "')";
            //Texto del boton elegir
            elegir = document.createElement("a");
            //el texto del boton del carrusel
            elegir.innerText = "Elegir";
            //detección del id para mostrar segun el post en modal de boostrap
            elegir.id = "elegir" + i;
            //Muestra el modal del boostrap
            elegir.onclick = function() {
              //esta funcion es la que modifica la visibildiad del modal con jquery
              $("#modal").modal("show");
              //datos extraidos de users para una descripción del personaje elegido
              modal.innerText =
                users.data[i].name +
                "\n" +
                users.data[i].email +
                "\n" +
                users.data[i].phone +
                "\n" +
                users.data[i].website +
                "\n" +
                users.data[i].address.street +
                "\n" +
                users.data[i].address.suite +
                "\n" +
                users.data[i].address.city +
                "\n" +
                users.data[i].address.zipcode;
            };

            boton.appendChild(elegir);
          }
        }

        showDivs(1);
        console.log(photos.data);
      })
    )
    //5Un catch por si falla el envio
    .catch(function(error) {
      console.log(error);
    })
    //6finally para confirmar que todo esta correcto
    .finally(function() {
      console.log("Axios Funciona!");
    });
}

//Creamos los elementos dinamicos
function invoVariables() {
  //Banner será el id padre que desplegará los principales datos json
  var banner = document.getElementById("banner");
  var img = document.createElement("img");

  var datos = document.createElement("div");
  var habilidad = document.createElement("h3");

  var boton = document.createElement("button");
  var elegir = document.createElement("h4");

  var title = document.createElement("h1");
  return banner, img, datos, habilidad, boton, elegir, title;
}
solicitud();
