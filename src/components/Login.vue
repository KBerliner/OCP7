<template>
    <div class="background">
        <article class="loginScreen">
            <form>
                <label>
                    Email:
                </label>
                <input type="email" v-model="email" class="txtinput" @change="validity" />
                <br />
                <label>
                    Password:
                </label>
                <input type="password" v-model="password" />
                <br />
                <input type="submit" @click="login" id="submitbtn" disabled />
            </form>
            <p class="error" v-if="error">Error, incorrect email or password</p>
            <p @click="login">Don't have an account?</p>
            <h3>
                <a href="#" @click="$emit('signup')">
                    Sign Up
                </a>
            </h3>
        </article>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            error: false
        }
    },
    created() {

        // This is to implement "User Persistence"

        if (localStorage) {
            if (localStorage.getItem('validToken')  && localStorage.getItem('validToken') !== undefined) {
                let key = JSON.stringify({ key: localStorage.getItem('validToken') });
                return new Promise((resolve, reject) => {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'http://localhost:3000/api/persist');
                    request.setRequestHeader('Content-Type', 'application/json');
                    request.send(key);
                    request.onreadystatechange = () => {
                        if (request.readyState == 4) {
                            if (request.status === 200 || request.status === 201) {
                                this.$emit('login', JSON.parse(request.response).userId, JSON.parse(request.response).username, JSON.parse(request.response).token);
                                resolve(JSON.parse(request.response));
                            }
                        }
                    }
                });
            }
        }
    },
    methods: {
        validity() {
            let field = document.getElementsByClassName('txtinput');
            let regexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            console.log('Testing...', field[0]);
            if (regexp.test(field[0].value)) {
                console.log('Valid Email');
                document.getElementById('submitbtn').removeAttribute('disabled');
            } else {
                console.log('No Worko');
            }
        },
        login($event) {
            $event.preventDefault();
            let user = JSON.stringify({ email: this.email, password: this.password });
            return new Promise((resolve, reject) => {
                let request = new XMLHttpRequest();
                request.open('POST', 'http://localhost:3000/api/login');
                request.setRequestHeader('Content-Type', 'application/json');
                request.send(user);
                request.onreadystatechange = () => {
                    if (request.readyState == 4) {
                        if (request.status === 200 || request.status === 201) {
                            this.error = false;
                            this.$emit('login', JSON.parse(request.response).userId, JSON.parse(request.response).username, JSON.parse(request.response).token);
                            resolve(JSON.parse(request.response));
                        } else {
                            this.error = true;
                        }
                    }
                }
            });
        }
    }
}
</script>


<style scoped>
    .background {
        width: 100vw;
        height: 100vh;
        z-index: 5;
        background-color: rgba(72, 72, 72, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
    }

    .loginScreen {
        width: 40vw;
        height: 60vh;
        background-color: white;
        border: 2px solid gray;
        border-radius: 8px;
    }

    .error {
        color: red;
    }
</style> 