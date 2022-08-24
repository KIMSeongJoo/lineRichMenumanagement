<template>
  <v-row text-center>
    <v-col cols="12">
      <v-col cols="12">
        <label><h3>本文</h3></label>
        <v-textarea
          v-model="requestBody"
          filled
          label="json"
          auto-grow
        ></v-textarea>
      </v-col>
      <v-col cols="12">
        <label><h3>リッチメニューイメージ</h3></label>
        <v-file-input
          v-model="requestImage"
          truncate-length="15"
        ></v-file-input>
      </v-col>
      <v-col cols="12">
        <label><h3>作成環境設定</h3></label>
        <v-select
          v-model="envSelected"
          :items="envList"
          item-text="envName"
          item-value="apiKey"
          label="環境選択"
          solo
        ></v-select>
      </v-col>
      <v-col cols="12">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
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
              <v-icon dark> mdi-pencil </v-icon>
            </v-btn>
          </template>
          <span>作成</span>
        </v-tooltip>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'CreateLichMenu',
  data() {
    return {
      requestBody: null,
      requestImage: null,
      envSelected: null,
      envList: [
        {
          envName: '開発環境',
          apiKey: process.env.API_KEY_DEV,
        },
        {
          envName: '本番環境',
          apiKey: process.env.API_KEY_PROD,
        },
      ],
    }
  },
  methods: {
    create() {
      if (!this.validator()) {
        return
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.envSelected,
      }
      const reqBody = JSON.parse(this.requestBody)
      // create rich menu
      this.$axios
        .post('/v2/bot/richmenu', reqBody, { headers })
        .then((res) => {
          // success create
          // bind rich menu image
          const newId = res.data.richMenuId
          const uploadFile = this.requestImage
          headers['Content-Type'] = uploadFile.type

          this.$axios
            .post('/api/v2/bot/richmenu/' + newId + '/content', uploadFile, {
              headers,
            })
            .then((res) => {})
          Swal.fire({
            icon: 'success',
            title: '作成完了',
            text:
              'リッチメニュー登録、イメージの設定に成功しました。 \n id : ' +
              newId,
          }).catch(({ res }) => {
            Swal.fire({
              icon: 'error',
              title: 'イメージアップロード処理でエラーが発生しました。',
              text: res,
            })
          })
        })
        .catch(({ e }) => {
          if (e.response) {
            Swal.fire({
              icon: 'error',
              title: '作成処理にエラーが発生しました。',
              text: e,
            })
          }
        })
    },

    validator() {
      // json
      let errMessage = ''
      if (this.requestBody === '' || this.requestBody === null) {
        errMessage = 'json本文を入力してください'
      } else {
        try {
          JSON.parse(this.requestBody)
        } catch (err) {
          errMessage = '正しいJsonを入力してください。'
        }
      }

      // image
      if (this.requestImage === '' || this.requestImage === null) {
        errMessage = 'リッチメニューとして使うイメージを選択してください。'
      } else {
        // check file type
        const fileType = this.requestImage.type
        if (fileType !== 'image/png' && fileType !== 'image/jpeg') {
          errMessage = 'イメージは.pngまたは.jpegのみ利用可能です。'
        }
      }

      // 環境選択
      if (this.envSelected === '' || this.envSelected === null) {
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
    },
  },
}
</script>

<style scoped></style>
