<script setup>
import HeaderComp from '@/components/HeaderComp.vue';
</script>

<template>
  <main>
    <HeaderComp></HeaderComp>
    <div class="regles">

      <details>
        <summary>Règle 1 : Respect des autres joueurs</summary>
        <div>
          <p>Les participants doivent respecter les autres coureurs, éviter tout comportement antisportif et faire preuve de fair-play tout au long de la course.</p>
        </div>
      </details>
      
      <details>
        <summary>Règle 2 : Interdictions d'obstacles</summary>
        <div>
          <p>Il est interdit d'ajouter intentionnellement des obstacles sur le parcours pour gêner les autres participants.</p>
        </div>
      </details>
      
      <details>
        <summary>Règle 3 : Respect de l'environnement</summary>
        <div>
          <p>Les coureurs doivent respecter l'environnement et ne pas jeter de déchets sur le parcours.</p>
        </div>
      </details>
      
      <details>
        <summary>Règle 4 : Inscription honnête</summary>
        <div>
          <p>Les participants doivent fournir des informations d'inscription précises et ne peuvent pas usurper l'identité d'autres coureurs.</p>
        </div>
      </details>
      
      <details>
        <summary>Règle 5 : Suivre les consignes</summary>
        <div>
          <p>Si des consignes de partie ont été ajoutées par l'organisateur, merci de bien vouloir les suivre.</p>
        </div>
      </details>
      
      <p>Tout signalement d'un nom-respect du règlement pourra être suivi d'une exclusion de l'application.</p>

    </div>
      
  </main>
</template>

<style scoped>
  regles {
    padding-inline: 1rem;
  }
  details {
    padding-block: .5rem;
  }
</style>