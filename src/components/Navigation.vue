<template>
    <nav>
        <router-link to="/"><img alt="Company Name Logo" src="@/assets/logo.svg"></router-link>
        <router-link to="/logout">Logout</router-link>
    </nav>
</template>


<script>
export default {
    name: 'Navigation',
};
</script>


<style scoped lang="sass">
nav
    align-items: center
    background: #fff
    bottom: 0
    box-shadow: 0 0 5px rgba(0, 0, 0, .3)
    display: flex
    height: 50px
    justify-content: space-between
    left: 0
    padding: 3px 0 3px 5px
    position: fixed
    right: 0
    top: 0
    z-index: 1
    a
        color: #333
        font-size: 1.3em
        font-weight: 600
        outline: none
        text-decoration: none
        &:focus, &:hover
            color: #555
        &:first-child
            height: 100%
        &:last-child
            padding: 5px
    img
        height: 100%
</style>
