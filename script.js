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
            // PASSAGE A L'AUTRE MODALE
            const recupModale1 = document.querySelector(".modale1")
            const clickOuvertureModale2 = document.querySelector(".ajout-photo")
                  clickOuvertureModale2.addEventListener("click",() =>{
                    recupModale1.style.display ="none"
                    openModale2();
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

function openModale2(event){
      //   event.preventDefault();

         const recupModale2 = document.querySelector(".modale2");
               recupModale2.style.display = "block";
        
        const imageIcon = document.querySelector(".upload-image");
              imageIcon.classList.add("fa-regular", "fa-image");
              imageIcon.style.display = "block";
              imageIcon.innerText = "";
};

/***************** UPLOAD IMAGES MODALE 2  *****************/


const recupBoutonAjoutPhotos = document.querySelector(".upload-button"); 
      recupBoutonAjoutPhotos.addEventListener("click", ()=>{
        const recupInputFile = document.getElementById("new-photo");
              recupInputFile.click(); // OUVRE LE FICHIER INPUT=FILE
              
      })  

  
      async function loadCategories(){

        const recupCategForm = document.querySelector(".categorie")

            // RECUPERATION DYNAMIQUEMENT DES CATEGORIES

        const reponseCateg = await fetch("http://localhost:5678/api/categories");
        const TakeCateg = await reponseCateg.json();         
            
        TakeCateg.forEach(cat =>{
            const option = document.createElement("option");
                  option.value = cat.id;
                  option.innerText = cat.name;
            recupCategForm.appendChild(option);
        });
    }
    loadCategories();

        const formValid = document.querySelector(".form-ajout-photos")
              formValid.addEventListener("submit", sendForm)
    
        async function sendForm(event){

            event.preventDefault();

            // RECUPERE LES ELEMENTS CHARGEES SUR L'INPUT
        const fichier = document.getElementById("new-photo").files[0];
        
          const recupTitleForm = document.querySelector(".titre")
          const recupCategForm = document.querySelector(".categorie")

            
        const formData = new FormData();
              formData.append("image", fichier)
              formData.append("title", recupTitleForm.value )
              formData.append("category", parseInt(recupCategForm.value) )

            try{
              const token =   localStorage.getItem("token")
              console.log("TOKEN:", token);
      if( fichier && recupCategForm.value.trim() !== "" && recupTitleForm.value.trim() !== "" ){
            const sendData = await fetch("http://localhost:5678/api/works",{
                method : "POST",
                headers :{"accept": "application/json",
                      "Authorization": `Bearer ${token}` // token obligatoire !!
                },
          //    headers :'Content-Type: multipart/form-data', PEUT ETRE NE PAS L'UTILISER ? (VOIR DOC MDN FORMDATA)
                body : formData
        }) 
        

        if(sendData.ok){
            const newWork = await sendData.json()

            const newFigure = document.createElement("figure");
            const newImage = document.createElement("img");
                  newImage.src = newWork.imageUrl
            const newFigCatption = document.createElement("figcaption");
                  newFigCatption.innerText = newWork.title;

            const recupModale2 = document.querySelector(".modale2" )
                  recupModale2.prepend(newFigure);
                  recupModale2.style.display ="none"
            
            const fermModale = document.querySelector(".modale" )
                  fermModale.style.display="none"
                  
            genererImage(newWork);
            afficherImagesModale(newWork);
            
            formValid.reset();
        // Optionnel : feedback visuel sur le bouton
        const buttonValid = document.querySelector(".form-valide")
        buttonValid.style.backgroundColor = "#1D6154";
            
        }   
        }
        else{
            alert("Les champs ne sont pas correctement remplis")
        }
    } catch (error){
        alert ("Erreur de connexion au serveur")
        console.log(error);
    }
}

/*
            const newFigure = document.createElement("figure");
            const newImage = document.createElement("img");
                  newImage.src = newWork.imageUrl
            const newFigCatption = document.createElement("figcaption");
                  newFigCatption.innerText = newWork.title;

            newFigure.appendChild(newImage);
            newFigure.appendChild(newFigCatption);
            gallery.prepend(newFigure)*/