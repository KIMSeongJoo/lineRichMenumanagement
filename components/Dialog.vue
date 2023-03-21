<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog transition="dialog-bottom-transition" max-width="1000px">
        <template #activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on"> Json </v-btn>
        </template>
        <template #default="dialog">
          <v-card>
            <v-toolbar color="primary" dark> JSON </v-toolbar>
            <v-card-text>
              <div class="pa-12">
                <pre>
                  {{JSON.stringify(jsonDetail, undefined, 2)}}
                </pre>
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog.value = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import 'vue-json-pretty/lib/styles.css';

export default {
  name: 'DialogComponent',
  props: {
    jsonDetail: {
      type: Object,
      required: true,
      default: Object
    }
  },
}
</script>

<style scoped>
pre {
  word-break:break-all
}
</style>
