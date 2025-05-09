let gallery = document.querySelector(".gallery");
let allworks = [];
let modifBouton;
let recupH2;


async function recupWorks (){
    try{
    const reponse = await fetch("http://localhost:5678/api/works");
        allworks = await reponse.json();
        console.log(allworks);
    } catch{
        console.log("Les données n'ont pas pu être récupérées");
    }
    
    genererImage(allworks);

    const token = localStorage.getItem("token"); // MASQUE LES BOUTONS SI L'UTILISATEUR SE CONNECTE
    if(!token){
    createButtons(allworks);
    }else{
        boutonModifier();
        ecouteurBoutonModifier();
    
    }
    for (let i = 0; i < allworks.length; i++){
        console.log(allworks[i].category.id);
        console.log(allworks[i].category.name);
    };
};
// Appel de la fonction pour récupérer les données
recupWorks();

/********************  FONCTION SET  ********************/
function createButtons (allworks){      // PARCOURS LE TABLEAU ET RECUPERE LE NOM ET CRER LE BUTON
                
    /* CREATION BOUTON */
const menuCategories = document.createElement("nav");
const buttonTous = document.createElement("button");
      buttonTous.innerText = "Tous";
      buttonTous.classList.add("button-tous");   // AJOUT DE LA CLASSE
    buttonTous.addEventListener("click", function(){
        genererImage(allworks);
    });
    menuCategories.appendChild(buttonTous);
    

    const uniqueCategorie = new Set();      // NOUVEAU TABLEAU QUI EVITE LES DOUBLONS
    const tableauUnique = [];

        allworks.forEach(unique =>{                  // PARCOURS LE TABLEAU ET RECUPERE L'ID 
        if (!uniqueCategorie.has(unique.category.id)){
            uniqueCategorie.add(unique.category.id);
            tableauUnique.push(unique.category);
        };
        });   
    tableauUnique.forEach(element =>{
        const buttons = document.createElement("button");
              buttons.innerText = element.name;
              buttons.dataset.id = element.id;    // On stocke l’ID dans un attribut HTML (data-id)
              buttons.classList.add("my-buttons");    // AJOUT DE LA CLASSE
        buttons.addEventListener("click", function(){
            const idClique = parseInt(buttons.dataset.id);
            const filtres = allworks.filter(imagesFiltrées => imagesFiltrées.category.id === idClique);
        genererImage(filtres);
        })      
        menuCategories.appendChild(buttons);
        menuCategories.classList.add("menu-categories");
    });
    console.log(tableauUnique);
   // gallery.appendChild(menuCategories);
   gallery.parentNode.insertBefore(menuCategories,gallery);
};

/********************  CREATION BOUTON MODIFIER  ********************/

 function boutonModifier (){

    const recupH2= document.querySelector("#portfolio h2");

    const modifDiv = document.createElement("div");
          modifDiv.classList.add("div-modifier")

    const icone = document.createElement("i");
          icone.classList.add("fa-solid", "fa-pen-to-square"); 

          modifBouton = document.createElement("button");
          modifBouton.innerText = "modifier";
          modifBouton.classList.add("texte-modifier");

    modifDiv.appendChild(icone);
    modifDiv.appendChild(modifBouton);
    recupH2.parentNode.insertBefore(modifDiv,recupH2.nextSibling);
};
/********************  CREATION HTML  ********************/

function genererImage(allworks){

    // VIDE LA GALLERIE 
gallery.innerHTML ="";

    for (let i = 0; i < allworks.length; i++){
        let figure = document.createElement("figure");
        let imageElement = document.createElement("img");
            imageElement.src = allworks[i].imageUrl;
        let figcaption = document.createElement("figcaption");
            figcaption.innerText = allworks[i].title ;

    // RATACHEMENT IMAGES 
        figure.appendChild(imageElement);
        figure.appendChild(figcaption);
    // RATTACHEMENT A LA DIV    
        gallery.appendChild(figure);
    }
};


    
  
/***************** REDIRECTION LORS DE LA DECONNEXION *****************/

document.addEventListener("DOMContentLoaded", () =>{
    const token = localStorage.getItem("token");
    const loginID = document.querySelector(".active");
    

    if(loginID){
    if(token){
    loginID.innerText = "logout";
    //navOff.style.display = "none";
}; 
     loginID.addEventListener("click", (event) =>{
    event.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "login.html";
});
    };
});

  /*  event.preventDefault();
    
    const recupModale = document.querySelector(".modale");
    recupModale.classList.add("active");
    recupModale.setAttribute("aria-hidden","false");
    recupModale.setAttribute("aria-modal","true");
    
    // AJOUT IMAGES A LA MODALE
    const divModale = document.querySelector(".modale-wrapper");
    const galerieModale = document.createElement("div");
          divModale.appendChild(galerieModale);

          genererImage(ecouteurBoutonModifier);
    
    console.log(recupModale);
});
}
}; */


/* VOIR DERNIERE PARTIE DE LA FONCTION BOUTON MODIFIER */

/***************** CREATION MODALE *****************/

function ecouteurBoutonModifier(){

    if(modifBouton){
     modifBouton.addEventListener("click", openModale);
};  
};

function openModale(event){

    event.preventDefault();

    const recupModale = document.querySelector(".modale")
  //  recupModale.setAttribute("aria-hidden","false");
    //recupModale.setAttribute("aria-modal","true");
    recupModale.classList.add("active");

    afficherImagesModale();
}; 

function afficherImagesModale(){
    
    const gallerieModale = document.querySelector(".galerie-modale");

    gallerieModale.innerHTML = "";

    allworks.forEach(w =>{
        let figuresModale =document.createElement("figure");
        let imagesModale = document.createElement("img");
            imagesModale.src = w.imageUrl;
        
            figuresModale.appendChild(imagesModale);
            gallerieModale.appendChild(figuresModale);
});
};