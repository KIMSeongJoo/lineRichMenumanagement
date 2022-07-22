<template>
  <v-row>
    <div style="width: 100%">
      <div>
        <label>rich menu 本文を作成してください。</label>
        <v-textarea
          v-model="requestBody"
          filled
          label="json"
          auto-grow
        ></v-textarea>
      </div>
      <div>
        <label>リッチメニューイメージ</label>
          <v-file-input
            v-model="requestImage"
            truncate-length="15"
          ></v-file-input>
      </div>
      <div>
        <label>作成環境設定</label>
        <v-select v-model="envSelected"
          :items="envList"
          item-text="envName"
          item-value="apiKey"
          label="環境選択"
          solo
        ></v-select>
      </div>
      <div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-2"
              fab
              dark
              large
              color="cyan"
              v-bind="attrs"
              v-on="on"
              @click="create"
            >
              <v-icon dark>
                mdi-pencil
              </v-icon>
            </v-btn>
          </template>
          <span>作成</span>
        </v-tooltip>
      </div>
    </div>
  </v-row>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "CreateLichMenu",
  data() {
    return {
      requestBody :  null,
      requestImage : null,
      envSelected: null,
      envList : [
        {
          envName : "開発環境",
          apiKey : process.env.API_KEY_DEV
        },
        {
          envName : "本番環境",
          apiKey : process.env.API_KEY_PROD
        }
      ]
    }
  },
  methods: {
    create() {
      if (!this.validator()) {
        return
      }

      const headers = {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + this.envSelected
      }
      const reqBody = JSON.parse(this.requestBody)

      this.$axios.post('/v2/bot/richmenu', {
        reqBody
      }, {headers})
        .then(res => {
          console.log(res)
        })
        .catch( (e) => {
          console.log(e)
        })
    },

    validator() {
      let errMessage = ''
      if (this.requestBody === "" || this.requestBody === null ) {
        errMessage = 'json本文を入力してください'
      } else {
        try {
          JSON.parse(this.requestBody);
        } catch (err) {
          errMessage = '正しいJsonを入力してください。'
        }
      }

      if (this.requestImage === "" || this.requestImage === null) {
        errMessage = 'リッチメニューとして使うイメージを選択してください。'
      }

      if (this.envSelected === "" || this.envSelected === null ) {
        errMessage = '作成環境を選択してください。'
      }

      if (errMessage !== '') {
        Swal.fire({
          icon: 'error',
          title: 'エラーが発生しました。',
          text: errMessage,
        })
        return false
      }

      return true
    }
  }
}
</script>

<style scoped>

</style>
