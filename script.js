// RECUPERATION DONNEES
async function recup() {
    
    const reponse =  await fetch("http://localhost:5678/api/works");
    const works = await reponse.json();
    console.log(works);
   // return works;

    genererImage(works);
};

recup();

// RECUPERATION  ID CATEGORIES
async function categories(){
    
    const reponse = await fetch("http://localhost:5678/api/categories");
    console.log(reponse);
    const categs = await reponse.json();

// PARCOURS LE TABLEAU DES DONNEES RECUES
    categs.forEach(categs=> {
        console.log(categs.id);
    });
    // CREATION FILTRES

    categs.forEach(catButton =>{
        const button = document.createElement("Button");
        button.innerText = catButton.name;
        button.dataset.id = catButton.id
        console.log(button);
    // RATTACHEMENT AU HTML 
    gallery.appendChild(button);
});
};
categories();

let gallery = document.querySelector(".gallery");

// CREATION HTML 

function genererImage(works){
    for (let i = 0; i < works.length; i++){
        let figure = document.createElement("figure");
        let imageElement = document.createElement("img");
            imageElement.src = works[i].imageUrl;
        let figcaption = document.createElement("figcaption");
            figcaption.innerText = works[i].title ;

    // RATACHEMENT IMAGES 
        figure.appendChild(imageElement);
        figure.appendChild(figcaption);
    // RATTACHEMENT A LA DIV    
        gallery.appendChild(figure);
        console.log(i);
    }
};


// Crétation Bouttons de catégories 
/*
let menuCategories = document.createElement("nav");
let choixTous = document.createElement("button");
    choixTous.innerText = "Tous";
let choixObjets = document.createElement("button");
    choixObjets.innerText = "Objets";
let choixApparts = document.createElement("button"); 
    choixApparts.innerText = "Appartements";
let choixHotels = document.createElement("button"); 
    choixHotels.innerText = "Hotels & Restaurants";

menuCategories.appendChild(choixTous);
menuCategories.appendChild(choixObjets);
menuCategories.appendChild(choixHotels);
menuCategories.appendChild(choixApparts);
gallery.appendChild(menuCategories);



menuCategories.addEventListener("click", function(){
    const boutonFiltrer = categs.filter (function (categs) {
          return categs.id ;
    });
});
*/