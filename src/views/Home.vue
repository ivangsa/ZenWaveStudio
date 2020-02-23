<template>
    <v-layout align-center justify-center>
        <v-flex shrink>
            <v-file-input v-model="file" @change="onOpenFile(this)" accept=".yml, .yaml" label="Open an AsyncAPI Definition file ..." />
            <v-card max-width="600" class="mx-auto">
                <v-toolbar color="light-blue" dark>
                    <v-toolbar-title>Open Recent</v-toolbar-title>
                </v-toolbar>
                <v-list two-line subheader>
                    <v-list-item v-for="item in items" :key="item.title">
                        <v-list-item-avatar>
                            <v-icon :class="[item.iconClass]" v-text="item.icon"></v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                            <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn icon>
                                <v-icon color="grey lighten-1">mdi-information</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script lang="ts" src="./Home.ts"></script>
