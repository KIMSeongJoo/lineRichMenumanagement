<template>
  <v-row>
    <!-- main message area -->
    <v-col cols="12">
      <label class="text-h4">本文</label>
      <v-divider class="pa-4"></v-divider>
      <v-textarea
        v-model="message"
        name="message-body"
        filled
        label="message"
        auto-grow
        :rules="rules"
        outlined
        :counter="2000"
        value="json形でメッセージを入れてください"
      ></v-textarea>
    </v-col>
    <!-- target user info area -->
    <v-col cols="12">
      <label class="text-h4">送信ユーザ</label>
      <v-text-field
        v-model="targetUser"
        :counter="64"
        :rules="lineUIDRules"
        label="送信ユーザーのLINE UIDを入力"
      ></v-text-field>
    </v-col>
    <!-- send button area -->
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
            @click="sendMessage"
          >
            <v-icon dark> mdi-pencil </v-icon>
          </v-btn>
        </template>
        <span>送信</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<script>
import SweetAlert from 'sweetalert2'

export default {
  name: 'SendMessage',
  data() {
    return {
      rules: [
        (v) => !!v || '本文は必須です',
        (v) => v.length <= 2000 || 'Max 1024 characters',
      ],
      lineUIDRules: [
        (v) => !!v || 'line uidは必須です',
        (v) =>
          (v && v.length <= 64) ||
          'line uidは最大64文字以内で入力してください。',
      ],
      targetUser: '',
      message: '',
    }
  },

  computed: {
    envInfo() {
      return this.$store.state.lines.envInfo
    },
  },

  methods: {
    validator() {
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

      if (errMessage !== '') {
        SweetAlert.fire({
          icon: 'error',
          title: 'エラーが発生しました。',
          text: errMessage,
        })
        return false
      }

      return true
    },
    sendMessage() {
      if (!this.validator()) {
        return false
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.envInfo.apiKey,
      }
      const messageList = []
      messageList.push(JSON.parse(this.message))

      const req = {
        to: this.targetUser,
        messages: messageList,
      }

      const reqBody = JSON.parse(JSON.stringify(req))

      this.$axios
        .post('/v2/bot/message/push', reqBody, {
          headers,
        })
        .then(() => {
          SweetAlert.fire({
            icon: 'success',
            title: '作成完了',
            text: 'メッセージ送信成功',
          })
        })
        .catch((e) => {
          SweetAlert.fire({
            icon: 'error',
            title: 'メッセージ送信に失敗しました。',
            text: e,
          })
        })
    },
  },
}
</script>
<style scoped></style>
