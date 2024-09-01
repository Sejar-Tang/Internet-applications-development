<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-10">
                <h1 class="text-center">Login</h1>
                
                <form @submit.prevent="login">
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" v-model="username" required>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" v-model="password" required>
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="submit">Login</button>
                    </div>
                    <p v-if="loginError" class="error text-center">Invalid credentials</p>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const loginError = ref(false);
const router = useRouter();

const login = () => {
if (username.value === 'Monash' && password.value === '123456') {
    localStorage.setItem('isAuthenticated', 'true');
    router.push('/about');
} else {
    loginError.value = true;
}
};
</script>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  /* background-color: #e0bfbf; */
  border-radius: 10px;
}

/* Class selectors */
.form {
  text-align: center;
  margin-top: 50px;
}
</style>