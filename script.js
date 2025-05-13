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
        bandeNoirePageAccueil();
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

/************ CREATTION BANDE NOIRE ****************/
function bandeNoirePageAccueil(){

    const token2 = localStorage.getItem("token");
    
    if(token2){
        try{
    const bandeNoire = document.querySelector(".bande-noire");
          bandeNoire.style.display =  "block";
          document.querySelector(".bande-noire").style.display = "flex";

    const icone = document.createElement("i");
          icone.classList.add("fa-solid", "fa-pen-to-square");
    const buttonEdition = document.createElement("p");
          buttonEdition.innerText = "mode édition" ;


    bandeNoire.appendChild(icone);
    bandeNoire.appendChild(buttonEdition);
        }
        catch{
            console.log(error)
        }
}
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

 

/* VOIR DERNIERE PARTIE DE LA FONCTION BOUTON MODIFIER */

/***************** CREATION MODALE *****************/

function ecouteurBoutonModifier(){

    if(modifBouton){
     modifBouton.addEventListener("click", openModale);
};  
};
/************ FONCTION OUVERTURE MODALE *************/
function openModale(event){

    event.preventDefault();

    const recupModale = document.querySelector(".modale")
    recupModale.setAttribute("aria-hidden","false");
    recupModale.setAttribute("aria-modal","true");
    recupModale.classList.add("active");

    afficherImagesModale();
    recupModale.addEventListener("click", function (event){                       //  OU // NE PAS fermer la modale si on clique dans la modale-wrapper + recuperer .modale-wrapper
        if(event.target === recupModale)                                          // modaleWrapper.addEventListener("click", function (event{ modaleWrapper.stopPoropagation()}))
            closeModale(); // FERME LA MODALE QUAND JE CLICK SUR ELLE      
        }); 
    }


function afficherImagesModale(){
    
    const gallerieModale = document.querySelector(".galerie-modale");

    gallerieModale.innerHTML = "";

    allworks.forEach(w =>{
        let figuresModale =document.createElement("figure");
        let imagesModale = document.createElement("img");
            imagesModale.src = w.imageUrl;
        
            figuresModale.appendChild(imagesModale);
            

        const iconeTrash = document.createElement("i");
              iconeTrash.classList.add("fa-solid", "fa-trash-can");
        figuresModale.appendChild(iconeTrash);

        gallerieModale.appendChild(figuresModale);

        //SUPRESSION IMAGES
    iconeTrash.addEventListener("click", () => deleteWorks(w.id));
});
};

/**************** CLICK FERMETURE MODALE  ******************/
const closeButton = document.querySelector(".sortir-modale");
      closeButton.classList.add("fa-solid", "fa-xmark");
              closeButton.addEventListener("click", closeModale);

/**************** FONCTION FERMETURE MODALE  ******************/

function closeModale (){

                const sortirModale = document.querySelector(".modale.active");
                

                // RENVOYER LE FOCUS EN DEHORS DE LA MODALE 
                const retourFocus = document.querySelector(".retour-focus")
                if(retourFocus){
                    retourFocus.focus();
                }
                // FOCUS RENVOYE APRES 10 SEC 
                    setTimeout(() => {
                        sortirModale.classList.remove("active");
                        sortirModale.setAttribute("aria-hidden","true");
                        sortirModale.removeAttribute("aria-modal");
                    }, 10);
                
};

/************ FONCTION SUPPRIMER TRAVAUX ***********/


async function deleteWorks (id){

            const token = localStorage.getItem("token");
console.log(token);
            if(token)
                try{
                    const fetchDelete = await fetch(`http://localhost:5678/api/works/${id}`,{
                        method : "DELETE",
                         headers :{
                            "accept" : "*/*",
                            "Authorization" : `Bearer ${token}` 
                         } 
                       })
                       if(fetchDelete.ok){
                        allworks = allworks.filter(w => w.id !== id)
                    };
                    afficherImagesModale();
                    genererImage(allworks);
                } catch{
                        console.log(error);
                }
};



















/*async function deleteWorks(id){

            const token = localStorage.getItem("token");
            try{
            const fetchDelete = await fetch(`http://localhost:5678/api/works/${id}`,{
                method : "DELETE",
                headers : { "accept": "*/
 //        });
     /*      if(fetchDelete.ok){
                allworks = allworks.filter( WorksSupprimés => WorksSupprimés.id !== id )
            };
            
            afficherImagesModale();
            genererImage(allworks);
            } catch{
                console.error("L'image n'a pas été supprimer");
    
}
};*/








/************ FONCTION AJOUT TRAVAUX ************/

/*const buttonAjoutPhotos = document.querySelector(".ajout-photo");
    buttonAjoutPhotos.addEventListener("click",)*/
    