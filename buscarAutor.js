function buscarAutors(id){
        

    fetch('https://serverred.es/api/autores/'+id, {


            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})

    .then(response => response.json())
    .then(data => {
        
        
        return "Dades: "+data;
        
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    

}
