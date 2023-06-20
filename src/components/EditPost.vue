<template>
    <div class="background">
    <article class="postcontainer">
        <div id="backbtn" @click="back">X</div>
        <form class="inputs">
            <label class="titlelabel label">Title: </label>
            <input class="titleinput input" v-model="title[0]" @click="test" />
            <label class="captionlabel label">Post Caption: </label>
            <textarea class="captioninput input" v-model="caption[0]" @click="test" />
            <label class="imagelabel label">Image: </label>
            <input id="imgInput" type="file" name="image"/>
            <button type="submit" @click="submitPost" id="submit">Submit Post</button>
        </form>
        
    </article>
    </div>
</template>

<script>
    export default {
    name: 'EditPost',
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

    /* .label:before { */
        /* content: '';
        color: rgb(194, 89, 93);
        background-color: rgb(194, 89, 93);
        width: 10%;
        height: 2px; */
        /* position: absolute; */
    /* } */

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