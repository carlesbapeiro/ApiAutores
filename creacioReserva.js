


window.onload = iniciar;

    function iniciar (){


        var dadesUsuari = JSON.parse(localStorage.getItem("usuari"));
        console.log(dadesUsuari);
        var dadesReserva = JSON.parse(localStorage.getItem("DadesReserva"));
        console.log(dadesReserva);


        var fecha = new Date(); //Fecha actual
        var mes = fecha.getMonth()+1;

        mesDev = fecha;




        var dia = fecha.getDate();
        var ano = fecha.getFullYear();
        if(dia<10)
          dia='0'+dia;
        if(mes<10)
          mes='0'+mes

        mesDev.setDate(mesDev.getDate() + 20);
        var diesDev = obtindreData(mesDev); 


        document.getElementById('fecha').value = ano+"-"+mes+"-"+dia;
        
        document.getElementById('fechaDevolucion').value = diesDev;



        document.getElementById("usuari").value = dadesUsuari.nombre;
        document.getElementById("llibre").value = dadesReserva.titulo;



        document.getElementById("enviar").addEventListener("click", validar ,false);

//function(){modificarAutor(dades)}
        //console.log(dades);

    } 


    //VALIDACIO DEL FORMULARI

    function validarUsuari () {
        var element = document.getElementById("usuari");
        if (!element.checkValidity()){
            if (element.validity.valueMissing){
                error2(element,"Deus d'introduïr un usuari Correcte.");
            }
            if (element.validity.patternMismatch){
                error2(element, "El nom ha de tindre un pattern valid.");
            }
            //error(element);
            return false;
        }
    return true;

    }
    function validarLlibre () {
        var element = document.getElementById("llibre");
        if (!element.checkValidity()){
            if (element.validity.valueMissing){
                error2(element,"Deus d'introduïr un llibre.");
            }
            if (element.validity.patternMismatch){
                error2(element, "Deus introduit un patro correcte");
            }
            //error(element);
            return false;
        }
    return true;

    }

    function obtindreData (data){
        var dia = data.getDate();
        var mes = data.getMonth() +1;
        var any = data.getFullYear();
        if ( dia < 10){
            dia = '0' + dia;  
        }
        if ( mes < 10){
            mes = '0' + mes;  
        }
        return any + '-' + mes + '-' + dia;
    }

    function validarData (){
        fecha = document.getElementById("fecha");
        //obtindre la data d'avui
        var dataActual = new Date();
        var avui = obtindreData(dataActual); 
        // otindre data a un mes vista
        
        // Validar l'interval 
        if (fecha.value < avui){
            error("Error la data no pot ser menor que  " + avui);
            return false;    
        }
        
        return true;
    
       }

    function validar(e) {
        e.preventDefault();
        console.log("validar");
        esborrarError ();
        if (validarUsuari() && validarLlibre() && validarData()&& confirm("Confirma si vols enviar el formulari") ){

            console.log("validar");
            crearReserva();
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
    function error (titol , missatge){
        document.getElementById("titolError").innerHTML  = titol; 
      }


    function esborrarError (){
        var formulari = document.forms[0];
            for ( var i=0; i < formulari.elements.length -1; i++){
                formulari.elements[i].className="form-control";
            }
    }

function crearReserva(){

        var dadesUsuari = JSON.parse(localStorage.getItem("usuari"));
        console.log(dadesUsuari);
        var dadesReserva = JSON.parse(localStorage.getItem("DadesReserva"));
        console.log(dadesReserva);

    
        reserva = {

            usuario: dadesUsuari._id,
            libro: dadesReserva._id,
            fecha: document.getElementById("fecha").value,
            fechaDevolucion: document.getElementById("fechaDevolucion").value
            
        }

        fetch('https://serverred.es/api/reservas/', {


                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reserva)

    
            })


        .then(response => response.json())
        .then(data => {
            console.log(data);
            

        })
        .catch((error) => {
            console.error('Error:', error);
        });

        
    


}
