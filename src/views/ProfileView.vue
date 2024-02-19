<script setup>
import HeaderComp from '@/components/HeaderComp.vue';


</script>

<template>
  <main>
    <HeaderComp></HeaderComp>
    <div class="profile">
      <section class="profile_Info">
        <h1>Edition du profil</h1>
        <p>Modifier votre avatar ou votre nom d'utilisateur</p>
      </section>
      <hr>
      <div class="profile_form">
        <form>
          <section class="profile_form_Picture">
            <div class="profile_form_Picture_Left">
              <h2>Photo de profil</h2>
              <p>(Recommandé 300x300)</p>
              <button>Changer</button>
            </div>
            <div class="profile_form_Picture_Img">
              <img src="" alt="Ma photo">
            </div>
          </section>
          <section class="profile_form_Pseudo">
            <label for="pseudo">Pseudo</label><br>
            <input id="pseudo" type="text"> 
          </section>
          <section class="profile_form_Save">
            <button class="profile_form_Save_btn">Sauvegarder</button>
          </section>
        </form>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>