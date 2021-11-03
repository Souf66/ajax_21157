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

	$('#btn').click(function(){
		chercher();
	})

	//AUTRE API
	$('#chercher').click(function(){

		var saisi = $('#saisi').val();
					console.log(saisi)
	
			$.ajax({
	
				//url:"https://www.hatvp.fr/agora/opendata/agora_repertoire_opendata.json",
				//url:"https://entreprise.data.gouv.fr/api/sirene/v1/full_text/iknsa",
				url:"https://entreprise.data.gouv.fr/api/sirene/v1/full_text/"+saisi,
				dataType: "json",
				success:function (data) {
	
					$('.content, .carte').empty()
	
					$('.content').append('<h2> siren:' +data.etablissement[0].siren +'</h2>')
					$('.content').append('<h2> siret:' +data.etablissement[0].siret +'</h2>')
					$('.content').append('<h2> libelle_activite_principale:' +data.etablissement[0].libelle_activite_principale +'</h2>')
					$('.content').append('<h2> nom_raison_sociale:' +data.etablissement[0].nom_raison_sociale +'</h2>')
					$('.content').append('<h2> geo_adresse:' +data.etablissement[0].geo_adresse +'</h2>')
	
					var lal = data.etablissement[0].latitude
					var lon = data.etablissement[0].longitude
	
					$('.carte').append('<iframe src="https://maps.google.com/maps?q='+lal+','+lon+'&hl=en&z=14&amp;output=embed" width="100%" height="400" frameborder="0" style="border:0" allowfullscreen></iframe>')
				},
				error: function (status) {
					console.log(status);
				}
			})
	
		})
})


function chercher(){
	var ville = $('#ville').val();

	$.ajax({
		url:"http://api.openweathermap.org/data/2.5/weather?q="+ville+"&appid=77d38e0edc7edd19764dd85522053606",
		dataType:'json',
		success:function (data) {
			console.log(data);
			$('.city_name').empty();
			$('.city_name').append(data.name);
			$('.city_temp').text("Il fait "+(data.main.temp - 273).toFixed(1) +"degrés");

			icon_url = "http://openweathermap.org/img/w/" + data["weather"][0].icon +".png"

			$('.city_icon').html("<img src='"+icon_url+"' alt=icon>")


		},
		error:function (xhr) {
			console.log(xhr.status);
		}
	})
}