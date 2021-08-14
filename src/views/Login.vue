<template>
  <h1>Uloguj se u svoj nalog</h1>
  <form @submit.prevent="handleSubmit">
    <label for="email">Email adresa</label>
    <input id="email" type="email" v-model="email">
    <label for="password">Password</label>
    <input id="password" type="password" required v-model="password">
    <div class="error">{{ error }}</div>
    <button v-if="!isPending" class="login_button">Uloguj se</button>
    <button v-if="isPending" class="login_button">Logovanje...</button>
  </form>
</template>

<script>
  import { ref } from 'vue';
  import userLogin from '../composables/userLogin';

  export default {
    setup(props, context) {
      // refs
      const email = ref('');
      const password = ref('');

      const { error, login, isPending } = userLogin();

      const handleSubmit = async () => {
        await login(email.value, password.value);
        if(!error.value) {
          context.emit('login');
        }
      }

      return { email, password, handleSubmit, error, isPending }
    }
  }
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 3.6rem;
  font-weight: 800;
  margin: 6rem 0 4rem 0;
}
form {
  background-color: #fff;
  border-radius: 5px;
  padding: 5rem 4rem 4rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 540px;
  margin: 20px auto;
}

label {
  margin-bottom: .5rem;
  font-weight: 700;
}

input {
  border: .2rem solid #dfe4eb;
  border-radius: .5rem;
  padding: 1.2rem 1.8rem;
  width: 100%;
  margin-bottom: 2.5rem;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
}

.login_button {
  margin-top: 5rem;
  width: 100%;
  background-color: #ffb81c;
}

</style>