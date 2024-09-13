<template>
    <div>
        <ul class="list-group">
            <li v-for="book in books" :key="book.id" class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <strong>ISBN:</strong> {{ book.isbn }} - <strong>Name:</strong> {{ book.name }}
                </div>
                <div>
                    <button class="btn btn-warning btn-sm me-2" @click="$emit('editBook', book)">Edit</button>
                    <button class="btn btn-danger btn-sm" @click="$emit('deleteBook', book.id)">Delete</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        books: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
.list-group-item {
    margin-bottom: 10px;
}
</style>