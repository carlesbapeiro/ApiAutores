function mostrarAutors(datos){
        
    
    //Data => informacio de tots els llibres
    //Data s'utilitza per a poder mostrar els llibres publicats per cada autor

    //Obtinc les dades de la api
    fetch('https://serverred.es/api/autores/', {


            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})

    .then(response => response.json())
    .then(data => {
        
        
        //console.log(datos);

        //Per cada autor iterare en el bucle
        data["resultado"].forEach( element => {
            
            
            var tdllibres = document.createElement("td");

            //Cree status per a saber si el autor te un llibre, si dona status = 1 vol dir que si
            var status = 0; 
            datos.forEach(dades =>{

                if(dades.autor == element._id){

                    //Omplic el td amb les dades
                    tdllibres.innerHTML += dades.titulo+". <br> ";
                    status = 1;

                }
            })
           
            //Cree la tabla, els td etc i els done valors i atributs
            var tabla = document.getElementById("llistaAutors");
            var text = document.createTextNode("Esborrar");
            var text2 = document.createTextNode("Modificar");
            var boto = document.createElement("button");
            var botoMod = document.createElement("button");
            

            boto.setAttribute("class","btn btn-warning");
            boto.appendChild(text);

            botoMod.setAttribute("class","btn btn-warning");
            botoMod.appendChild(text2);
            
            boto.addEventListener("click", function(){
                borrarOK(element._id);
            });

            //En el boto de modificar fique una funcio anonima i dins cride un altra funcio perque
            //si no ho faig em cridara sempre la funcio li done al boto o no. 
            botoMod.addEventListener("click", function(){enviarMod(element)});

            var tr = document.createElement("tr");
            tr.setAttribute("id",element._id);

           
            var tdBoto = document.createElement("td");

            var tdbotoMod = document.createElement("td");
            var tdID = document.createElement("td");
            var tdNOM = document.createElement("td");
            var tdANY = document.createElement("td");

            tdID.innerHTML = element._id;
            tdNOM.innerHTML = element.nombre;
            tdANY.innerHTML = element.año_nacimiento;

            tdBoto.appendChild(boto);
            tdbotoMod.appendChild(botoMod);


            
            tr.appendChild(tdID);
            tr.appendChild(tdNOM);
            tr.appendChild(tdANY);

            //Confirmacio per a afegir els llibres a la tabla
            if(status == 1){
                tr.appendChild(tdllibres);
            }else{
                //Opcio per defecte
                tdllibres.innerHTML = "Cap en la BD";
                tr.appendChild(tdllibres);

            }
            tr.appendChild(tdBoto);
            tr.appendChild(tdbotoMod);

            tabla.appendChild(tr);
            

            
        })
        
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    

}

//Cride per defecte a la funcio. Aquesta a la seua vegada cridara a mostrar llibres
traureAutorLlibres();


function traureAutorLlibres(){

    //Trac tots els llibres
    fetch('https://serverred.es/api/libros/', {


            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})

    .then(response => response.json())
    .then(data => {
        
        
        //Pase les dades per parametre d'entrada a mostrar autors. 
        mostrarAutors(data["resultado"]);
        
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

//Funcio per a guaradar el autor en el localStorage, em portara al formulari d'edicio al premer el boto
function enviarMod(element){

    console.log(element);
    localStorage.setItem("autorMod",JSON.stringify(element));
    window.location.href = "autorsFormMod.html";

}