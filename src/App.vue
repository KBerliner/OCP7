<template>
  <Post></Post>
</template>

<script>

import Post from './components/Post.vue';
import CreatePost from './components/CreatePost.vue';

export default{
  name: 'App',
  components: {
    Post,
    CreatePost
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
