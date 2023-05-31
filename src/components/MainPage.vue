<template class="template">
    <CreatePost v-if="creatingPostNow" class="createpostframe" :username="username" @createdPost="this.creatingPostNow = false"></CreatePost>
    <section class="header">
        <h3 class="username headertext">
            {{ username }}
        </h3>
        <h1 class="headertext">
            Groupomania
        </h1>
        <h4 id="logoutbtn" class="headertext" @click="logout">
            Logout
        </h4>
    </section>
    <section class="posts">
        <div v-if="postArray.length > 0">
            <Post v-for="post in postArray.length" v-bind:key="post.id">{{ post }}</Post>
        </div>
        <div v-if="postArray.length == 0">
            <h1>There are no posts yet!</h1>
        </div>
    </section>
    <div id="createpostbtn" @click="creatingPost">+</div>
</template>

<script>
import Post from '../components/Post.vue';
import CreatePost from './CreatePost.vue';

export default {
    name: 'MainPage',
    components: {
        Post,
        CreatePost
    },
    data() {
        return {
            postArray: [],
            creatingPostNow: false
        };
    },
    props: {
        username: String,
        userId: String
    },
    emits: {
        logout: null
    },
    methods: {
        logout() {
            this.$emit('logout');
        },
        creatingPost() {
            this.creatingPostNow = true;
            console.log(this.creatingPostNow);
            // console.log(this.postArray.PromiseResult);
        }
    },
    created: function() {
        let key = localStorage.getItem('validToken');
            return new Promise((resolve, reject) => {
                let request = new XMLHttpRequest();
                request.open('GET', 'http://localhost:3000/api/');
                request.setRequestHeader('Authorization', 'Bearer ' + key)
                request.send();
                request.onreadystatechange = () => {
                    if (request.readyState == 4) {
                        if (request.status === 200 || request.status === 201) {
                            this.postArray = (JSON.parse(request.response));
                            console.log(JSON.parse(request.response));
                            resolve(JSON.parse(request.response));
                        } else {
                            reject(JSON.parse(request.response));
                        }
                    }
                }
            });
    },
    // mounted() {
        // getAllPosts() {
        //     let key = 'eyJhbGciOiJIUzI1NiJ9.e30.QXKHqZhQAO4ZOTEDRNAxc4CD1jblcF_BakFSjA3srJc';
        //     return new Promise((resolve, reject) => {
        //         let request = new XMLHttpRequest();
        //         request.open('GET', 'http://localhost:3000/api/');
        //         request.setRequestHeader('Authorization', 'Bearer ' + key)
        //         request.send();
        //         request.onreadystatechange = () => {
        //             if (request.readyState == 4) {
        //                 if (request.status === 200 || request.status === 201) {
        //                     this.postArray = Promise.all(JSON.parse(request.response));
        //                     console.log(this.postArray);
        //                     resolve(JSON.parse(request.response));
        //                 } else {
        //                     reject(JSON.parse(request.response));
        //                 };
        //             };
        //         }
        //     });
        // }
    // }
}
</script>

<style scoped>
    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 80vw;
        position: sticky;
        top: 0;
        left: 0;
        border: 2px solid grey;
        margin: 0;
        padding: 0 20px;
        background-color: white;
    }

    #logoutbtn:hover {
        cursor: pointer;
        text-decoration: underline;
    }

    .headertext {
        width: 200px;
        text-align: center;
    }

    .posts {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 60px;
    }

    #createpostbtn {
        position: sticky;
        bottom: 50px;
        right: 50px;
        width: 35px;
        height: 35px;
        background-color:darkblue;
        color: white;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 800;
        font-size: larger;
        align-self: flex-end;
        cursor: pointer;
    }

    /* .createpostframe {

    } */
</style>