const data = {
   productos:
   [ 
    {
        productoid: 1,
        categoriaId: 1,
        nombreProducto: "Anillo boda 1",
        descripcion: "Anillo plateado 11k...",
        imagen: "nombre.png",
        precio: 1400,

    },
    {
        productoid: 2,
        categoriaId: 2,
        nombreProducto: "Collar rosa",
        descripcion: "Collar plateado 11k...",
        imagen: "nombre.png",
        precio: 1400,

    },
    {
        productoid: 3,
        categoriaId: 3,
        nombreProducto: "Pulsera amistad",
        descripcion: "Pulsera plateado 11k...",
        imagen: "nombre.png",
        precio: 1400,

    }], 
    categorias : [
        {
            categoriaId: 1,
            categoria: "ANILLOS",
            imagen:'anillo.jpg'
    
    
        },
        {
            categoriaId: 2,
            categoria: "COLLARES",
            imagen:"collar.jpg"
    
        },
        {
            categoriaId: 3,
            categoria: "PULSERAS",
            imagen:"pulsera.jpg"
    
        },
        {
            categoriaId: 4,
            categoria: "PIERCINGS",
            imagen:"piercing.jpg"
        },
        {
            categoriaId: 5,
            categoria: "ARETES",
            imagen:"arete.jpg" 
    
        },
        {
            categoriaId: 6,
            categoria: "RELOJES",
            imagen:"reloj.jpg"
        },
        
    
    ]
}

module.exports = data;