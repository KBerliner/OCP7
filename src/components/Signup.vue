<template>
    <form>
        <label>
            Username:
        </label>
        <input type="text" v-model="username">
        <label>
            Email:
        </label>
        <input type="email" v-model="email">
        <label>
            Password:
        </label>
        <input type="password" v-model="password">
        <input type="submit" @click="submit">
    </form>
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

</style>