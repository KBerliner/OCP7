<template>
    <div class="background">
    <article class="postcontainer">
        <div id="backbtn" @click="back">X</div>
        <form id="form" class="inputs" method="post" enctype="multipart/form-data">
            <label class="titlelabel label">Title: </label>
            <input class="titleinput input" v-model="title[0]" @click="test" />
            <label class="captionlabel label">Post Caption: </label>
            <textarea class="captioninput input" v-model="caption[0]" @click="test" />
            <label class="imagelabel label">Image: </label>
            <input id="imgInput" type="file" name="image" accept="image/*" @change="handleFileUpload($event)" />
            <button type="submit" @click="submitPost" id="submit">Submit Post</button>
        </form>
        
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
                caption: {
                    type: String,
                    default: ''
                },
                imgUrl: {
                    type: String,
                    default: ''
                }
            }
        },
        props: {
            userId: String,
            username: String
        },
        methods: {
            handleFileUpload($event) {
                this.imgUrl = $event.target.files[0];
            },
            back() {
                this.$emit('back');
            },
            submitPost($event) {
                $event.preventDefault();
                let form = document.getElementById('form');
                const formData = new FormData();
                
                this.$emit('createdPost');
                let post = JSON.stringify({
                    title: this.title[0],
                    username: this.username,
                    caption: this.caption[0],
                    creatorId: this.userId
                });

                formData.append("post", post);
                formData.append("image", this.imgUrl);

                return new Promise((resolve, reject) => {
                    let key = 'eyJhbGciOiJIUzI1NiJ9.e30.QXKHqZhQAO4ZOTEDRNAxc4CD1jblcF_BakFSjA3srJc';
                    let request = new XMLHttpRequest();
                    request.open('POST', 'http://localhost:3000/api/');
                    request.setRequestHeader('Authorization', 'Bearer ' + key);
                    // request.setRequestHeader('Content-Type', 'multipart/form-data');
                    request.send(formData);
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
                })
            }
        }
    }
</script>

<style scoped>

    #backbtn {
        border-radius: 16px;
        background-color: rgb(194, 89, 93);
        width: 25px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    #backbtn:hover {
        transform: scale(1.1);
        background-color: rgb(200, 97, 97);
    }

    #submit {
        width: 40%;
        height: 2em;
        margin: 0 auto;
        background-color: rgb(194, 89, 93);
        border: none;
        border-radius: 2px;
    }

    #submit:hover {
        background-color: rgb(200, 97, 97);
        cursor: pointer;
    }


    #imgInput {
        /* text-align: center; */
        margin: 50px;
    }

    .postcontainer {
        border: 2px solid rgb(0, 0, 0);
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
        border-radius: 8px;
    }

    .input {
        /* background-color: red; */
        border-radius: 4px;
        margin: 12px;
        border: 2px solid black;
    }

    .captioninput {
        height: 4rem
    }

    .captionlabel::before {
        content: '';
        color: rgb(194, 89, 93);
        background-color: rgb(194, 89, 93);
        position: absolute;
        width: 98px;
        height: 2px;
        top: 196px;
    }

    .titlelabel::before {
        content: '';
        color: rgb(194, 89, 93);
        background-color: rgb(194, 89, 93);
        position: absolute;
        top: 126px;
        width: 37px;
        height: 2px;
    }

    .imagelabel::before {
        content: '';
        color: rgb(194, 89, 93);
        background-color: rgb(194, 89, 93);
        position: absolute;
        top: 312px;
        width: 50px;
        height: 2px;
    }

    .inputs {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-content: center;
        height: 80%;
        max-width: 100%;
    }

    .background {
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9;
        position: absolute;
        overflow: hidden;
    }

</style>