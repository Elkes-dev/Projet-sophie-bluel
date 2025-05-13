    let formConfirmation = document.querySelector("form");

    formConfirmation.addEventListener("submit", async (event) =>{
        console.log("FORMULAIRE")
        event.preventDefault();  // EMPECHE LE RECHARGEMENT DE LA PAGE

        const emailVide = document.querySelector(".email").value.trim();
        const mdpVide = document.querySelector(".mot-de-passe").value.trim();
        const messageErreur = document.querySelector(".error-message");

        if(emailVide === "" || mdpVide === ""){

            if (!document.querySelector(".error-message")){ // VERIFIE SI IL N'Y A PAS DE MESSAGE D'ERREUR DEJA CREES
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
            messageErreur.innerText = "Erreur dans l’identifiant ou le mot de passe";
            messageErreur.style.display = "block";
        }
        }catch(error){
             // CREATION MESSAGE D ERREUR
            messageErreur.innerText =" Une Erreur est survenue";
            messageErreur.style.display = "block";
    }       
    });

   
       