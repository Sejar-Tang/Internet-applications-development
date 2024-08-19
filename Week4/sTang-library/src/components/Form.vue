<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-10">
                <h1 class="text-center">User Information Form</h1>
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" 
                                @blur="() => validateName(true)"
                                @input="() => validateName(false)"
                                v-model="formData.username">
                                <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" 
                                @blur="() => validatePassword(true)"
                                @input="() => validatePassword(false)"
                                v-model="formData.password">
                                <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="isAustralian" v-model="formData.isAustralian">
                                <label for="isAustralian" class="form-check-label">Australian Resident?</label>
                            </div>
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
                    <div class="mb-3">
                        <label for="reason" class="form-label">Reason for joining</label>
                        <textarea class="form-control" id="reason" 
                            @blur="() => validateReason(true)"
                            @input="() => validateReason(false)" 
                            v-model="formData.reason"></textarea>
                            <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
                    </div>
                    <div class="text-center">
                        <button type="Submit" class="btn btn-primary me-2" @click="submitForm">Submit</button>
                        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
                    </div>
                </form>
            </div>
            <div class="primevue-container" v-if="submittedCards.length">
            <DataTable :value="submittedCards" responsiveLayout="scroll">
                <Column field="username" header="Username"></Column>
                <Column field="password" header="Password"></Column>
                <Column field="isAustralian" header="Australian Resident" :body="isAustralianTemplate"></Column>
                <Column field="gender" header="Gender"></Column>
                <Column field="reason" header="Reason"></Column>
            </DataTable>
        </div>
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
    </div>
</template>

<script setup>
import { ref } from 'vue';
// import { DataTable } from 'primevue/datatable';
// import { Column } from 'primevue/column';

const formData = ref({
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: ''
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
    if (formData.value.reason.length < 4) {
        if(blur)errors.value.reason = 'Reason must be at least 4 characters long';
        return false;
    } else {
        errors.value.reason = null;
        return true;
    }
}

const validateForm = () => {
    const isNameValid = validateName();
    const isPasswordValid = validatePassword();
    const isGenderValid = validateGender();
    const isReasonValid = validateReason();

    return isNameValid && isPasswordValid && isGenderValid && isReasonValid;
}
</script>

<style scoped>
Bootstrap
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
/* .container .p-datatable .p-datatable-tbody > tr > td {
    padding: 10px;
}

.container .p-column-title {
    font-weight: bold;
} */
</style>