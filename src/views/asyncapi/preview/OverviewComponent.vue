<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            {{ api.info.title }}
            <v-spacer></v-spacer>
            <span>v {{ api.info.version }}</span>
          </v-card-title>
          <v-card-subtitle>
            <pre>{{ api.info.description }}</pre>
          </v-card-subtitle>
          <v-card-text>
            <span v-if="api.info.license">{{ api.info.license.name }}</span>
            <v-spacer></v-spacer>
            <span v-if="api.info.contact">{{ api.info.contact.name }} &lt;{{ api.info.contact.email }}&gt;</span>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title>Servers</v-card-title>
          <v-card-text>
            <v-card v-for="(server, name) in api.servers" :key="name">
              <v-card-title>{{ name }} ({{ server.protocol }}) {{ server.url }}</v-card-title>
              <v-card-subtitle>{{ server.description }}</v-card-subtitle>
            </v-card>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title>Channels</v-card-title>
          <v-card-text>
            <v-expansion-panels multiple inset focusable>
              <v-expansion-panel v-for="(channel, name) in api.channels" :key="name">
                <v-expansion-panel-header>{{ name }}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  {{ channel.description }}

                  <v-card v-if="channel.publish">
                    <v-card-title><v-icon>mdi-arrow-right-bold-hexagon-outline</v-icon> {{ channel.publish.operationId }}</v-card-title>
                    <v-card-subtitle>{{ channel.publish.summary }}</v-card-subtitle>
                    <v-card-text>
                      <p v-if="channel.publish.message">Message: {{ channel.publish.message.original$ref }}</p>
                      <p v-if="channel.publish.message.payload">Payload: {{ channel.publish.message.payload.original$ref }}</p>
                    </v-card-text>
                  </v-card>
                  <v-card v-if="channel.subscribe">
                    <v-card-title> <v-icon>mdi-arrow-right-bold-hexagon-outline</v-icon> {{ channel.subscribe.operationId }} </v-card-title>
                    <v-card-subtitle>{{ channel.subscribe.summary }}</v-card-subtitle>
                    <v-card-text>
                      <p v-if="channel.subscribe.message">Message: {{ channel.subscribe.message.original$ref }}</p>
                      <p v-if="channel.subscribe.message.payload">Payload: {{ channel.subscribe.message.payload.original$ref }}</p>
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-title>Components</v-card-title>
          <v-card-text>
            <v-card>
              <v-card-title>messages</v-card-title>
              <v-card-subtitle></v-card-subtitle>
            </v-card>

            <v-card>
              <v-card-title>schemas</v-card-title>
              <v-card-subtitle></v-card-subtitle>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AsyncAPI } from '@/model/specs/asyncapi/Asyncapi';

@Component
export default class OverviewComponent extends Vue {
  panel = [];
  items = 5;
  get api() {
    return this.$asyncapiState.apiFile?.api;
  }
}
</script>
