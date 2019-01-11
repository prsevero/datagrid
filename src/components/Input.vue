<template>
    <label>
        <input :class="{'input-error': hasError}" :required="required" :type="type" :value="value" @input="$emit('input', $event.target.value)">
        <span>{{ label }}</span>
    </label>
</template>


<script>
export default {
    name: 'Input',
    props: {
        hasError: Boolean,
        label: {
            required: true,
            type: String,
        },
        required: Boolean,
        type: {
            required: true,
            type: String,
        },
        value: [String, Number],
    },
};
</script>

<style lang="sass" scoped>
label
    display: block
    margin: 0 0 20px
    position: relative
    span
        background: #fff
        color: #333
        cursor: text
        left: 5px
        padding: 0 4px
        pointer-events: none
        position: absolute
        top: 12px
        transition: all .15s ease-in-out

input
    appearance: none
    border: 1px solid #ccc
    border-radius: 0
    color: #333
    display: block
    outline: 0
    padding: 8px
    width: 100%
    transition: all .22s ease-in-out
    &.input-error
        border-color: #f00
    &:focus
        border-color: #777
    &:focus, &:valid
        ~ span
            color: #444
            font-size: .8em
            top: -9px
</style>
