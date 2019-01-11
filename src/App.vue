<template>
    <div id="app" :class="appRouteClass">
        <Navigation />
        <router-view />
    </div>
</template>


<script>
import Navigation from '@/components/Navigation.vue';

export default {
    name: 'app',
    components: {
        Navigation,
    },
    computed: {
        appRouteClass() {
            return `route${
                this.$route && this.$route.name ? '-' + this.$route.name : ''
            }`;
        },
    },
};
</script>


<style lang="sass">
*
    box-sizing: border-box

body
    margin: 0
    padding: 0

#app,
button,
input
    font-family: "Avenir", Helvetica, Arial, sans-serif
    line-height: 1

button,
input
    font-size: 1em

a
    transition: all .22s ease-in-out

#app
    font-size: 10px
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    &.route-login nav
        display: none
    &:not(.route-login)
        padding-top: 50px
</style>
