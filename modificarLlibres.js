crearLlibre();

function crearLlibre(){
    window.onload = iniciar;

    function iniciar (){
        
        var dades = JSON.parse(localStorage.getItem("llibresMod"));

        document.getElementById("titol").value = dades.titulo;
        document.getElementById("editorial").value = dades.editorial;
        document.getElementById("preu").value = dades.precio;
        document.getElementById("enviar").addEventListener("click", validar,false);

    } 


    //VALIDACIO DEL FORMULARI

    function validarTitol () {
        var element = document.getElementById("titol");
        if (!element.checkValidity()){
            if (element.validity.valueMissing){
                error2(element,"Deus d'introduïr un titol.");
            }
            if (element.validity.patternMismatch){
                error2(element, "El titol ha de tindre entre 2 i 50 caracters.");
            }
            
            return false;
        }
    return true;

    }
    function validarEditorial () {
        var element = document.getElementById("editorial");
        if (!element.checkValidity()){
            if (element.validity.valueMissing){
                error2(element,"Deus d'introduïr una editorial.");
            }
            if (element.validity.patternMismatch){
                error2(element, "L'Editorial no es correcta");
            }
            //error(element);
            return false;
        }
    return true;

    }
    function validarPreu () {
        var element = document.getElementById("preu");
        if (!element.checkValidity()){
            if (element.validity.valueMissing){
                error2(element,"Deus d'introduïr un preu.");
            }
            if (element.validity.patternMismatch){
                error2(element, "El preu no es correcte");
            }
            //error(element);
            return false;
        }
    return true;

    }

    function validar(e) {
        e.preventDefault();
        console.log("validar");
        esborrarError ();
        if (validarTitol() && validarEditorial() && validarPreu() && confirm("Confirma si vols enviar el formulari") ){
            var dades = JSON.parse(localStorage.getItem("llibresMod"));
            console.log("validar");
            validacioOk(dades);
            return true;

        }else{
            e.preventDefault();
            return false;
        }
    }

    function error2 (element, missatge){
        document.getElementById("missatgeError").innerHTML = missatge;
        element.className ="error";
        element.focus();
    }


    function esborrarError (){
        var formulari = document.forms[0];
            for ( var i=0; i < formulari.elements.length -1; i++){
                formulari.elements[i].className="form-control";
            }
    }



    //Si la validacio es correcta
    function validacioOk(dades){


        console.log("Validacio ok");

        llibre = {

            titulo: document.getElementById("titol").value,
            editorial: document.getElementById("editorial").value,
            precio: document.getElementById("preu").value,
            autor:document.getElementById("autors").value
            
        }

        fetch('https://serverred.es/api/libros/'+dades._id, {


                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(llibre)

    
            })


        .then(response => response.json())
        .then(data => {

            

        })
        .catch((error) => {
            console.error('Error:', error);
        });

        
    }


}
