<template>
    <button :type="type">{{ label }}</button>
</template>


<script>
export default {
    name: 'Button',
    props: {
        label: {
            required: true,
            type: String,
        },
        type: {
            default: 'button',
            type: String,
        },
    },
};
</script>


<style lang="sass" scoped>
button
    background: #07b
    border: 0
    border-radius: 0
    color: #fff
    cursor: pointer
    display: block
    margin: 0 auto
    outline: 0
    padding: 10px 12px
    transition: all .22s ease-in-out
    &:focus, &:hover
        background: #08c
</style>
