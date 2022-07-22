<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="error"
          dark
          v-bind="attrs"
          v-on="on"
        >
          削除
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Use Google's location service?
        </v-card-title>
        <v-card-text>
          delete this richmemu
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="deleteItem(itemId, 'no')"
          >
            Disagree
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="deleteItem(itemId, 'yes')"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "DeleteDialog",
  props: ['itemId'],
  data () {
    return {
      dialog: false,
    }
  },
  methods: {
    deleteItem(id, choice) {
      if (choice === 'no') {
        this.dialog = false;
      }
    }
  }
}
</script>

<style scoped>

</style>
