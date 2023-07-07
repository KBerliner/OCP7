<template class="template">

    <!-- These 3 elements are elements that show up when a new small page is needed, like viewing the profile or editing/creating a post -->

    <CreatePost v-if="creatingPostNow" class="createpostframe" @back="creatingPostNow = false" :userId="userId" :username="username" @createdPost="this.creatingPostNow = false"></CreatePost>
    <EditPost 
    v-if="editingPostNow" 
    class="editpostframe" 
    :id="this.whichPostEditing"
    @back="editingPostNow = false"
    @editedPost="editingPostNow = false"
    >
    </EditPost>
    <Profile v-if="viewingProfile" :userId="userId" @back="viewingProfile = false;"></Profile>



    <section class="header">
        <h3 id="usernamebtn" class="username headertext" @click="viewingProfile = true">
            {{ username }}
        </h3>
        <h1 class="headertext">
            Groupomania
        </h1>
        <h4 id="logoutbtn" class="headertext" @click="logout">
            Logout
        </h4>
    </section>
    <section>

        <!-- These are where all the posts are generated -->

        <div v-if="postArray.length > 0" class="posts">
            <Post  
            v-for="post in postArray.length" 
            :key="postArray[post - 1]._id" 
            :postId="postArray[post - 1]._id" 
            :post="postArray[post - 1]"
            :userId="userId"
            :imgUrl="postArray[post - 1].image"
            @editing="editingPost"
            >
            {{ post }}
        </Post>
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
import EditPost from './EditPost.vue';
import Profile from './Profile.vue';

export default {
    name: 'MainPage',
    components: {
        Post,
        CreatePost,
        EditPost,
        Profile
    },
    data() {
        return {
            postArray: [],
            creatingPostNow: false,
            editingPostNow: false,
            whichPostEditing: null,
            viewingProfile: false
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
        },
        editingPost(postId) {
            // this.whichPostIndexEditing = this.postArray.find(post => post._id === postId);
            this.whichPostEditing = postId;
            this.editingPostNow = true;

        }
    },
    created: function() {
        let key = localStorage.getItem('validToken');
            return new Promise((resolve, reject) => {
                let request = new XMLHttpRequest();
                request.open('GET', 'http://localhost:3000/api/');
                request.setRequestHeader('Authorization', 'Bearer ' + key);
                request.send();
                request.onreadystatechange = () => {
                    if (request.readyState == 4) {
                        if (request.status === 200 || request.status === 201) {
                            this.postArray = (JSON.parse(request.response));
                            resolve(JSON.parse(request.response));
                        } else {
                            reject(JSON.parse(request.response));
                        }
                    }
                }
            });
    }
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

    #usernamebtn:hover {
        cursor: pointer;
        text-decoration: underline;
    }

    .headertext {
        width: 200px;
        text-align: center;
    }

    .posts {
        display: flex;
        flex-direction: column-reverse;
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
</style>