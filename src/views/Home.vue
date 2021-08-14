<template>
  <div>
    <Login @login="enterNews" />
  </div>
</template>

<script>
  import Login from '../views/Login.vue';
  import { useRouter } from 'vue-router';

  export default {
    components: {
      Login
    },
    setup() {
      const router = useRouter();

      const enterNews = () => {
        router.push({ name: 'NewsList' });
      }

      return { enterNews }
    }
  }
</script>

<style lang="sass" scoped>

</style>