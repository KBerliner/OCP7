<template>
    <div class="notseen" v-if="!seen">Not Seen</div>
    <article class="postcontainer" @mouseover="seeing" :key="isVisible">
        <div class="postheader">
            <h3 class="posttitle">
                {{ post.title }}
            </h3>
            <h5 class="postauthor">
                {{ post.username }}
            </h5>
        </div>
        <div class="postbody">
            <img :src="imgUrl" alt="Post Image" class="postimg" v-if="imgUrl !== ''" />
            <p class="caption">{{ post.caption }}</p>
        </div>
        <div class="postfooter">
            <font-awesome-icon :icon="['fas', 'thumbs-up']" size="xl" class="like" @click="like" :id="'like' + post._id"/>
            <h5 class="likesNum" :id="'likesNum' + post._id">{{ post.likes }}</h5>
            <font-awesome-icon :icon="['fas', 'thumbs-down']" size="xl"  class="dislike" @click="dislike" :id="'dislike' + post._id"/>
            <h5 class="dislikesNum" :id="'dislikesNum' + post._id">{{ post.dislikes }}</h5>
            <button v-if="owner" class="btn modbtn" @click="editPost">Modify</button>
            <button v-if="owner" class="btn deletebtn" @click="deletePost">Delete</button>
        </div>
    </article>
</template>

<script>
import CreatePost from './CreatePost.vue';

    export default {
        name: 'Post',
        components: {
            CreatePost
        },
        data() {
            return {
                owner: false,
                isVisible: true,
                seen: false
            }
        },
        props: {
            // isVisible: {
            //     type: Boolean,
            //     default: true
            // },
            // key: {
            //     type: String,
            //     default: ''
            // },
            post: {

            },
            userId: {
                type: String,
                default: ''
            },
            imgUrl: {
                type: String,
                default: ''
            },
            postId: {
                type: String,
                default: ''
            },
            likes: {
                type: Number,
                default: 0
            },
            dislikes: {
                type: Number,
                default: 0
            },
            usersLiked: {
                type: Array,
                default: []
            },
            usersDisliked: {
                type: Array,
                default: []
            },
            // seen: {
            //     type: Boolean,
            //     default: false
            // },
            usersSeen: {
                type: Array
            }
        },
        methods: {
            like() {
                // console.log(this.post.usersLiked);
                if (!this.post.usersLiked.includes(this.userId) && !this.post.usersDisliked.includes(this.userId)) {
                    return new Promise((resolve, reject) => {
                        let uid = this.postId;
                        console.log('POST ID: ', uid);
                        let request = new XMLHttpRequest();
                        request.open('POST', `http://localhost:3000/api/${uid}/like`);
                        request.setRequestHeader('Content-Type', 'application/json');
                        request.send(JSON.stringify({
                            like: 1,
                            userId: this.userId
                        }));
                        request.onreadystatechange = () => {
                            if (request.readyState == 4) {
                                if (request.status === 200 || request.status === 201) {
                                    location.reload();
                                    resolve(JSON.parse(request.response));
                                } else {
                                    reject(JSON.parse(request.response));
                                }
                            }
                        }
                    });
                } else if (this.post.usersLiked.includes(this.userId) && !this.post.usersDisliked.includes(this.userId)) {
                    return new Promise((resolve, reject) => {
                        let uid = this.postId;
                        let request = new XMLHttpRequest();
                        request.open('POST', `http://localhost:3000/api/${uid}/like`);
                        request.setRequestHeader('Content-Type', 'application/json');
                        request.send(JSON.stringify({
                            like: 0,
                            userId: this.userId
                        }));
                        request.onreadystatechange = () => {
                            if (request.readyState == 4) {
                                if (request.status === 200 || request.status === 201) {
                                    location.reload();
                                    resolve(JSON.parse(request.response));
                                } else {
                                    reject(JSON.parse(request.response));
                                }
                            }
                        }
                    });
                }
            },
            dislike() {
                if (!this.post.usersLiked.includes(this.userId) && !this.post.usersDisliked.includes(this.userId)) {
                    return new Promise((resolve, reject) => {
                        let uid = this.postId;
                        let request = new XMLHttpRequest();
                        request.open('POST', `http://localhost:3000/api/${uid}/like`);
                        request.setRequestHeader('Content-Type', 'application/json');
                        request.send(JSON.stringify({
                            like: -1,
                            userId: this.userId
                        }));
                        request.onreadystatechange = () => {
                            if (request.readyState == 4) {
                                if (request.status === 200 || request.status === 201) {
                                    location.reload();
                                    resolve(JSON.parse(request.response));
                                } else {
                                    reject(JSON.parse(request.response));
                                }
                            }
                        }
                    });
                } else if (!this.post.usersLiked.includes(this.userId) && this.post.usersDisliked.includes(this.userId)) {
                    return new Promise((resolve, reject) => {
                        let request = new XMLHttpRequest();
                        let uid = this.postId;
                        request.open('POST', `http://localhost:3000/api/${uid}/like`);
                        request.setRequestHeader('Content-Type', 'application/json');
                        request.send(JSON.stringify({
                            like: 0,
                            userId: this.userId
                        }));
                        request.onreadystatechange = () => {
                            if (request.readyState == 4) {
                                if (request.status === 200 || request.status === 201) {
                                    location.reload();
                                    resolve(JSON.parse(request.response));
                                } else {
                                    reject(JSON.parse(request.response));
                                }
                            }
                        }
                    });
                }
            },
            seeing() {
                if (this.post.usersSeen) {
                    if (!this.post.usersSeen.includes(this.userId)) {
                        this.post.usersSeen.push(this.userId);
                        return new Promise((resolve, reject) => {
                            let request = new XMLHttpRequest();
                            let uid = this.postId;
                            request.open('POST', `http://localhost:3000/api/${uid}/see`);
                            request.setRequestHeader('Content-Type', 'application/json');
                            request.send(JSON.stringify({
                                userId: this.userId
                            }));
                            request.onreadystatechange = () => {
                                if (request.readyState == 4) {
                                    if (request.status === 200 || request.status === 201) {
                                        // location.reload();
                                        resolve(JSON.parse(request.response));
                                    } else {
                                        reject(JSON.parse(request.response));
                                    }
                                }
                            }
                        })
                    }
                }
            //     console.log(this.usersSeen);
            },
            editPost() {
                this.$emit('edit');
            },
            deletePost() {
               return new Promise((resolve, reject) => {
                let uid = this.postId;
                let request = new XMLHttpRequest();
                request.open('DELETE', `http://localhost:3000/api/${uid}/delete`);
               }) 
            },
            test() {
                console.log('TEST');
            }
        },
        mounted() {

            // If the post has been seen yet by this user

            if (this.post.usersSeen && this.post.usersSeen != undefined) {
                if (this.post.usersSeen.includes(this.userId)) {
                    this.seen = true;
                }
            }

            // If the user viewing this post is the owner of the post

            if (this.userId === this.post.creatorId) {
                    this.owner = true;
                }

            // If the user has already interacted the post, and which interaction they did (Like or Dislike)

            if (this.post.usersLiked.includes(this.userId) && !this.post.usersDisliked.includes(this.userId)) {
                let otherBtn = document.getElementById('dislike' + this.post._id);
                let otherText = document.getElementById('dislikesNum' + this.post._id);
                let thisBtn = document.getElementById('like' + this.post._id);
                thisBtn.style.color = "green";
                otherBtn.style.display = "none";
                otherText.style.display = "none";
            } else if (this.post.usersDisliked.includes(this.userId)) {
                let otherBtn = document.getElementById('like' + this.post._id);
                let otherText = document.getElementById('likesNum' + this.post._id);
                let thisBtn = document.getElementById('dislike' + this.post._id);
                thisBtn.style.color = "red";
                otherBtn.style.display = "none";
                otherText.style.display = "none";
            } else {
                console.log('YOU HAVENT LIKED THIS YET');
            }
        }
    }

