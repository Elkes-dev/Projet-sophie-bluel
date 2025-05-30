let gallery = document.querySelector(".gallery");
let allworks = [];
let modifBouton;
let recupH2;

/*********** FONCTION RECUPERE LES WORKS ************/

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
    const recupNav = document.getElementById("portfolio");
          recupNav.style.display="block";
    const header = document.querySelector("header");
          header.style.marginTop = "30px";
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

function createButtons (allworks){      // PARCOURS LE TABLEAU ET RECUPERE LE NOM ET CRER LE BOUTON
                
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
              buttons.classList.add("my-buttons");    // AJOUT DE LA CLASSE CSS
        buttons.addEventListener("click", function(){

              // Réinitialise le style de tous les boutons
        const allButtons = menuCategories.querySelectorAll("button");
              allButtons.forEach(btn => {
              btn.style.backgroundColor = "white";
              btn.style.color = "#1D6154";
        });

        this.style.backgroundColor = "#1D6154";
        this.style.color = "white";

            const idClique = parseInt(buttons.dataset.id);
            const filtres = allworks.filter(imagesFiltrées => imagesFiltrées.category.id === idClique);
        genererImage(filtres);
        })      
        menuCategories.appendChild(buttons);
        menuCategories.classList.add("menu-categories");
    });
  
   gallery.parentNode.insertBefore(menuCategories,gallery);
};

/********************  CREATION BOUTON MODIFIER  ********************/

 function boutonModifier (){
    
    // VERIFIE SI LE BOUTON EXISTE DEJA 

    if (document.querySelector(".div-modifier")) return

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
          const dejaPresent = bandeNoire.querySelector("p.mode-edition");
if (dejaPresent) return

    const icone = document.createElement("i");
          icone.classList.add("fa-solid", "fa-pen-to-square");
    const buttonEdition = document.createElement("p");
          buttonEdition.innerText = "mode édition" ;
          buttonEdition.classList.add("mode-edition"); 


    bandeNoire.appendChild(icone);
    bandeNoire.appendChild(buttonEdition);
        }
        catch (error){
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
}; 
     loginID.addEventListener("click", (event) =>{
    event.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "login.html";
});
    };
});



/***************** CREATION MODALE *****************/

function ecouteurBoutonModifier(){

    if(modifBouton){
     modifBouton.addEventListener("click", openModale);
};  
};
/************ FONCTION OUVERTURE MODALE *************/
function openModale(event){

    if (event) event.preventDefault(); 

    const recupModale = document.querySelector(".modale")
    recupModale.setAttribute("aria-hidden","false");
    recupModale.setAttribute("aria-modal","true");
    recupModale.classList.add("active");


    const recupModale1 = document.querySelector(".modale1")
    const recupModale2 = document.querySelector(".modale2")
     recupModale1.style.display = "block";
     recupModale2.style.display = "none";

    afficherImagesModale();
    recupModale.addEventListener("click", function (event){                     
        if(event.target === recupModale)                                        
            closeModale(); // FERME LA MODALE QUAND JE CLICK SUR ELLE      
        }); 
            // PASSAGE A L'AUTRE MODALE
            
            const clickOuvertureModale2 = document.querySelector(".ajout-photo")
                  clickOuvertureModale2.addEventListener("click",() =>{
                    recupModale1.style.display ="none"
                    openModale2();
                  })
    }

/*************** FONCTION AFFFICHAGE DE LA MODALE **************/
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
const closeButton = document.querySelector(".sortir-modale1");
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

                    document.querySelector(".modale1").style.display = "block";
                    document.querySelector(".modale2").style.display = "none";

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

/************** FONCTION OUVERTURE MODALE 2**************/

function openModale2(event){
      //   event.preventDefault();

         const recupModale2 = document.querySelector(".modale2");
               recupModale2.style.display = "block";

        const imageIcon = document.querySelector(".upload-image");
              imageIcon.classList.add("fa-regular", "fa-image");
              imageIcon.style.display = "block";
              imageIcon.innerText = "";           

};
/***************** RETOUR MODALE1 - FERMETURE MODALE2 *******************/
document.addEventListener("DOMContentLoaded", () => {
  const closeModale2 = document.querySelector(".sortir-modale2");
        closeModale2.classList.add("fa-solid", "fa-xmark");
  const arrow = document.querySelector(".retour-modale1");
        arrow.classList.add("fa-solid", "fa-arrow-left");

});
document.addEventListener("DOMContentLoaded", () => {
  const closeModale2 = document.querySelector(".sortir-modale2");
  const arrow = document.querySelector(".retour-modale1");
  const modale1 = document.querySelector(".modale1");
  const modale2 = document.querySelector(".modale2");
  const modale = document.querySelector(".modale");

  // Flèche : revient à modale1
  arrow?.addEventListener("click", () => {
    modale2.style.display = "none";
    modale1.style.display = "block"; 
  });

  // Croix : ferme les modales
  closeModale2?.addEventListener("click", () => {
    modale2.style.display = "none";
    modale1.style.display = "none";
    modale.setAttribute("aria-hidden","true");
    modale.removeAttribute("aria-modal");
    modale.classList.remove("active"); 
  });
});
 

