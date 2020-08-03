<template>
    <div class="mb-5">
        <v-card class="elevation-4">
            <v-list dense>
            <v-subheader class="subtitle-2">{{title}}</v-subheader>
                <v-list-item
                v-for="(item, i) in dataset"
                :key="i"
                @click="$emit('EndpointClicked', item.endpoint)"
                >

            <v-tooltip top v-if="item.desc" color="pink">
                <template v-slot:activator="{ on }">
                    <div v-on="on">
                        <v-icon class="mr-2" medium color="pink">info</v-icon>
                    </div>
                </template>
                <span >{{item.desc}}</span>
            </v-tooltip>

                <v-list-item-content>
                    <v-layout row wrap class="px-4">
                        <v-flex xs2>
                        <v-chip
                            :color="item.status === 200 ? 'teal 1-darken' : 'pink'"
                            label
                            text-color="white"
                        >
                            {{item.status}}
                        </v-chip>
                        </v-flex>
                        <v-flex xs10 class="pa-2 body-2">{{item.endpoint}}</v-flex>
                    </v-layout>
                </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card>
    </div>
</template>

<script>
    export default {
        props: ['dataset', 'title'],
    }
</script>

<style lang="scss" scoped>

</style>