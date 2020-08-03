<template>
    <v-card>
        <v-list dense>
            <v-layout row wrap>
                <v-flex class="px-5" xs12 md6 v-for="(data, key, i) in singleData"
                        :key="key" :style="i%2==0 ? 'border-right: 2px solid #00897B;' : ''">
                    <v-list-item @click="">
                        <ObjectData :objKey="key" :objValue="data" />
                    </v-list-item>
                </v-flex>
            </v-layout>
        </v-list>
    </v-card>
</template>

<script>
import ObjectData from "@/components/ObjectData"
    export default {
        components: { ObjectData },
        props: ['singleData']
    }
</script>

<style lang="scss" scoped>

</style>