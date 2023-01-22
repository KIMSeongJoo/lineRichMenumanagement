<template>
  <v-row>
    <!-- main message area -->
    <v-col cols="12">
      <label lg>本文</label>
      <br />
      <v-textarea
        name="message-body"
        filled
        label="message"
        auto-grow
        value="json形でメッセージを入れてください"
      ></v-textarea>
    </v-col>
    <!-- target user info area -->
    <v-col cols="12">
      <label><h3>送信ユーザ</h3></label>
      <v-text-field
        v-model="targetUser"
        :counter="max"
        :rules="rules"
        label="LINE UID"
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
import Swal from 'sweetalert2'

export default {
  name: 'SendMessage',
  data() {
    return {
      targetUser: '',
      message: null,
    }
  },

  computed: {
    envInfo() {
      return this.$store.state.lines.envInfo
    },
  },

  methods: {
    sendMessage() {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.envInfo.apiKey,
      }
      const reqBody = JSON.parse(this.message)

      this.$axios
        .post('/api/v2/bot/message/push', reqBody, {
          headers,
        })
        .then((res) => {
          Swal.fire({
            icon: 'success',
            title: '作成完了',
            text: 'メッセージ送信成功',
          })
        })
        .catch((e) => {
          Swal.fire({
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
