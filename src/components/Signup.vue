<template>
    <div class="container">
        <form class="inputs">
            <label class="usernamelabel">
                Username:
            </label>
            <input type="text" v-model="username">
            <label class="emaillabel">
                Email:
            </label>
            <input type="email" v-model="email">
            <label class="passwordlabel">
                Password:
            </label>
            <input type="password" v-model="password">
            <input type="submit" class="submit" @click="submit">
        </form>
    </div>
</template>

<script>
export default {
    name: 'Signup',
    data() {
        return {
            "username": "",
            "email": "",
            "password": ""
        };
    },
    methods: {
        submit($event) {
            let user = JSON.stringify({
                username: this.username,
                email: this.email,
                password: this.password
            });
            $event.preventDefault;
            
            return new Promise((resolve, reject) => {
                let request = new XMLHttpRequest();
                request.open('POST', 'http://localhost:3000/api/signup');
                request.setRequestHeader('Content-Type', 'application/json');
                console.log('Line 44: ', JSON.parse(user));
                request.send(user);
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
    }
}
</script>

<style scoped>

    .submit {
        cursor: pointer;
    }

    .submit:hover {
        background-color: rgb(223, 223, 223);
    }
    .container {
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
        margin: 15vh auto;
    }

    input {
        border-radius: 4px;
        margin: 12px;
        border: 2px solid black;
    }

    .inputs {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-content: center;
        height: 80%;
        max-width: 100%;
    }

    .usernamelabel::before {
        content: '';
        color: rgb(194, 89, 93);
        background-color: rgb(194, 89, 93);
        position: absolute;
        width: 76px;
        height: 2px;
        top: 170px;
    }

    .emaillabel::before {
        content: '';
        color: rgb(194, 89, 93);
        background-color: rgb(194, 89, 93);
        position: absolute;
        width: 44px;
        height: 2px;
        top: 236px;
    }

    .passwordlabel::before {
        content: '';
        color: rgb(194, 89, 93);
        background-color: rgb(194, 89, 93);
        position: absolute;
        width: 71px;
        height: 2px;
        top: 305px;
    }
</style>