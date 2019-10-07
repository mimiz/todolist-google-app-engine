<template>
    <div>
        <div class="col-md-12" v-show="todos.length>0">
            <h3>Todo Items</h3>
            <div class="row mrb-10" :key="todo.id" v-for="todo in todos">
                <div class="input-group m-b-5">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <input
                                type="checkbox"
                                v-model="todo.done"
                                :checked="todo.done"
                                :value="todo.done"
                                v-on:change="updateTodo(todo)"
                                title="Mark as done?"
                            />
                        </div>
                    </div>

                    <input
                        type="text"
                        class="form-control"
                        :class="todo.done?'todo__done':''"
                        v-model="todo.title"
                        @keyup.enter="updateTodo(todo)"
                    />
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <span
                                class="input-group-addon addon-left"
                                title="Delete todo?"
                                v-on:click="deleteTodo(todo.id)"
                            >X</span>
                        </div>
                    </div>
                </div>
                <span class="help-block small" v-show="todo.editing">Hit enter to update</span>
            </div>
        </div>

        <div class="row alert alert-info text-center" v-show="todos.length==0">
            <p class="alert alert-info">
                <strong>All Caught Up</strong>
                <br />You do not have any todo items
            </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import bus from '../utils/bus';
import config from '../utils/config';

export default {
    data() {
        return {
            todos: [],
        };
    },
    created: function() {
        this.fetchTodo();
        this.listenToEvents();
    },
    methods: {
        fetchTodo() {
            let uri = `${config.API_URL}/tasks`;
            axios.get(uri).then(response => {
                this.todos = response.data;
            });
        },
        updateTodo(todo) {
            let id = todo.id;
            let uri = `${config.API_URL}/tasks/${id}`;
            todo.editing = false;
            axios
                .put(uri, todo)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        },

        async deleteTodo(id) {
            let uri = `${config.API_URL}/tasks/${id}`;
            await axios.delete(uri);
            this.fetchTodo();
        },

        listenToEvents() {
            bus.$on('refreshTodo', $event => {
                this.fetchTodo(); //update todo
            });
        },
    },
};
</script>

<style scoped>
.todo__done {
    text-decoration: line-through !important;
}
.no_border_left_right {
    border-left: 0px;
    border-right: 0px;
}
.flat_form {
    border-radius: 0px;
}
.mrb-10 {
    margin-bottom: 10px;
}
.addon-left {
    background-color: none !important;
    border-left: 0px !important;
    cursor: pointer !important;
}
.addon-right {
    background-color: none !important;
    border-right: 0px !important;
}
</style>