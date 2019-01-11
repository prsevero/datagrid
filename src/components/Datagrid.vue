<template>
    <table>
        <thead v-if="headers && itemKeys.length">
            <tr>
                <th v-for="(key, index) in itemKeys" :key="index" :style="key.style" @click="sort(key)">
                    <span v-if="!keyIsObject(key)">{{ headers[key] }}</span>
                    <span v-else>{{ headers[key.key] }}</span>
                    <img src="./arrow.svg" v-if="isSorted(key)" :class="{desc: sortedBy.desc}" />
                </th>
            </tr>

            <tr>
                <th v-for="(key, index) in itemKeys" :key="index">
                    <span v-if="!keyIsObject(key)">
                        <input placeholder="Filter" type="text" v-model="filters[key]" @input="filter(key)" />
                    </span>
                    <span v-else>
                        <input placeholder="Filter" type="text" v-model="filters[key.key]" @input="filter(key.key)" />
                    </span>
                </th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(item, index) in internalItems" :key="index">
                <td v-for="(key, index) in itemKeys" :key="index" :style="[key.style, key.tdStyle]">
                    <span v-if="!keyIsObject(key)">{{ item[key] }}</span>
                    <span v-else>
                        <input type="text"
                            v-if="key.editable"
                            v-model="item[key.key]"
                            @blur="onSave"
                            @input="onInput"
                            @keyup.enter="onSave" />
                        <span v-else>{{ call(key, item) }}</span>
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>


<script>
import moment from 'moment';

let isFiltered = false,
    shouldSave = false;

export default {
    name: 'Datagrid',
    data() {
        return {
            internalItems: [],
            filters: [],
            sortedBy: {},
        };
    },
    props: {
        headers: Array,
        items: {
            required: true,
            type: Array,
        },
        itemKeys: {
            required: true,
            type: Array,
        },
        save: Function,
    },
    computed: {
        call() {
            return (key, item) => {
                if (key.fn === 'format') {
                    if (key.type === 'date')
                        return this.formatDate(item[key.key], key.format);
                }

                return item[key.key];
            };
        },
        formatDate() {
            return (date, format = 'DD/MM/YYYY HH:mm:ss') =>
                moment(date).format(format);
        },
        keyIsObject() {
            return key => typeof key === 'object';
        },
    },
    methods: {
        isSorted(key) {
            return (
                key === this.sortedBy.key ||
                (this.sortedBy.key && key.key === this.sortedBy.key)
            );
        },
        onInput() {
            shouldSave = true;
        },
        onSave() {
            if (shouldSave) {
                shouldSave = false;
                this.save(this.internalItems);
            }
        },
        filter() {
            let itemsToFilter = this.items;
            isFiltered = false;

            this.filters.map((filter, i) => {
                if (filter !== undefined) {
                    isFiltered = true;
                    filter =
                        typeof filter === 'string'
                            ? filter.toLowerCase()
                            : filter;

                    this.internalItems = itemsToFilter.filter(item => {
                        let value = item[i];
                        if (typeof value === 'string') {
                            value = value.toLowerCase();
                            return value.indexOf(filter) >= 0;
                        } else return value === filter;
                    });
                    itemsToFilter = this.internalItems;
                }
            });

            if (!isFiltered) this.internalItems = [...this.items];
            this.sort(this.sortedBy, false);
        },
        sort(by, changeOrder = true) {
            if (by !== undefined) {
                if (!this.keyIsObject(by)) by = {key: by};

                const isNumber =
                    by.type &&
                    (by.type === 'float' ||
                        by.type === 'int' ||
                        by.type === 'number');

                this.internalItems.sort((valueA, valueB) => {
                    let a = valueA[by.key],
                        b = valueB[by.key];

                    if (isNumber) {
                        a = parseFloat(a);
                        b = parseFloat(b);
                    }

                    return a > b ? 1 : a < b ? -1 : 0;
                });

                if (changeOrder)
                    by.desc =
                        by.key === this.sortedBy.key && !this.sortedBy.desc;
                if (by.desc) this.internalItems.reverse();

                this.sortedBy = by;
                if (!isFiltered) this.save(this.internalItems);
            }
        },
    },
    mounted() {
        this.internalItems = [...this.items];
    },
};
</script>


<style scoped lang="sass">
table
    border: 0
    border-collapse: collapse
    font-size: 14px
    position: relative
    width: 100%

    // Sticky headers
    th
        position: sticky
    thead tr
        &:first-child th
            top: 50px
        &:last-child th
            padding-top: 0
            top: 82px
    // /Sticky headers

    td
        padding: 8px

    thead, th
        background: #000
    tbody
        background: #ddd
    th
        color: #fff
        padding: 8px 8px 12px
        text-align: left
    thead tr:first-child th
        cursor: pointer
        padding-top: 15px
        img
            display: inline-block
            margin-left: 4px
            vertical-align: middle
            width: 12px
            transform: rotate(90deg)
            &.desc
                transform: rotate(-90deg)

    tbody tr
        &:nth-child(odd),
        &:nth-child(odd) input
            background: #f7f7f7
        &:nth-child(odd) input
            border-color: #f7f7f7
        &:nth-child(even),
        &:nth-child(even) input
            background: #eaeaea
        &:nth-child(even) input
            border-color: #eaeaea
        &:hover,
        &:hover input
            background: #ddd
        &:hover input
            border-color: #ddd

    input
        appearance: none
        border: 1px solid transparent
        border-radius: 0
        outline: 0
        padding: 4px 6px
        text-overflow: ellipsis
        width: 100%

    tbody tr:nth-child(odd) td input,
    tbody tr:nth-child(even) td input
        cursor: pointer
        @media (pointer: coarse)
            border-color: #ccc
        &:focus
            background: #fff
            border-color: #bbb
            transition: all .22s ease-in-out
</style>
