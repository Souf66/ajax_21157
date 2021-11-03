$(document).ready(function () {
	// on selectionne le bouton id '#action' auquel on associe l'évènement 'click', 
	//pour chaque clique on execute la fonction anonyme 
    $(' ul li a').click(function () {
		 // $.ajax : fonction jquery permttant d'envoyer des requetes HTTP via l'objet XMLHTTPRequest
            // Les objets XMLHttpRequest (XHR) permettent d'interagir avec des serveurs. On peut récupérer des données à partir d'une URL sans avoir à rafraîchir complètement la page. Cela permet à une page web d'être mise à jour sans perturber les actions de l'utilisateur. XMLHttpRequest est beaucoup utilisé par l'approche AJAX.
		$.ajax({
			url:$(this).attr("href"), // URL de destination 
			dataType :"text",// type de données attendues
			cache:false, // Pour éviter la sauvegarde dans le memoire cache du navigateur
			
			// En cas de succés de requete AJAX, le resultat de la requete est stocké 
			//directement dans la variable de reception 'data' de la fonction anonyme
			// data contient la réposne de la requete AJAX 
			// Il y a toujours 2 requetes AJAX : une requete "Success" et  "Error"
			success:function(data){
				console.log(data);
                $('.container').empty()
				$('.container').append(data)
			},
			error:function (xhr) {
				//Ici on recupére directement le code d'erreur
				console.log(xhr.status);
			}
		})
        return false;
    })
})