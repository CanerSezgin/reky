<template>
    <v-card>
        <v-list dense>
            <v-layout row wrap>
                <v-flex class="px-5" xs12 md6 v-for="(data, key, i) in singleData"
                        :key="key" :style="i%2==0 ? 'border-right: 2px solid #00897B;' : ''">
                    <v-list-item @click="">
                        <v-layout row wrap>
                            <v-flex xs4>
                                <v-list-item-title v-text="key"></v-list-item-title>
                            </v-flex>
                            <v-flex xs8>
                                <div class="subtitle-2 font-weight-light longtext" v-text="data"></div>
                            </v-flex>
                        </v-layout>
                    </v-list-item>
                </v-flex>
            </v-layout>
        </v-list>
    </v-card>
</template>

<script>
    export default {
        props: ['singleData']
    }
</script>

<style lang="scss" scoped>

</style>