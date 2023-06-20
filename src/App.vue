<template>
  <section v-if="!loggedIn">
    <Login v-if="!signup && !loggedIn" @signup="this.signup = true" @login="login"></Login>
    <Signup v-if="signup && !loggedIn"></Signup>
  </section>
  <section v-if="loggedIn" class="mainpage">
    <MainPage :username="username" :userId="userId" @logout="logout"></MainPage>
  </section>
</template>

<script>

import Post from './components/Post.vue';
import CreatePost from './components/CreatePost.vue';
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';
import MainPage from './components/MainPage.vue';
// import { locals } from './app';

//
// code for cool stuff please thank you// :)

//

export default{
  name: 'App',
  components: {
    Post,
    CreatePost,
    Login,
    Signup,
    MainPage
  },
  data() {
    return {
      loggedIn: false,
      signup: false,
      userId: 'TestID',
      username: 'TestUserName'
    };
  },
  methods: {
    login(uid, username, token) {
      this.loggedIn = true;
      this.userId = uid;
      this.username = username;
      if (localStorage) {
        // console.log(localStorage);
        localStorage.setItem('validToken', token);
      }
    },
    logout() {
      this.loggedIn = false;
      this.userId = '';
      this.username = '';
      localStorage.removeItem('validToken');
    }
  },
  // created: function() {
  //   // if (localStorage.getItem('validToken'))
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
}

.mainpage {
  width: 100vw;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>
