// affichage du bouton d'installation
const switchInstallBtn = () => {

  const installBtn = document.querySelector('.install-btn')
  let deferredPrompt
  
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault()
    deferredPrompt = event
    installBtn.classList.remove('hidden')
  })
  
  installBtn.addEventListener('click', event => {
    event.preventDefault()
     installBtn.classList.add('hidden')
    deferredPrompt.prompt()
   
    deferredPrompt.userChoice.then(choice => {
      if(choice === 'accepted') {
        
      }
      else {
      }
      deferredPrompt = null
    })
  })
}

export {switchInstallBtn}