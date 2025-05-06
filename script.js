let gallery = document.querySelector(".gallery");
let allworks = [];


async function recupWorks (){
    try{
    const reponse = await fetch("http://localhost:5678/api/works");
        allworks = await reponse.json();
        console.log(allworks);
    } catch{
        console.log("Les données n'ont pas pu être récupérées");
    }
    
    genererImage(allworks);
    createButtons(allworks);

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
    console.log(buttonTous);

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


    
                                                /*const buttonObjets = document.createElement("button");
                                                    buttonObjets.innerText = "Objets";
                                                const buttonObjets = document.createElement("button");
                                                    buttonApparts.innerText = "Appartements";
                                                const buttonObjets = document.createElement("button");
                                                    buttonHotels.innerText = "Hôtels & Restaurants";
                                                */
                                                // OU 


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


    

    let formConfirmation = document.querySelector("form");

    
    formConfirmation.addEventListener("submit", async (event) =>{

        event.preventDefault();  // EMPECHE LE RECHARGEMENT DE LA PAGE

        const emailVide = document.querySelector(".email").value.trim();
        const mdpVide = document.querySelector(".mot-de-passe").value.trim();

        if(emailVide === "" || mdpVide === ""){

            if (!document.querySelector(".error-message")){ // VERIFIE SI IL N'Y A PAS DE MESSAGE D'ERREUR DEJA CREES
            const messageErreur = document.createElement("p");
            messageErreur.innerText = "Le champ est vide";
            document.body.appendChild(messageErreur);
            }
            return // STOPPE LA FONCTION SI LES CHAMPS SONT VIDES
        };

        const donnees = {
            email : document.querySelector(".email").value, // RECUPERE VALEURS DU CHAMPS EMAIL
            password : document.querySelector(".mot-de-passe").value,// RECUPERE VALEURS DU CHAMPS MDP
        };
        const chargeUtile = JSON.stringify(donnees);
        try{
        const reponseForm = await fetch("http://localhost:5678/api/users/login",{
            method : "POST",
            body : chargeUtile,
            headers : {"Content-type" : "application/json"}
        });
        console.log(reponseForm);
        const dataForm = await reponseForm.json();
        console.log(dataForm);

        if(reponseForm.ok){
            localStorage.setItem("token",dataForm.token); // RECUPERE LE TOKEN 
            window.location.href = "index.html"; // REDIRECTION VERS LA PAGE D ACCUEIL
        }else {
            throw new Error("Erreur dans l’identifiant ou le mot de passe");
        }
        }catch(error){
            const errorMessage = document.createElement("p"); // CREATION MESSAGE D ERREUR
            errorMessage.classList.add("error-message");
            errorMessage.innerText = error.message;
            document.body.appendChild(errorMessage);
    }        
    });
     
    /*function veriForm(){
            if(reponseForm.ok){
                localStorage.setItem("token",dataForm.token); // RECUPERE LE TOKEN 
                window.location.href = "index.html"; // REDIRECTION VERS LA PAGE D ACCUEIL
            }else{
                const errorMessage = document.createElement("p"); // CREATION MESSAGE D ERREUR
                errorMessage.classList.add("error-message");
                errorMessage.innerText = "Erreur dans l’identifiant ou le mot de passe"
                document.body.appendChild(errorMessage);
            }
      };
*/

