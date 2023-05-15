<template>
    <input v-model="title" />
    <h3>{{ title }}</h3>
</template>

<script>
    export default {
        name: 'CreatePost',
        props: {
            
        },
        data() {
            return {
                title: 'This is the title'
            }
        }
    }
</script>

<style scoped>
    input {
        background-color: red;
    }

    h3 {
        background-color: blue;
    }
</style>