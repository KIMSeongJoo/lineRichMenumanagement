<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template #activator="{ on, attrs }">
        <v-btn color="success" dark v-bind="attrs" v-on="on" :disabled="btnDisplay"> Defaultに設定 </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5"> ディフォルトリッチーメニューとして設定 </v-card-title>
        <v-card-text>
          このリッチメニューを本当にディフォルトリッチーメニューとして設定しますか？ <br />
          {{ itemId }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="setDefaultRichmenu(itemId, 'no')">
            いいえ（リストに戻る）
          </v-btn>
          <v-btn color="green darken-1" text @click="setDefaultRichmenu(itemId, 'yes')">
            はい
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "DefaultRichmenu",
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
    btnDisplay: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    setDefaultRichmenu(id, choice) {
      if (choice === 'no') {
        console.log(id)
        // 設定しない
        this.dialog = false
      } else {
        // 設定する
        // https://api.line.me/v2/bot/user/all/richmenu/{richMenuId}
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.apiKey,
        }
        this.$axios
          .post('/v2/bot/user/all/richmenu/' + id, '', {
            headers,
          })
          .then(() => {
            // result
            this.dialog = false
            // 削除成功アラート
            Swal.fire({
              title: '成功',
              text: 'ディフォルトリッチーメニュー設定完了。',
              icon: 'success',
              confirmButtonText: 'Cool',
            })
          })
          .catch((e) => {
            Swal.fire({
              title: 'エラー',
              text: 'ディフォルトリッチーメニュー設定失敗。 \n エラー：' + e,
              icon: 'error',
              confirmButtonText: 'Cool',
            })
          })

      }
    }
  }

}
</script>

<style scoped>

</style>
