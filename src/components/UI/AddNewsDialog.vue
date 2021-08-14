<template>
  <div class="container" @click="$emit('closeDialog')"></div>
  <dialog open>
    <header>
      <h2>{{ newsTitle }}</h2>
      <i class="fas fa-times" @click="$emit('closeDialog')"></i>
    </header>
    <section>
      <form @submit.prevent="handleSubmit">
        <div class="form-control">
          <label for="title">Naslov</label>
          <input type="text" id="title" name="title" v-model="title">
          <div class="error">{{ fileError }}</div>
        </div>
        <div class="form-control">
          <label for="description">Opis</label>
          <input type="text" id="description" name="description" v-model="description">
          <div class="error">{{ fileError }}</div>
        </div>
        <div class="form-control">
          <p class="image-label">Slika</p>
          <label for="image"><i class="fas fa-upload"></i>Dodaj sliku</label>
          <input type="file" id="image" @change="handleChange" placeholder="Dodaj sliku">
        </div>
        <button class="create__button">Kreiraj</button>
        <button class="cancel__button" @click="$emit('closeDialog')">Odustani</button>
      </form>
    </section>
  </dialog>
</template>

<script>
import { ref } from 'vue'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'

export default {
  emits: ['closeDialog'],
  props: ['newsTitle'],
  setup(props, context) {
    const { error, addDoc } = useCollection('news')
    const { user } = getUser()

    const title  = ref('')
    const description = ref('')
    const fileError = ref(null)
    const isPending = ref(false)
    
    const handleSubmit = async () => {
      isPending.value = true
      if(title.value !== '' && description.value !== '') {
        fileError.value = null;
        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          // userName: user.value.displayName,
          // coverUrl: url.value,
          // filePath: filePath.value, // so we can delete it later
          createdAt: timestamp()
        })
        location.reload();
        isPending.value = false
        if (!error.value) {
          context.emit('closeDialog');
        }
        console.log(res.id);
      } else {
        fileError.value = 'Ovo polje mora biti popunjeno'
      }
    }

    return { title, description, handleSubmit, isPending, fileError }
  }
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
  top: 15vh;
  left: 10%;
  width: 60%;
  z-index: 100;
  border-radius: .7rem;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 3rem 2rem;
  margin: 0;
  overflow: hidden;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
}

.fa-times {
  font-size: 3.2rem;
  color: rgb(128, 127, 127);
  -webkit-text-stroke: 2px white;
  cursor: pointer;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

.form-control {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2rem;
}

label,
.image-label {
  font-weight: 500;
  margin-bottom: .8rem;
}

input {
  width: 100%;
  padding: 1.2rem 2rem;
  border: 2px solid #78acea;
  border-radius: 5px;
}

input[type="file"] {
  display: none;
}

label[for="image"] {
  color: #4a5568;
  font-size: 1.6rem;
  border: 2px solid #d0d3d8;
  border-radius: 5px;
  width: 35%;
  padding: 1.2rem 2rem;
  cursor: pointer;
}

.fa-upload {
  margin-right: 1.5rem;
}

input:focus {
  outline: none;
}

button {
  border-radius: .5rem;
  padding: 1.2rem 1.8rem;
}

.create__button {
  background-color: #ffb81c;
  margin-right: 2rem;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 25rem);
    width: 50rem;
  }
}
</style>
