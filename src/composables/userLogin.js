import { ref } from "vue";
import { projectAuth } from '../firebase/config';

const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password);
    error.value = null;
    isPending.value = false;
    return res;
  } catch(err) {
    console.log(err.message);
    error.value = 'Incorrect mail and password';
    isPending.value = false;
  }
}

const userLogin = () => {
  return { error, login, isPending }
}

export default userLogin;