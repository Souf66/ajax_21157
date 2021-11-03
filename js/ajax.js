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

	//************ JSON ******** */
	$.ajax({
		url:"js/stagiaire.json",
		dataType:"json",
		success:function(data){

			var style = "<ul>";
			for (var i = 0; i < data.stagiaire.length; i++) {
				var nom_stagiaire = data.stagiaire[i].nom;
				var prenom_stagiaire = data.stagiaire[i].prenom;
				
				style += "<li>";
				style += nom_stagiaire+"  ";
				style += prenom_stagiaire +" ";
				style += data.stagiaire[i].email;

				style += "</li> ";
			}
			style += "</ul>";
			
			$('p').empty();
			if($('p ul ').length >= 1){
				
				$('p ul').empty();
			}
			$('p').append(style);
		},
		error:function(xhr) {
			console.log(xhr)
		}
	})
	//--------------------------------------------------------------

	$.ajax({
		url:"js/etudiant.json",
		dataType:"json",
		success:function (data) {
			$('.liste-etudiants-admis').empty();
			$('.liste-etudiants-non-admis').empty();
			for (var i = 0; i < data.etudiants.length; i++) {
				
				if (data.etudiants[i].moyenne >= 10) {
					var admis = "<ul class='list-group'>";
					admis +=" <li class='list-group-item d-flex justify-content-between align-items-center'>";
					admis += data.etudiants[i].prenom + " " +data.etudiants[i].nom;
					admis += "<span class='badge bg-primary rounded-pill'>";
					admis += data.etudiants[i].moyenne;
					admis += "</span> </li></ul>";


					
					$('.liste-etudiants-admis').append(admis);
				}
				else{
					var admis = "<ul class='list-group'>";
					admis +=" <li class='list-group-item d-flex justify-content-between align-items-center'>";
					admis += data.etudiants[i].prenom + " " +data.etudiants[i].nom;
					admis += "<span class='badge bg-primary rounded-pill'>";
					admis += data.etudiants[i].moyenne;
					admis += "</span> </li></ul>";


					$('.liste-etudiants-non-admis').append(admis);

				}
			}
		},
		error:function (xhr) {
			console.log(xhr.status)

			if(xhr.status == 404 ){
				$('.liste-etudiants-admis, .liste-etudiants-non-admis').hide();
				$('.liste').html('<img src="https://fab404.com/wp-content/uploads/2009/06/simpsoncrazy404.jpg">');
			}
		}
	})
})