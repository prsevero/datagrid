<template>
    <div id="login">
        <form novalidate @submit.prevent="onSubmit">
            <img alt="Company Name Logo" src="../assets/logo.svg" />
            <Input label="Username" type="text" :has-error="!hasUsername" :required="true" v-model="username" />
            <Input label="Password" type="password" :has-error="!hasPassword" :required="true" v-model="password" />
            <Button label="Enter" type="submit" />
        </form>
    </div>
</template>


<script>
import Button from '@/components/Button.vue';
import Input from '@/components/Input.vue';

export default {
    name: 'login',
    components: {Button, Input},
    data() {
        return {
            password: '',
            submitted: false,
            username: '',
        };
    },
    computed: {
        hasPassword() {
            return !this.submitted || this.password !== '';
        },
        hasUsername() {
            return !this.submitted || this.username !== '';
        },
    },
    methods: {
        isLoggedIn() {
            return localStorage.getItem('token');
        },
        login(token) {
            localStorage.setItem('token', token);
        },
        logout() {
            localStorage.removeItem('token');
        },
        onSubmit() {
            this.submitted = true;
            if (this.username && this.password) {
                this.login('SAMPLE_TOKEN');
                this.$router.replace({path: '/'});
            }
        },
    },
    mounted() {
        if (this.$router.history.current.redirectedFrom === '/logout')
            this.logout();
        else if (this.isLoggedIn()) this.$router.replace({path: '/'});
    },
};
</script>


<style lang="sass" scoped>
#login
    align-items: center
    bottom: 100px
    display: flex
    left: 0
    justify-content: center
    position: absolute
    right: 0
    top: 0

form
    flex: 1 0 0
    font-size: 1.6em
    max-width: 320px
    padding: 0 15px

    img
        display: block
        margin: 0 auto 20px
        max-width: 75px
</style>
