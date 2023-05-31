<template>
    <div class="background">
    <article class="postcontainer">
        <form class="inputs">
            <label>Title: </label>
            <input class="titleinput" v-model="title[0]" @click="test" />
            <label>Post Caption: </label>
            <input class="captioninput" v-model="caption[0]" @click="test"/>
            <label>Image: </label>
            <input class="imgInput" />
        </form>
        <div class="postbody">
            <img alt="Post Image" class="postimg" />
            <p class="caption"></p>
        </div>
        <button type="submit" @click="submitPost"></button>
    </article>
    </div>
</template>

<script>
    export default {
        name: 'CreatePost',
        data() {
            return {
                title: {
                    type: String,
                    default: ''
                },
                // username: {
                //     type: String,
                //     default: ''
                // },
                caption: {
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
            }
        },
        props: {
            username: String
        },
        methods: {
            submitPost($event) {
                $event.preventDefault;
                this.$emit('createdPost');
                let post = {
                    title: this.title[0],
                    username: this.username,
                    caption: this.caption[0],
                    imageUrl: this.imgUrl[0],
                    likes: this.likes,
                    dislikes: this.dislikes,
                    usersLiked: this.usersLiked,
                    usersDisliked: this.usersDisliked
                }
                console.log('POST OBJECT: ', post);
                console.log('PROPS: ', `Title, ${this.title[0]}| Caption: ${this.caption[0]}`);
                return new Promise((resolve, reject) => {
                    let key = 'eyJhbGciOiJIUzI1NiJ9.e30.QXKHqZhQAO4ZOTEDRNAxc4CD1jblcF_BakFSjA3srJc';
                    let request = new XMLHttpRequest();
                    request.open('POST', 'http://localhost:3000/api/');
                    request.setRequestHeader('Authorization', 'Bearer ' + key)
                    request.send(post);
                    request.onreadystatechange = () => {
                        if (request.readyState == 4) {
                            if (request.status === 200 || request.status === 201) {
                                resolve(JSON.parse(request.response));
                            } else {
                                reject(JSON.parse(request.response));
                            }
                        }
                    }
                })
            },
            test() {
                console.log(this.username, this.username[0])
            }
        }
    }
</script>

<style scoped>


    .postcontainer {
        border: 2px solid red;
        position: sticky;
        top: 25%;
        z-index: 10;
        background-color: whitesmoke;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 55vw;
        height: 65vh;
    }

    input {
        background-color: red;
    }

    .background {
        width: 100vw;
        height: 100vh;
        /* scroll-behavior: none; */
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9;
        position: absolute;
    }

</style>