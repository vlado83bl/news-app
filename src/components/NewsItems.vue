<template>
<div class="news-items">
  <NewsItem v-for="newsItem in sortedNewsItems" :key="newsItem" :newsItem="newsItem" :filterWord="filterWord" class="news-item" />
  <div ref="pagination" class="pagenumbers" id="pagination">PAGINATION</div>
</div>
</template>

<script>
  import NewsItem from '../components/NewsItem.vue';
  import getUser from '../composables/getUser';
  import { onMounted, ref } from 'vue';

  export default {
    props: ['newsItems', 'filterWord'],
    components: {
      NewsItem
    },
    setup(props) {
      const { user } = getUser();
      
      const sortedNewsItems = ref([]);
      const paginatedItems = ref([]);
      const pagination = ref(null);

      let currentPage = ref(1);
      let rows = ref(5);

      const displayPagination = () => {
        console.log(pagination.value)
        console.log(sortedNewsItems.value);
        let button = document.createElement('button');
        button.innerText = 'IHSBDVHIPB VHI BDF';
        pagination.value.appendChild(button);
      }

      const sortDocs = () => {
        const newsItems = [];
        for(let i = 0; i < props.newsItems.length; i++) {
          const newsItem = {
            title: props.newsItems[i].title,
            description: props.newsItems[i].description,
            createdAt: props.newsItems[i].createdAt,
            userId: props.newsItems[i].userId,
            id: props.newsItems[i].id
          }
          if(newsItem.userId === user.value.uid) {
            newsItems.push(newsItem);
          }
        }
        sortedNewsItems.value = newsItems.sort(function(a, b) {
          return b.createdAt - a.createdAt;
        })
      }

      sortDocs();

      const displayList = () => {
        currentPage.value--;
        let start = currentPage.value * rows.value;
        let end = start + rows.value;
        let paginatedItems = sortedNewsItems.value.slice(start, end);
        paginatedItems.value = paginatedItems;
        console.log(paginatedItems.value);
      }

      const setupPagination = () => {
        // pagination.value = null;
        let pageCount = Math.ceil(sortedNewsItems.value.length / rows.value);
        console.log(pageCount);
        console.log(pagination.value)
        for(let i = 0; i < pageCount; i++) {
          let btn = paginationButton(i, sortedNewsItems.value);
          console.log(pagination.value)
          // pagination.value.appendChild(btn);
          // document.getElementById('pagination').appendChild(btn);
          
        }
      }

      const paginationButton = (page, items) => {
        let button = document.createElement('button');
        button.innerText = page;

        if(currentPage.value == page) {
          button.classList.add('active');
        }

        button.addEventListener('click', () => {
          currentPage.value = page;
          displayList(items, rows.value, currentPage.value);

          let currentBtn = document.querySelector('.pagenumbers button.active');
		      currentBtn.classList.remove('active');

		      button.classList.add('active');
        })
      }

      onMounted(displayList);
      setupPagination();

      return { sortedNewsItems, sortDocs, paginatedItems, pagination, displayList, currentPage, rows, setupPagination, paginationButton, displayPagination }
    }
  }
</script>

<style scoped>
.active {
  background-color: red;
}
.news-items {
  display: flex;
  flex-wrap: wrap;
}
  .news-item {
    width: 15.65%;
    margin-right: 1rem;
    margin-bottom: 2rem;
  }
</style>