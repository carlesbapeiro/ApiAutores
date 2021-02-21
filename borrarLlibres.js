//borrar llibres
function borrarLlibre(id){

    console.log(id);
    fetch('https://serverred.es/api/libros/'+id, {


            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }})

    .then(response => response.json())
    .then(data => {

        //borrar el tr
        console.log(data);

        document.getElementById(id).remove();
        setTimeout(function(){ alert("Llibre Borrat correctament");}, 200);



    })
    .catch((error) => {
        console.error('Error:', error);
    });



    




}

