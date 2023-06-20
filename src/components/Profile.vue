<template>
    <div class="background">
        <article class="postcontainer">
            <button id="back" @click="back">X</button>
            <button id="deletebtn" @click="deleteAccount">
                DELETE ACCOUNT
            </button>
        </article>
    </div>
</template>

<script>
export default {
    name: 'profile',
    data() {
        return {

        }
    },
    props: {
        userId: String
    },
    methods: {
        back() {
            this.$emit('back');
        },
        deleteAccount() {
            if (confirm('Are you sure?') == true) {
                return new Promise((resolve, reject) => {
                    let userId = this.userId;
                    let key = localStorage.getItem('validToken');
                    let request = new XMLHttpRequest();
                    request.open('DELETE', `http://localhost:3000/api/${userId}/delete`);
                    request.setRequestHeader('Content-Type', 'application/json');
                    request.setRequestHeader('Authorization', 'Bearer ' + key)
                    request.send();
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