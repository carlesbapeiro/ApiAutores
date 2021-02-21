window.onload = iniciar;

function filtre(dadesAut){
    var paraula = document.getElementById("paraula").value;
    console.log(paraula);

    fetch('https://serverred.es/api/libros/titulo/'+paraula, {

                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }})

            .then(response => response.json())
            .then(data => {

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
                    var check = document.createElement("input");
                    check.setAttribute("type", "checkbox");
                    check.addEventListener("click", function(){EnviarReserva(element)});
        
                    var tr = document.createElement("tr");
                    tr.setAttribute("id",element._id);
        
                    var tr = document.createElement("tr");
                    tr.setAttribute("id",element._id);
        
                    
                    var tdTIT = document.createElement("td");
                    var tdEDIT = document.createElement("td");
                    
                    var tdPREU = document.createElement("td");
        
                    
                    tdTIT.innerHTML = element.titulo;
                    tdEDIT.innerHTML = element.editorial;
                    //tdAUT.innerHTML = element.autor;
                    tdPREU.innerHTML = element.precio;
        
                    tr.appendChild(check);
                    tr.appendChild(tdTIT);
                    tr.appendChild(tdEDIT);
                    if(status == 1){
        
                        tr.appendChild(tdAUT);
                        
                    }else{
        
                        tdAUT.innerHTML = "Cap registrat";
                        tr.appendChild(tdAUT);
                    }
                    tr.appendChild(tdPREU);
        
                    tabla.appendChild(tr);


                })
        


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
        filtre(data["resultado"]);
            
        
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}


function carregarFiltre(){


    var dades = JSON.parse(localStorage.getItem("usuari"));

    console.log(dades);
    document.getElementById("nomUser").innerHTML =dades.nombre;
    document.getElementById("emailUser").innerHTML = dades.email;
    
    nomAutors();
}

function iniciar(){


    document.getElementById("buscar").addEventListener("click",carregarFiltre);
    
}