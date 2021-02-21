function mostrarUsuaris(){
        
    
    //Data => informacio de tots els llibres
    //Data s'utilitza per a poder mostrar els llibres publicats per cada autor

    //Obtinc les dades de la api
    fetch('https://serverred.es/api/usuarios/', {


            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})

    .then(response => response.json())
    .then(data => {
        
        
        //console.log(datos);

        //Per cada autor iterare en el bucle
        data["resultado"].forEach( element => {
            
            
            console.log(element);
            

            //Cree la tabla, els td etc i els done valors i atributs
            var tabla = document.getElementById("llistaUsuaris");
            var tr = document.createElement("tr");

            var check = document.createElement("input");
            check.setAttribute("type", "checkbox");
            check.addEventListener("click", function(){EnviarUsuari(element)});

            var tdBuit = document.createElement("td");
            var tdTelefon = document.createElement("td");
            var tdNOM = document.createElement("td");
            var tdEmail = document.createElement("td");
            var tdDirec = document.createElement("td");

            
            tdNOM.innerHTML = element.nombre;
            tdTelefon.innerHTML = element.telefono;
            tdEmail.innerHTML = element.email;
            tdDirec.innerHTML = element.direccion;




            tr.appendChild(check);
            tr.appendChild(tdNOM);
            tr.appendChild(tdTelefon);
            tr.appendChild(tdEmail);
            tr.appendChild(tdDirec);

            
            tabla.appendChild(tr);
            
        })
        
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    

    

}


mostrarUsuaris();

function EnviarUsuari(element){

    localStorage.setItem("usuari", JSON.stringify(element));
    console.log(element);
    window.location.href = "llibresExamen.html";
}
