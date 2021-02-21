
    //borrar autors
    function borrarAutor(id){

            console.log("El autor es pot borrar");
            fetch('https://serverred.es/api/autores/'+id, {

                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }})

            .then(response => response.json())
            .then(data => {


                //borrar el tr
            
                document.getElementById(id).remove();
                setTimeout(function(){ alert("Autor Borrat correctament");}, 200);



            })
            .catch((error) => {
                console.error('Error:', error);
            });


    }

    function borrarOK(id){

    
    const dades = fetch('https://serverred.es/api/libros/')
    
    .then(response => response.json())
    .then(data => {

        console.log("id:"+id);
        let estado = "0";
        data["resultado"].forEach( element => {
           
            
            
            if(element.autor == id){
                
               
                estado = 1;
                
                
            }
                
        })
        if(estado == 1){

            alert("Hay un libro con ese autor");

        }else{

            borrarAutor(id);
        }
                
            
       
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

