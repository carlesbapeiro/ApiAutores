function mostrarLlibres(dadesAut){


    console.log(dadesAut);

    

    fetch('https://serverred.es/api/libros/', {


            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})

    .then(response => response.json())
    .then(data => {

        
        //Iteracion principal
        data["resultado"].forEach( element => {

            //Elemento donde guardo el autor
            var tdAUT = document.createElement("td");

            //Estatus indica el contenido del ted
            var status = 0;

            
            //Segunda iteracion con datos del autor
            dadesAut.forEach( dades => {


                if(dades._id == element.autor){
                    //Guardo el autor en el td
                    tdAUT.innerHTML = dades.nombre;
                    status = 1;
                }
            })

            //console.log(element);
            var tabla = document.getElementById("llistaLlibres");
            var text = document.createTextNode("Esborrar");
            var text2 = document.createTextNode("Modificar");
            var boto = document.createElement("button");
            var botoMod = document.createElement("button");

            boto.setAttribute("class","btn btn-warning");
            boto.appendChild(text);

            botoMod.setAttribute("class","btn btn-warning");
            botoMod.appendChild(text2);
            
            boto.addEventListener("click", function(){
                borrarLlibre(element._id);
            });
            botoMod.addEventListener("click", function(){enviarMod(element)});

            var tr = document.createElement("tr");
            tr.setAttribute("id",element._id);

            var tr = document.createElement("tr");
            tr.setAttribute("id",element._id);
            var tdBoto = document.createElement("td");
            var tdbotoMod = document.createElement("td");
            var tdID = document.createElement("td");
            var tdTIT = document.createElement("td");
            var tdEDIT = document.createElement("td");
            
            var tdPREU = document.createElement("td");

            tdID.innerHTML = element._id;
            tdTIT.innerHTML = element.titulo;
            tdEDIT.innerHTML = element.editorial;
            //tdAUT.innerHTML = element.autor;
            tdPREU.innerHTML = element.precio;

            tdBoto.appendChild(boto);
            tdbotoMod.appendChild(botoMod);

            tr.appendChild(tdID);
            tr.appendChild(tdTIT);
            tr.appendChild(tdEDIT);

            //Condicion del td
            if(status == 1){

                tr.appendChild(tdAUT);
                
            }else{

                tdAUT.innerHTML = "Cap registrat";
                tr.appendChild(tdAUT);
            }
            tr.appendChild(tdPREU);

            tr.appendChild(tdBoto);
            tr.appendChild(tdbotoMod);
            tabla.appendChild(tr);



            
        })
        
        //console.log(data["resultado"][0]["autor"]);
        
    })
    .catch((error) => {
        console.error('Error:', error);
    });




}
function nomAutors(){
    
    fetch('https://serverred.es/api/autores/', {


            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})

    .then(response => response.json())
    .then(data => {

        //console.log(data);
        mostrarLlibres(data["resultado"]);
            
        
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

function enviarMod(element){

    console.log(element);
    localStorage.setItem("llibresMod",JSON.stringify(element));
    window.location.href = "llibresFormMod.html";

}
nomAutors();

