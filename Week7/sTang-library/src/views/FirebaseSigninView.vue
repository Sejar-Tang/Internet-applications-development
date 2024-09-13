<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-10">
                <h1 class="text-center">Login</h1>
                
                <form @submit.prevent="signin">
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
                    <div class="text-center">
                        <button type="signin" class="btn btn-primary">Sign in via Firebase</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();
const db = getFirestore();

const signin = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then(async (data) => {
        console.log("Firebase Login Successful!");

        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            const userRole = userData.role;
            console.log("User role:", userRole);
            router.push('/');
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log(error.code);
    })
};
</script>