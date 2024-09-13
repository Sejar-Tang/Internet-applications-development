<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-10">
                <h1 class="text-center">Register</h1>
                
                <form @submit.prevent="register">
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6">
                            <label for="email" class="form-label">Email</label>
                            <input type="text" class="form-control" id="email" v-model="email" required>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" v-model="password" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6">
                            <label for="role" class="form-label">Role</label>
                            <select class="form-select" v-model="role" required>
                                <option value="admin">Admin</option>
                                <option value="student">Student</option>
                            </select>
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="register" class="btn btn-primary">Save to Firebase</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const email = ref("");
const password = ref("");
const role = ref("student");
const router = useRouter();
const auth = getAuth();
const db = getFirestore();

const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (data) => {
        console.log("Firebase Register Successful!");

        await setDoc(doc(db, "users", auth.currentUser.uid), {
            email: email.value,
            role: role.value
        });

        router.push('/fire-login');
        console.log(auth.currentUser);
    }).catch((error) => {
        console.log(error.code);
    })
};
</script>