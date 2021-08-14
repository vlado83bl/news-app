<template>
  <div class="container" @click="$emit('closeDialog')"></div>
  <dialog open>
    <div class="dialog__icon">
      <div class="dialog__icon--item">
        <i class="far fa-trash-alt"></i>
      </div>
    </div>
    <div class="dialog__content">
      <h2 class="dialog__content--header">{{ title }}</h2>
      <p class="dialog__content--text">Da li ste sigurni da zelite da obrisete vijest? Kada se jednom obrise vise se ne moze povratiti.</p>
      <div class="dialog__content--buttons">
        <button class="delete__button" @click="$emit('deleteDocument')">Obrisi</button>
        <button class="cancel__button" @click="$emit('closeDialog')">Odustani</button>
      </div>
    </div>
  </dialog>
</template>

<script>

export default {
  emits: ['closeDialog', 'deleteDocument'],
  props: ['title', 'newsItem']
};
</script>

<style scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem 0 4rem 0;
  margin: 0;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
}

.dialog__icon {
  margin: 1rem 2rem;
  flex: 0 0 7%
}

.dialog__icon--item {
  background-color: #ffeded;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
}

.fa-trash-alt {
  color: #e12d39;
  font-weight: 800;
  font-size: 1.8rem;
}

.dialog__content {
  flex: 1;
}

.dialog__content--text {
  color: #687181;
  line-height: 2.4rem;
  font-size: 1.6rem;
  padding-right: 2rem;
}

.delete__button {
  background-color: #e12d39;
  padding: 1.4rem 2rem;
  margin-right: 1rem;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 30rem);
    width: 60rem;
  }
}
</style>
