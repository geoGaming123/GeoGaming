<script setup>
import HeaderComp from '@/components/HeaderComp.vue';


</script>

<template>
  <main>
    <HeaderComp></HeaderComp>
    <section class="profileInfo">
      <h1>Edition du profil</h1>
      <p>Modifier votre avatar ou votre nom d'utilisateur</p>
    </section>
    <hr>
    <div class="form">
      <form>
        <section class="profilePicture">
          <div class="profilePictureLeft">
            <h2>Photo de profil</h2>
            <p>(Recommandé 300x300)</p>
            <button>Changer</button>
          </div>
          <div class="profilePictureImg">
            <img src="" alt="Ma photo">
          </div>
        </section>
        <section class="profilePseudo">
          <label for="pseudo">Pseudo</label><br>
          <input id="pseudo" type="text"> 
        </section>
        <section class="profileSave">
          <button class="save">Sauvegarder</button>
        </section>
      </form>
    </div>
  </main>
</template>

<style scoped>

.profileInfo {
  margin-block: 2rem;
}
.form {
  display: flex;
  width: 100%;
}
form {
  width: 100%;
}
.profilePicture {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-block: 4rem;
}
button {
  padding: 1rem;
  border: 1px solid orange;
  background-color: orange;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 15px;
}
#pseudo {
  width: 50%;
  padding: 1rem;
  background-color: #f1f1f153;
  border: 1px solid #eaeaea;
  border-radius: 15px;
}
.profileSave {
  width: 100%;
}
.save {
  width: 300px;
  position: absolute;
  bottom: 50px;
  left: calc(50% - 150px) ;
}
.profilePictureImg {

}

</style>