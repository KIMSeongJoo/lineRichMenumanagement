<template>
  <v-row text-center>
    <v-col cols="12">
      <!-- textarea -->
      <v-col cols="auto" class="pa-2">
        <label class="text-h4">本文</label>
        <v-textarea
          v-model="requestBody"
          filled
          label="json"
          auto-grow
          outlined
          rules="rules"
          :counter="4000"
        ></v-textarea>
      </v-col>

      <!-- image select area -->
      <v-col cols="12">
        <label class="text-h4">リッチメニューイメージ</label>
        <v-file-input
          v-model="requestImage"
          truncate-length="15"
        ></v-file-input>
      </v-col>

      <!-- default richmenu checkbox-->
      <v-col cols="12">
        <v-checkbox
          v-model="defaultRichmenu"
          :label="`デフォルトリッチーメニューとして設定`"
        ></v-checkbox>
      </v-col>

      <!-- send button -->
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
      rules: [
        v => !!v || '本文は必須です',
        v => v.length <= 2000 || 'Max 1024 characters'
      ],
      lineUIDRules: [
        v => !!v || 'line uidは必須です',
        v => (v && v.length <= 64) || 'line uidは最大64文字以内で入力してください。',
      ],
      requestBody: null,
      requestImage: null,
      defaultRichmenu: false,
    }
  },
  computed: {
    envInfo() {
      return this.$store.state.lines.envInfo()
    },
  },
  methods: {
    create() {
      if (!this.validator()) {
        return
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.envInfo.apiKey,
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
          // link image
          this.$axios
            .post('/api/v2/bot/richmenu/' + newId + '/content', uploadFile, {
              headers,
            })
            .then((res) => {
              if (this.defaultRichmenu === true) {
                this.$axios
                  .post('v2/bot/user/all/richmenu/' + newId, '', { headers })
                  .then(() => {
                    Swal.fire({
                      icon: 'success',
                      title: '作成完了',
                      text:
                        'リッチメニュー登録、イメージの設定、ディフォルト設定に成功しました。 \n id : ' +
                        newId,
                    })
                  })
                  .catch(({ e }) => {
                    Swal.fire({
                      icon: 'error',
                      title: 'ディフォルトリッチーメニュー設定に失敗しました。',
                      text: e,
                    })
                  })
              } else {
                Swal.fire({
                  icon: 'success',
                  title: '作成完了',
                  text:
                    'リッチメニュー登録、イメージの設定に成功しました。 \n id : ' +
                    newId,
                })
              }
            })
            .catch(({ res }) => {
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
