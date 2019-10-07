<template>
    <div>
        <h2>Create a Todo List</h2>
        <form @submit.prevent>
            <div class="form-group">
                <input
                    type="text"
                    class="form-control"
                    @keypress="typing=true"
                    placeholder="What do you want to do?"
                    v-model="todo"
                    @keyup.enter="addTodo($event)"
                />
                <span class="help-block small text-center" v-show="typing">Hit enter to save</span>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import bus from '../utils/bus';
import config from '../utils/config';

export default {
    data() {
        return {
            todo: '',
            typing: false,
        };
    },
    methods: {
        addTodo(event) {
            if (event) event.preventDefault();
            let url = `${config.API_URL}/tasks`;
            let param = {
                title: this.todo,
                done: false,
            };
            axios
                .post(url, param)
                .then(response => {
                    this.clearTodo();
                    this.refreshTodo();
                    this.typing = false;
                })
                .catch(error => {
                    throw error;
                });
        },
        clearTodo() {
            this.todo = '';
        },
        refreshTodo() {
            bus.$emit('refreshTodo');
        },
    },
};
</script>