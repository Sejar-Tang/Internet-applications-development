<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-10">
                <h1 class="text-center">🗄️ W4. Library Registration Form</h1>
                <p class="text-center">
                    This form now includes validation. Registered users are displayed in a data table below(PrimeVue).
                </p>
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" 
                                @blur="() => validateName(true)"
                                @input="() => validateName(false)"
                                v-model="formData.username"
                            />
                            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <label for="gender" class="form-label">Gender</label>
                            <select class="form-select" id="gender" 
                                @blur="() => validateGender(true)"
                                @change="() => validateGender(false)"
                                v-model="formData.gender">
                                <option value="male">Male</option>
                                <option value="female">Famale</option>
                                <option value="other">Other</option>
                            </select>
                            <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
                        </div>
                    </div>
                    <div class="row mb-3">

                        <div class="col-md-6 col-sm-6">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" 
                                @blur="() => validatePassword(true)"
                                @input="() => validatePassword(false)"
                                v-model="formData.password"
                            />
                            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <label for="confirm-password" class="form-label">Confirm password</label>
                            <input type="password" class="form-control" id="confirm-password"
                                @blur="() => validateConfirmPassword(true)"
                                v-model="formData.confirmPassword"
                            />
                            <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
                        </div>                       
                        <div class="col-md-6 col-sm-6 mt-4">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="isAustralian" v-model="formData.isAustralian">
                                <label for="isAustralian" class="form-check-label">Australian Resident?</label>
                            </div>
                        </div>

                    </div>
                    <div class="mb-3">
                        <label for="reason" class="form-label">Reason for joining</label>
                        <textarea class="form-control" id="reason" 
                            @blur="() => validateReason(true)"
                            @input="() => validateReason(false)" 
                            v-model="formData.reason"></textarea>
                            <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
                            <div v-if="successMessage" class="text-success">{{ successMessage }}</div>
                    </div>
                    <div class="mb-3">
                        <label for="reason" class="form-label">Suburb</label>
                        <input type="text" class="form-control" id="suburb" v-bind:value="formData.suburb" />
                    </div>
                    <div class="text-center">
                        <button type="Submit" class="btn btn-primary me-2" @click="submitForm">Submit</button>
                        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="row mt-5">
        <h4>This is a Primevue Datatable.</h4>
        <DataTable :value="submittedCards" responsiveLayout="scroll" tableStyle="min-width: 50rem">
            <Column field="username" header="Username"></Column>
            <Column field="password" header="Password"></Column>
            <Column field="isAustralian" header="Australian Resident"></Column>
            <Column field="gender" header="Gender"></Column>
            <Column field="reason" header="Reason"></Column>
        </DataTable>
    </div>


    <div class="row mt-5" v-if="submittedCards.length">
        <div class="d-flex flex-warp justify-content-start">
            <div v-for="(card, index) in submittedCards" :key="index" class="card m-2" style="width: 18rem;">
                <div class="card-header">
                    User Information
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Username:{{ card.username }}</li>
                    <li class="list-group-item">Password:{{ card.password }}</li>
                    <li class="list-group-item">Australian Resident:{{ card.isAustralian ? 'Yes' : 'No' }}</li>
                    <li class="list-group-item">Gender:{{ card.gender }}</li>
                    <li class="list-group-item">Reason:{{ card.reason }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const successMessage = ref(null);

const formData = ref({
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: '',
    suburb: 'Clayton'
})

const submittedCards = ref([]);

const submitForm = () => {
    const isValid=validateForm();
    if(isValid){
        submittedCards.value.push({...formData.value});
        clearForm();
    }    
}

const clearForm = () => {
    formData.value = {
        username: '',
        password: '',
        isAustralian: false,
        reason: '',
        gender: ''
    }
}

const errors = ref({
    username: null,
    password: null,
    confirmPassword: null,
    resident: null,
    gender: null,
    reason: null,
})

const validateName = (blur) => {
    if(formData.value.username.length < 3) {
        if(blur)
            errors.value.username = "Name must be at least 3 characters";
        return false;
    }
    else {
        errors.value.username = null;
        return true;
    }
}

const validatePassword = (blur) => {
    const password = formData.value.password;
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if(password.length < minLength) {
        if(blur) errors.value.password=`Password must be at least ${minLength} characters long`;
        return false;
    }else if(!hasUppercase){
        if(blur) errors.value.password="Password must contain at least one uppercase letter.";
        return false;
    }else if(!hasLowercase){
        if(blur) errors.value.password="Password must contain at least one lowercase letter.";
        return false;
    }else if(!hasNumber){
        if(blur) errors.value.password="Password must contain at least one number.";
        return false;
    }else if(!hasSpecialChar){
        if(blur) errors.value.password="Password must contain at least one special character.";
        return false;
    }else{
        errors.value.password=null;
        return true;
    }   
}

/**
 * Confirm password validation function that checks if the password and confirm password fields match.
 * @param blur: boolean - If true, the function will display an error message if the passwords do not match.
 */
const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

const validateGender = (blur) => {
    if (!formData.value.gender) {
        if(blur)errors.value.gender = 'Gender is required';
        return false;
    } else {
        errors.value.gender = null;
        return true;
    }
}

const validateReason = (blur) => {
    const reasonText = formData.value.reason;
    if (formData.value.reason.length < 4) {
        if(blur)errors.value.reason = 'Reason must be at least 4 characters long';
        return false;
    } else {
        errors.value.reason = null;
    }

    if (reasonText.toLowerCase().includes('friend')) {
        if (blur) successMessage.value = 'Great to have a friend';
        return true;
    } else {
        successMessage.value = null;
        return true;
    }
}

const validateForm = () => {
    const isNameValid = validateName();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isGenderValid = validateGender();
    const isReasonValid = validateReason();

    return isNameValid && isPasswordValid && isConfirmPasswordValid && isGenderValid && isReasonValid;
}
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

/* ID selectors */
#username:focus,
#password:focus,
#isAustralian:focus,
.card {
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
    background-color: #275FDA;
    color: white;
    padding: 10px;
    border-radius: 10px 10px 0 0;
}

.list-group-item {
    padding: 10px;
}

.text-success {
    color: green;
}
</style>