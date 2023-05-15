<template>
    <article class="postcontainer">
        <div class="postheader">
            <h3 class="posttitle">
                Title Example
            </h3>
            <h5 class="postauthor">
                Post Author Example
            </h5>
        </div>
        <div class="postbody">
            <img alt="Post Image" class="postimg" />
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
    export default {
        name: 'Post',
        data() {
            return {
                owner: false,
                likes: 0,
                dislikes: 0,
                img: String
            }
        },
        methods: {
            like() {
                this.likes++;
                return console.log(this.likes);
            },
            dislike() {
                this.dislikes++;
                return console.log(this.dislikes);
            }
        }
    }
</script>

<style scoped>
    .postcontainer {
        width: 45vw;
        height: 60vh;
        border: 2px solid gray;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
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