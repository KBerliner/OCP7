<template>
    <article class="postcontainer">
        <div class="postheader">
            <h3 class="posttitle">
                {{ title }}
            </h3>
            <h5 class="postauthor">
                {{ username }}
            </h5>
        </div>
        <div class="postbody">
            <img alt="Post Image" class="postimg"/>
            <p class="caption"></p>
        </div>
        <div class="postfooter">
            <font-awesome-icon :icon="['fas', 'thumbs-up']" size="xl" class="like" @click="like" />
            <font-awesome-icon :icon="['fas', 'thumbs-down']" size="xl"  class="dislike" @click="dislike" />
            <button v-if="owner" class="btn modbtn">Modify</button>
            <button v-if="owner" class="btn deletebtn">Delete</button>

        </div>
        <!-- <div class="ownertools">

        </div> -->
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
            }
        },
        props: {
            title: {
                type: String,
                default: 'Test Post'
            },
            username: {
                type: String,
                default: 'Test User'
            },
            caption: {
                type: String,
                default: 'Lorem Ipsum something something latin test caption'
            },
            likes: {
                type: Number,
                default: 0
            },
            dislikes: {
                type: Number,
                default: 0
            },
            imgUrl: {
                type: String,
                default: ''
            },
            userId: {
                type: String,
                default: ''
            },
            usersLiked: {
                type: Array,
                default: []
            },
            usersDisliked: {
                type: Array,
                default: []
            }
        },
        methods: {
            like() {
                if (!this.usersLiked.includes(this.userId) && !this.usersDisliked.includes(this.userId)) {
                    return new Promise((resolve, reject) => {
                        let request = new XMLHttpRequest();
                        request.open('POST', 'http://localhost:3000/api/like');
                        request.setRequestHeader('Content-Type', 'application/json');
                        request.send(JSON.stringify({
                            like: 1,
                            userId: this.userId
                        }));
                        request.onreadystatechange = () => {
                            if (request.readyState == 4) {
                                if (request.status === 200 || request.status === 201) {
                                    resolve(JSON.parse(request.response));
                                } else {
                                    reject(JSON.parse(request.response));
                                }
                            }
                        }
                    });
                } else if (this.usersLiked.includes(userId) && !this.usersDisliked.includes(userId)) {
                    return new Promise((resolve, reject) => {
                        let request = new XMLHttpRequest();
                        request.open('POST', 'http://localhost:3000/api/like');
                        request.setRequestHeader('Content-Type', 'application/json');
                        request.send(JSON.stringify({
                            like: 0,
                            userId: userId
                        }));
                        request.onreadystatechange = () => {
                            if (request.readyState == 4) {
                                if (request.status === 200 || request.status === 201) {
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
                if (!this.usersLiked.includes(userId) && !this.usersDisliked.includes(userId)) {
                    return new Promise((resolve, reject) => {
                        let request = new XMLHttpRequest();
                        request.open('POST', 'http://localhost:3000/api/like');
                        request.setRequestHeader('Content-Type', 'application/json');
                        request.send(JSON.stringify({
                            like: -1,
                            userId: userId
                        }));
                        request.onreadystatechange = () => {
                            if (request.readyState == 4) {
                                if (request.status === 200 || request.status === 201) {
                                    resolve(JSON.parse(request.response));
                                } else {
                                    reject(JSON.parse(request.response));
                                }
                            }
                        }
                    });
                } else if (!this.usersLiked.includes(userId) && this.usersDisliked.includes(userId)) {
                    return new Promise((resolve, reject) => {
                        let request = new XMLHttpRequest();
                        request.open('POST', 'http://localhost:3000/api/like');
                        request.setRequestHeader('Content-Type', 'application/json');
                        request.send(JSON.stringify({
                            like: 0,
                            userId: userId
                        }));
                        request.onreadystatechange = () => {
                            if (request.readyState == 4) {
                                if (request.status === 200 || request.status === 201) {
                                    resolve(JSON.parse(request.response));
                                } else {
                                    reject(JSON.parse(request.response));
                                }
                            }
                        }
                    });
                }
            }
        },

        // THE PROBLEM MAY BE HERE BECAUSE THIS IS RAN ON CREATION

        mounted() {
            usersLiked: {
                    console.log(this.username);
            }
            
            // if (this.usersLiked.includes(userId) && !this.usersDisliked.includes(userId)) {
            //     let otherBtn = document.getElementsByClassName('dislike');
            //     let thisBtn = document.getElementsByClassName('like');
            //     otherBtn.classList.add('disabled');
            //     otherBtn.removeAttribute('@click');
            //     thisBtn.setAttribute('@click', 'like')
            // } else if (!this.usersliked.includes(userId) && this.usersDisliked.includes(userId)) {
            //     let otherBtn = document.getElementsByClassName('like');
            //     let thisBtn = document.getElementsByClassName('dislike');
            //     otherBtn.classList.add('disabled');
            //     otherBtn.removeAttribute('@click');
            //     thisBtn.setAttribute('@click', 'dislike');
            // };
        }
    }
</script>

<style scoped>
    .disabled {
        color: gray;
        cursor: none;
    }

    .postcontainer {
        width: 45vw;
        height: 60vh;
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