<template>

    <v-layout row wrap>
        <v-flex xs4>
            <v-list-item-title v-text="objKey"></v-list-item-title>
        </v-flex>
        <v-flex xs8>
            <div v-if="typeof objValue !== 'object'" 
                class="subtitle-2 font-weight-light longtext" v-text="objValue">
            </div>
            <div v-else class="mt-4">
                <object-data v-for="(v,k) in objValue" :key="k" :objKey="k" :objValue="v" />
            </div>  
        </v-flex>
    </v-layout>

</template>

<script>
    export default {
        name: 'object-data',
        props: ["objKey", "objValue"]
    }
</script>