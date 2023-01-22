<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template #activator="{ on, attrs }">
        <v-btn color="error" dark v-bind="attrs" v-on="on"> 削除 </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5"> リッチメニュー削除 </v-card-title>
        <v-card-text>
          このリッチメニューを本当に削除しますか？ <br />
          {{ itemId }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="deleteItem(itemId, 'no')">
            いいえ（リストに戻る）
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteItem(itemId, 'yes')">
            はい（削除）
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'DeleteDialog',
  props: {
    itemId: {
      type: String,
      required: true,
      default: '',
    },
    apiKey: {
      type: String,
      required: true,
      default: '',
    },
    indexId: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    deleteItem(id, choice) {
      if (choice === 'no') {
        this.dialog = false
      } else {
        // delete => yes
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.apiKey,
        }
        this.$axios
          .delete('/v2/bot/richmenu/' + id, {
            headers,
          })
          .then((res) => {
            // result
            this.dialog = false
            // 削除成功アラート
            Swal.fire({
              title: '成功',
              text: '該当リッチメニューを削除しました。',
              icon: 'success',
              confirmButtonText: 'Cool',
            })
            // 削除対象をリストから削除
            this.$store.commit('richmenu/remove', this.indexId)
          })
          .catch((e) => {
            Swal.fire({
              title: 'エラー',
              text: '削除に失敗しました。 \n エラー：' + e,
              icon: 'error',
              confirmButtonText: 'Cool',
            })
          })
      }
    },
  },
}
</script>

<style scoped></style>
