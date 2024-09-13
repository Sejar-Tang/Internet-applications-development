<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-10">
                <h1 class="text-center">Add/Update Book</h1>
                
                <form @submit.prevent="isUpdating ? updateBook() : addBook()">
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6">
                            <label for="isbn" class="form-label">ISBN:</label>
                            <input type="text" class="form-control" id="isbn" v-model="isbn" required>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <label for="name" class="form-label">Name:</label>
                            <input type="text" class="form-control" id="name" v-model="name" required>
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary">{{ isUpdating ? 'Update Book' : 'Add Book' }}</button>
                    </div>
                </form>
                
                <BookList :books="books" @editBook="editBook" @deleteBook="deleteBook" />
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import BookList from '../components/BookList.vue';

export default {
    setup(){
        const isbn = ref('');
        const name = ref('');
        const books = ref([]);
        const isUpdating = ref(false);
        const currentBookId = ref(null);

        const fetchBooks = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'books'));
                books.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        const fetchBooksWithQuery = async () => {
            try {
                const q = query(
                    collection(db, 'books'),
                    where('isbn', '>', 1000),
                    orderBy('name', 'asc'),
                    limit(5)
                );
                const querySnapshot = await getDocs(q);
                books.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        const addBook = async () => {
            try {
                const isbnNumber = Number(isbn.value);
                if (isNaN(isbnNumber)) {
                    alert("ISBN must be a valid number");
                    return;
                }

                await addDoc(collection(db, 'books'), {
                    isbn: isbnNumber,
                    name: name.value
                });
                isbn.value = '';
                name.value = '';
                fetchBooks();
                alert("Book added successfully!");
            } catch (error) {
                console.error('Error adding book:', error);
            }
        };

        const editBook = (book) => {
            isbn.value = book.isbn;
            name.value = book.name;
            currentBookId.value = book.id;
            isUpdating.value = true;
        };

        const updateBook = async () => {
            try {
                const isbnNumber = Number(isbn.value);
                if (isNaN(isbnNumber)) {
                    alert("ISBN must be a valid number");
                    return;
                }

                const bookRef = doc(db, 'books', currentBookId.value);
                await updateDoc(bookRef, {
                    isbn: isbnNumber,
                    name: name.value
                });

                isbn.value = '';
                name.value = '';
                isUpdating.value = false;
                fetchBooks();
                alert("Book updated successfully!");
            } catch (error) {
                console.error('Error updating book:', error);
            }
        };

        const deleteBook = async (bookId) => {
            try {
                const bookRef = doc(db, 'books', bookId);
                await deleteDoc(bookRef);
                fetchBooks();
                alert("Book deleted successfully!");
            } catch (error) {
                console.error('Error deleting book:', error);
            }
        };

        onMounted(() => {
            fetchBooksWithQuery();
        });

        return {
            isbn,
            name,
            books,
            addBook,
            updateBook,
            deleteBook,
            editBook,
            isUpdating
        };
    },
    components: {
        BookList
    }
};
</script>