</script>

<style scoped>
    .disabled {
        color: gray;
        cursor: none;
    }

    .notseen {
        background-color: rgba(213, 173, 86, 0.1);
    }

    .postcontainer {
        width: 45vw;
        min-height: 15vh;
        border: 2px solid gray;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin: 25px;
    }

    .postheader {
        display: flex;
        justify-content: space-between;
        /* border: 2px solid gray; */
        width: 90%;
    }

    .postbody {
        width: 90%;
        height: 60%;
        /* border: 2px solid gray; */
    }

    .like:hover {
        cursor: pointer;
        color: green;
    }

    .caption {
        border: 2px solid gray;
        height: 20%;
    }

    .dislike:hover {
        cursor: pointer;
        color: red;
    }

    .postfooter {
        width: 100%;
        display: flex;
        justify-content: space-around;
        /* border: 2px solid red; */
        align-items: center;
        padding: 2vh 0;
    }

    .postfooter font-awesome-icon:hover {
        cursor: pointer;
        color: blue;
    }
    

    .postfooter button {
        height: 50px;
        width: 100px;
        border-radius: 5px;
        border: 2px solid rgb(77, 77, 77);
        font-size: medium;
        font-weight: 600;
        cursor: pointer;
    }

    h1 {
        border: 2px solid gray;
        border-radius: 4px;
        background: darkgray;
    }

    .deletebtn {
        background-color: rgb(194, 89, 93);
        color: rgb(45, 45, 45);
    }
</style>