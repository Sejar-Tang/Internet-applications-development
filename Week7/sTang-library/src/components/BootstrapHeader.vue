<template>
  <div id="app">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">
            Home (Week 5)
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="!isAuthenticated" to="/login" class="nav-link" active-class="active">Login</router-link>
          <a v-else @click="logout" class="nav-link">Logout</a>
        </li>
        <li class="nav-item">
          <router-link to="/fire-register" class="nav-link" active-class="active">Firebase Register</router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const router = useRouter();
const isAuthenticated = ref(false);

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    isAuthenticated.value = true;
    console.log("Current User:", user);
  } else {
    isAuthenticated.value = false;
  }
});

const logout = () => {
  auth.signOut().then(() => {
    console.log("Logout successful!");
    router.push('/');
  }).catch((error) => {
    console.error("Logout error:", error);
  });
};
</script>

<style scoped>
  .b-example-divider {
    height: 3rem;
    background-color: rgba(0, 0, 0, 0.1);
    border: solid rgba(0, 0, 0, 0.15);
    border-width: 1px 0;
    box-shadow:
      inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
      inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
  }
  
  .form-control-dark {
    color: #fff;
    background-color: var(--bs-dark);
    border-color: var(--bs-gray);
  }
  .form-control-dark:focus {
    color: #fff;
    background-color: var(--bs-dark);
    border-color: #fff;
    box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
  }
  
  .bi {
    vertical-align: -0.125em;
    fill: currentColor;
  }
  
  .text-small {
    font-size: 85%;
  }
  
  .dropdown-toggle {
    outline: 0;
  }
</style>