<!-- Userposition.vue -->

<script>



export function userposition(map) {
    const position= console.log("ceci te donne ta position")

    const position2= console.log("ceci te donne ta position2")
    
 

  return {position, position2};
}
</script>

// Fonction pour mettre à jour l'état de capture d'un marqueur
const updateMarkerCaptured = (marker) => {
  const index = gamesStore.markers.findIndex((m) => m.name === marker.name)
  if (index !== -1) {
    gamesStore.markers[index].isCaptured = true
  }
}
      
      
      // Obtenir la position de l'utilisateur
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            // Ajouter un marqueur pour la position de l'utilisateur
            const userMarker = L.marker([latitude, longitude])
              .addTo(map)
              .bindPopup('Vous êtes ici!')
              .openPopup()
            // Stocker la référence du marqueur de l'utilisateur dans le store
            gamesStore.updateUserMarker(userMarker)
          },
          (error) => {
            console.error('Erreur de géolocalisation :', error.message)
          }
        )

        // Ajouter la fonctionnalité de suivi en temps réel de la position de l'utilisateur
        const watchUserPosition = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            // Mettre à jour la position du joueur dans le store
            gamesStore.updateUserPosition({ latitude, longitude })
            // Vérifiez si le marqueur de l'utilisateur existe déjà
            if (gamesStore.userMarker) {
              gamesStore.userMarker.setLatLng([latitude, longitude])
            } else {
              const userMarker = L.marker([latitude, longitude])
                .addTo(map)
                .bindPopup('Vous êtes ici!')
                .openPopup()
              gamesStore.updateUserMarker(userMarker)
            }

            // Vérifier la distance par rapport au point de départ
            const distanceToStart = calculateDistance(
              { latitude, longitude },
              gamesStore.startPoint.position
            )

            // Mettre à jour l'affichage du bouton "Start" en fonction de la distance
            if (distanceToStart <= 10) {
              showStartButton.value = true
            } else {
              showStartButton.value = false
            }

            // Mettre à jour les marqueurs capturés lorsque l'utilisateur est à moins de 10 mètres
            gamesStore.markers.forEach((marker) => {
              const distance = calculateDistance({ latitude, longitude }, marker.position)

              if (distance <= 5 && !marker.isCaptured) {
                marker.isCaptured = true
                marker.leafletMarker.setOpacity(0.4)
                const totalBalises = gamesStore.markers.length
                const balisesRestantes = gamesStore.markers.filter((m) => !m.isCaptured).length
                const balisesPrises = totalBalises - balisesRestantes
                const message = `Vous avez récupéré ${balisesPrises}/${totalBalises} balise(s). ${balisesRestantes} balise(s) restante(s).`
                alert(message)
                updateMarkerCaptured(marker) // Mettre à jour l'état de capture du marqueur
              }
            })
          },
          (error) => {
            console.error('Erreur de géolocalisation :', error.message)
          },
          {
            enableHighAccuracy: true, // Activer une haute précision de la géolocalisation
            maximumAge: 0 // Ne pas utiliser de position mise en cache
          }
        )
      } else {
        console.error("La géolocalisation n'est pas prise en charge par ce navigateur.")
      } -->
