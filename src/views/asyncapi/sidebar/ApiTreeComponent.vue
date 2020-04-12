<template>
  <v-card>
    <v-list dense nav subheader>
      <v-list-item>
        <v-list-item-action>
          <v-icon>fa-home</v-icon>
        </v-list-item-action>
        <v-list-item-title>Info</v-list-item-title>
      </v-list-item>

      <v-list-group :value="false">
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon>fa-server</v-icon>
          </v-list-item-action>
          <v-list-item-title>Servers</v-list-item-title>
        </template>

        <v-list-item>
          <v-list-item-title>server name</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>server name</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group :value="false">
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon>mdi-apache-kafka</v-icon>
          </v-list-item-action>
          <v-list-item-title>Channels</v-list-item-title>
        </template>

        <v-list-item>
          <v-list-item-title>channel/${param}/name</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-subheader>
        Components
        <v-icon>mdi-apps</v-icon>
      </v-subheader>
      <v-list-group :value="false">
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon>mdi-forum</v-icon>
          </v-list-item-action>
          <v-list-item-title>Messages</v-list-item-title>
        </template>

        <v-list-item>
          <v-list-item-title>#/components/messages/Message</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group :value="false">
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon>mdi-forum</v-icon>
          </v-list-item-action>
          <v-list-item-title>Schemas</v-list-item-title>
        </template>

        <v-list-item>
          <v-list-item-title>#/components/schemas/Schema</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group :value="false">
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon>mdi-forum</v-icon>
          </v-list-item-action>
          <v-list-item-title>Parameters</v-list-item-title>
        </template>

        <v-list-item>
          <v-list-item-title>#/components/parameters/parameter</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group :value="false">
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon>mdi-forum</v-icon>
          </v-list-item-action>
          <v-list-item-title>Security Schemes</v-list-item-title>
        </template>

        <v-list-item>
          <v-list-item-title>#/components/securitySchemes/securityScheme</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group :value="false">
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon>mdi-forum</v-icon>
          </v-list-item-action>
          <v-list-item-title>Correlation Ids</v-list-item-title>
        </template>

        <v-list-item>
          <v-list-item-title>#/components/correlationIds/correlationId</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group :value="false">
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon>mdi-forum</v-icon>
          </v-list-item-action>
          <v-list-item-title>Operation Traits</v-list-item-title>
        </template>

        <v-list-item>
          <v-list-item-title>#/components/operationTraits/operationTrait</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group :value="false">
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon>mdi-forum</v-icon>
          </v-list-item-action>
          <v-list-item-title>Message Traits</v-list-item-title>
        </template>

        <v-list-item>
          <v-list-item-title>#/components/messageTraits/messageTrait</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group :value="false">
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon>mdi-forum</v-icon>
          </v-list-item-action>
          <v-list-item-title>serverBindings</v-list-item-title>
        </template>

        <v-list-item>
          <v-list-item-title>#/components/serverBindings/serverBinding</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group :value="false">
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon>mdi-forum</v-icon>
          </v-list-item-action>
          <v-list-item-title>channelBindings</v-list-item-title>
        </template>

        <v-list-item>
          <v-list-item-title>#/components/channelBindings/channelBinding</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group :value="false">
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon>mdi-forum</v-icon>
          </v-list-item-action>
          <v-list-item-title>operationBindings</v-list-item-title>
        </template>

        <v-list-item>
          <v-list-item-title>#/components/operationBindings/operationBinding</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group :value="false">
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon>mdi-forum</v-icon>
          </v-list-item-action>
          <v-list-item-title>messageBindings</v-list-item-title>
        </template>

        <v-list-item>
          <v-list-item-title>#/components/messageBindings/messageBinding</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class ApiTreeComponent extends Vue {}
</script>
