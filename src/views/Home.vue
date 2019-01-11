<template>
    <div class="home">
        <Datagrid v-if="!isLoading" :headers="headers" :items="items" :item-keys="itemKeys" :save="save" />
        <Loading v-else />
    </div>
</template>

<script>
import Datagrid from '@/components/Datagrid.vue';
import Loading from '@/components/Loading.vue';

let href = window.location.origin;
if (href.substr(-1) !== '/') href += '/';
if (process.env.NODE_ENV === 'development') href = href.replace('8080', '8081');
const dataUrl = `${href}data`;

export default {
    name: 'home',
    data() {
        return {
            headers: [],
            isLoading: true,
            itemKeys: [
                1,
                {editable: true, key: 2},
                {fn: 'format', key: 3, type: 'date'},
                {
                    key: 4,
                    style: {width: '90px'},
                    tdStyle: {textAlign: 'right'},
                    type: 'float',
                },
            ],
            items: [],
        };
    },
    components: {Datagrid, Loading},
    methods: {
        save(data) {
            this.items = [...data];
            data = [...data];
            data.unshift(this.headers);

            (async () => {
                const response = await fetch(dataUrl, {
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                }).catch(error => {
                    // Handle error
                    // console.error(result);
                    return error;
                });
                const result = await response;

                if (result.status !== 200) {
                    // Handle error
                    // console.error(result);
                }
            })();
        },
    },
    mounted() {
        fetch(dataUrl)
            .then(response => response.json())
            .then(data => {
                this.isLoading = false;
                this.headers = data.splice(0, 1)[0];
                this.items = data;
            })
            .catch(() => {
                this.isLoading = false;
                // Handle error
                // console.error(error);
            });
    },
};
</script>
