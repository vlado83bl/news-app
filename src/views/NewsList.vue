<template>
  <div class="main-container">
    <add-news-dialog v-if="dialogShown" newsTitle="Nova vijest" @closeDialog="cancelConfirm">
    </add-news-dialog>
    <div class="news__bar">
      <div style="display: flex; align-items: center;">
        <p class="news__bar--heading">Vijesti</p>
        <input type="text" class="news__bar--input" placeholder="Pretrazi vijest" v-model="filterWord">
      </div>
      <button class="news__bar--button" @click="showDialog">Dodaj vijest</button>
      <button @click="handleClick" class="logout__button">Logout</button>
    </div>
    <div class="news__container">
      <NewsItems :newsItems="newsItems" :filterWord="filterWord" />
    </div>
  </div>
</template>

<script>
  import getUser from '../composables/getUser'
  import useLogout from '../composables/useLogout'
  import NewsItems from '@/components/NewsItems.vue';
  import AddNewsDialog from '@/components/UI/AddNewsDialog.vue';
  import getCollection from '@/composables/getCollection';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'
  
  export default {
    components: {
      NewsItems,
      AddNewsDialog
    },
    setup() {
      const { user } = getUser()
      const { logout } = useLogout()
      const router = useRouter()
      const { error, documents } = getCollection('news')

      const dialogShown = ref(false);

      const newsItems = ref(documents);

      const filterWord = ref('');

      const handleClick = async () => {
        await logout()
        console.log('logged out')
        router.push({ name: 'Home' })
        location.reload();
      }
      
      const showDialog = () => {
        dialogShown.value = true;
      }

      const cancelConfirm = () => {
        dialogShown.value = false;
      }

      return { dialogShown, showDialog, cancelConfirm, error, documents, filterWord, newsItems, handleClick }
    }
  }
</script>

<style scoped>
.main-container {
  max-width: 102.4rem;
  margin: 8rem auto;
}

.news__bar {
  display: flex;
  align-items: center;
}

.news__bar--heading {
  font-size: 3.2rem;
  font-weight: 700;
  margin-right: 3rem;
  color: #000;
}

.news__bar--input {
  border: .1rem solid #dfe4eb;
  border-radius: .5rem;
  padding: 1.2rem 1.8rem;
  margin-bottom: 0;
}

.logout__button {
  background-color: rgb(218, 40, 40);
  margin-left: 2rem;
}

.news__bar--button {
  margin-left: auto;
  background-color: #dd6b1f;
  padding: 1.2rem 2.8rem;
}

.news__container {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.news__container > * {
  margin-right: 2rem;
}

</style>