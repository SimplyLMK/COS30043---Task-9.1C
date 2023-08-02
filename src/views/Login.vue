
 <template>
    <form @submit.prevent = "handleSubmit">
        <h3>Login</h3>
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div v-if = "error" class = "error">{{ error }}</div>
        <button>Log In</button>
    </form>
  </template>
  
  <script>
  
  import useLogin from '@/composables/useLogin';

  import { ref } from 'vue';
  import router from '@/router';

  export default 
  {
  setup(){
    
    const {error ,login} = useLogin();  //use the useLogin composables which is a async function that use firebase method:  projectAuth.signInWithEmailAndPassword(email, password)

    //set up refs with empty string
    const email = ref('');
    const password = ref('');
    
    //compare login credentials to the one on firebase authentication
    const handleSubmit = async() =>{
        const res = await login(email.value, password.value)
        if(!error.value)
        {
            console.log('user logged in');
            router.push({name: 'home'});
        }
    }
    return {email, password, handleSubmit, error}
  }
  }
  </script>
  
  <style>
  
  </style>