/***************** UPLOAD IMAGES MODALE 2  *****************/


const recupBoutonAjoutPhotos = document.querySelector(".upload-button"); 
      recupBoutonAjoutPhotos.addEventListener("click", ()=>{
        const recupInputFile = document.getElementById("new-photo");
              recupInputFile.click(); // OUVRE LE FICHIER INPUT=FILE             
      })  

/*****************  AFFICHAGE DE L'IMAGE DANS LA MODALE 2 *****************/

      const fileRecup = document.getElementById("new-photo")    
            fileRecup.addEventListener("change",function(event) {
            
            const file = event.target.files[0];

                // TYPE DE FORMATS AUTORISEES 
            const formatsValides = ["image/png", "image/jpeg"]
                  if(!formatsValides.includes(file.type)){
                        alert("LE FORMAT DU FICHIER N'EST PAS VALIDE");
                    event.target.value="";
                    return;
                  }
                // TAILLE DU FORMAT AUTORISEE
            const maxSize = 4 * 1024 *1024;
                  if(file.size > maxSize){
                      alert("LA TAILLE DU FICHIER DEPASSE LA LIMITE AUTORISEE");
                      event.target.value="";
                      return;
                  }
            if(file){
               const imgRecupUrl = document.getElementById("image-pre-envoie");
                     imgRecupUrl.src = URL.createObjectURL(file)
                     imgRecupUrl.style.display = "block"; 

                     imgRecupUrl.onload = ()=>{
                        URL.revokeObjectURL(imgRecupUrl.src);
                    
                const recupUploadButton = document.querySelector(".upload-button");
                const recupFormatPhotos = document.querySelector(".format-photos");                        
                        recupUploadButton.style.display="none";
                        recupFormatPhotos.style.display="none";
                        console.log(file);
            };
            };
            });




/***************** FONCTION LOAD CATEGORIES  *****************/
  
      async function loadCategories(){

        const recupCategForm = document.querySelector(".categorie")
         //     recupCategForm.innerHTML='<option value=""></option>';

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


    // REND LE BOUTON VERT  APRES REMPLISSAGE FORMULAIRE
function validButton() {
  const file = document.getElementById("new-photo").files[0]; 
  const title = document.querySelector(".titre").value.trim(); 
  const cat = document.querySelector(".categorie").value; 

  // Si les 3 champs sont remplis, bouton vert, sinon gris
  document.querySelector(".form-valide").style.backgroundColor =
    file && title && cat ? "#1D6154" : "#A7A7A7";
}
document.getElementById("new-photo").addEventListener("change",validButton);
document.querySelector(".titre").addEventListener("input", validButton);
document.querySelector(".categorie").addEventListener("change", validButton);


 /***************  FONCTION ENVOIE FORMULAIRE DE MODALE    ***************/

 async function sendForm(event){

            event.preventDefault();

            // RECUPERE LES ELEMENTS CHARGEES SUR L'INPUT
        const fichier = document.getElementById("new-photo").files[0];

          const recupTitleForm = document.querySelector(".titre");
          const recupCategForm = document.querySelector(".categorie");
            
        const formData = new FormData();
              formData.append("image", fichier)
              formData.append("title", recupTitleForm.value )
              formData.append("category", parseInt(recupCategForm.value) )

            try{
              const token =   localStorage.getItem("token")
            console.log("Token utilisé :", token);
      if( fichier && recupCategForm.value.trim() !== "" && recupTitleForm.value.trim() !== "" ){
            const sendData = await fetch("http://localhost:5678/api/works",{
                method : "POST",
                headers :{"accept": "application/json",
                      "Authorization": `Bearer ${token}` 
                },
          //    headers :'Content-Type: multipart/form-data', PEUT ETRE NE PAS L'UTILISER ? (VOIR DOC MDN FORMDATA)
                body : formData
        }) 
        

        if(sendData.ok){
            const newWork = await sendData.json()

            const recupModale2 = document.querySelector(".modale2")
            recupModale2.style.display ="none"
            
          const recupModale1 = document.querySelector(".modale1")
                recupModale1.style.display = "block"
            
           // const fermModale = document.querySelector(".modale" )
             //     fermModale.style.display="none"

            await recupWorks();
            openModale();
            afficherImagesModale();
            
            const formValid = document.querySelector(".form-ajout-photos")
            formValid.reset();  
            reinitialisation()
        }   
        }
        else{
            alert("Les champs ne sont pas correctement remplis")
        }
    } catch (error){
        alert ("Erreur de connexion au serveur")
        console.log(error);
    }
};
// REINITIALISE LE FORMULAIRE 
function reinitialisation(){
    const imgsupprim = document.getElementById("image-pre-envoie");
    imgsupprim.src = "";
    imgsupprim.style.display = "none"; // cacher l’image vide

    const voirButton = document.querySelector(".upload-button");
    voirButton.style.display = "block";
    
    const formatPhotos = document.querySelector(".format-photos");
    formatPhotos.style.display = "block"; 

    document.getElementById("new-photo").value = "";

    document.querySelector(".form-valide").style.backgroundColor = "#A7A7A7";
}