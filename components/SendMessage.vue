<template>
  <v-row>
    <v-col cols="12">
      <br />
      <label><b>作業環境: </b> {{ envInfo.name }}</label>
    </v-col>
    <v-col cols="12">
      <label><h3>本文</h3></label>
      <br />
      <v-textarea
        name="message-body"
        filled
        label="message"
        auto-grow
        value="json形でメッセージを入れてください"
      ></v-textarea>
    </v-col>
    <v-col cols="12">
      <label><h3>送信ユーザ</h3></label>
      <v-text-field
        v-model="targetUser"
        :counter="max"
        :rules="rules"
        label="LINE UID"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-btn elevation="2" large depressed color="primary">送信</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SendMessage',

  computed: {
    envInfo() {
      return this.$store.state.lines.envInfo
    }
  },

  method: {
    sendMessage(apiKey) {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + apiKey,
      }

      this.$axios
        .post('/api/v2/bot/message/push', {
          headers
        })
        .then((res) => {

        })
        .catch((e) => {

        })
    }
  }
}
</script>
<style scoped></style>
