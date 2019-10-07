<template>
    <div role="main">
        <div class="container">
            <div class="row col-md-12 d-flex justify-content-center">
                <create-todo></create-todo>
                <div class="row col-md-12 d-flex justify-content-center">
                    <list-todo></list-todo>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CreateTodo from './CreateTodo.vue';
import ListTodo from './ListTodo.vue';

export default {
    name: 'app',
    components: { CreateTodo, ListTodo },
};
</script>

<style>
</style>