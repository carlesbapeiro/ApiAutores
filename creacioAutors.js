crearAutor();

function crearAutor(){
    window.onload = iniciar;

    function iniciar (){

        document.getElementById("enviar").addEventListener("click", validar,false);

    } 


    //VALIDACIO DEL FORMULARI

    function validarNom () {
        var element = document.getElementById("nom");
        if (!element.checkValidity()){
            if (element.validity.valueMissing){
                error2(element,"Deus d'introduïr un nom.");
            }
            if (element.validity.patternMismatch){
                error2(element, "El nom ha de tindre entre 2 i 20 caracters.");
            }
            //error(element);
            return false;
        }
    return true;

    }
    function validarAny () {
        var element = document.getElementById("any");
        if (!element.checkValidity()){
            if (element.validity.valueMissing){
                error2(element,"Deus d'introduïr un any.");
            }
            if (element.validity.patternMismatch){
                error2(element, "L'any no es correcte");
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
        if (validarNom() && validarAny() && confirm("Confirma si vols enviar el formulari") ){

            console.log("validar");
            validacioOk();
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
    function validacioOk(){


        console.log("Validacio ok");

        autor = {

            nombre: document.getElementById("nom").value,
            año_nacimiento: document.getElementById("any").value
        }

        fetch('https://serverred.es/api/autores/', {


                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(autor)

    
            })


        .then(response => response.json())
        .then(data => {

            

        })
        .catch((error) => {
            console.error('Error:', error);
        });

        
    }


}
