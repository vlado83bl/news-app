<template>
  <div v-if="newsItem.title.toLowerCase().trim().includes(filterWord) || newsItem.title.includes(filterWord)">
    <delete-news-dialog v-if="deleteDialogShown" title="Brisanje novosti" @closeDialog="cancelDeleteConfirm" @deleteDocument="confirmDelete" :newsItem="newsItem">
    </delete-news-dialog>
    <edit-news-dialog v-if="editDialogShown" newsTitle="Izmijeni vijest" @closeDialog="cancelEditConfirm" @documentEdited="confirmEdit" :newsItem="newsItem">
    </edit-news-dialog>
    <div class="news-item__image">
      <img src="@/assets/images/test_image.jpg" alt="news image">
      <i class="fas fa-pen" @click="showEditDialog"></i>
      <i class="fas fa-trash" @click="showDeleteDialog"></i>
    </div>
    <p class="news-item__date">{{ newsItem.createdAt.toDate().getDate() }}.{{ newsItem.createdAt.toDate().getMonth() + 1 }}.{{ newsItem.createdAt.toDate().getFullYear() }}.  </p>
    <h2 class="news-item__heading">{{ newsItem.title }}</h2>
    <p class="news-item__text">{{ newsItem.description.substring(0,80) + '...' }}</p>
  </div>
</template>

<script>
  import DeleteNewsDialog from '@/components/UI/DeleteNewsDialog.vue';
  import EditNewsDialog from '@/components/UI/EditNewsDialog.vue';
  import useDocument from '@/composables/useDocument'
  import { ref } from 'vue';

  export default {
    props: ['newsItem', 'filterWord'],
    components: {
      DeleteNewsDialog,
      EditNewsDialog
    },
    setup(props) {
      const { deleteDoc, updateDoc } = useDocument('news', props.newsItem.id)

      const editDialogShown = ref(false);
      const deleteDialogShown = ref(false);
      const deleteConfirmed = ref(false);
      const editConfirmed = ref(false);
      // const editedValue = ref(null);
      
      const confirmDelete = async () => {
        deleteConfirmed.value = true;
        deleteDialogShown.value = false;
        await deleteDoc();
        location.reload();
      }

      const confirmEdit = async (payload) => {
        editConfirmed.value = true;
        editDialogShown.value = false;
        await updateDoc(payload);
        console.log(payload);
        location.reload();
      }

      const showEditDialog = () => {
        editDialogShown.value = true;
      }

      const showDeleteDialog = (e) => {
        deleteDialogShown.value = true;
      }

      const cancelEditConfirm = () => {
        editDialogShown.value = false;
      }

      const cancelDeleteConfirm = () => {
        deleteDialogShown.value = false;
      }

      return { editDialogShown, deleteDialogShown, showEditDialog, showDeleteDialog, cancelEditConfirm, cancelDeleteConfirm, confirmDelete, confirmEdit, editConfirmed }
    }
  }
</script>

<style scoped>
  .news-item__image {
    position: relative;
  }
  .news-item__heading {
    font-size: 1.6rem;
    margin-top: 0.5rem;
  }

  .fas {
    color: #fff;
    cursor: pointer;
  }

  .fa-pen,
  .fa-trash {
    position: absolute;
    top: 2rem;
  }

  .fa-pen {
    right: 4rem;
  }

  .fa-trash {
    right: 1.5rem;
  }

  .news-item__date {
    color: #ababab;
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 0;
  }

  .news-item__image img {
    width: 100%;
    height: auto;
  }
</style>