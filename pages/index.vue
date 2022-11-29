<template>
  <v-row align="center">
    <v-tabs>
      <v-tab @click="setupEnvironmentInfo('dev')">リッチメニュー【開発環境】</v-tab>
      <v-tab @click="setupEnvironmentInfo('prod')">リッチメニュー【本番環境】</v-tab>
      <v-tab @click="showCreatePage('create')">新規作成</v-tab>
      <v-tab @click="showCreatePage('message')">実機へのメッセージ送信確認</v-tab>
      <v-tab @click="showCreatePage('user')">ユーザーへのリッチメニュ設定</v-tab>
    </v-tabs>
    <LineMain v-if="listDisplay" :api-key="apiKey" />
    <Create v-if="createPage" />
    <SendMessage v-if="sendMessagePage"/>
    <UserRichmeu v-if="userSetUp"/>
  </v-row>
</template>

<script>
import LineMain from '../components/LineMain'
import Create from '../components/Create'
import SendMessage from '../components/sendMessage'
import UserRichmeu from "~/components/UserRichmeu";

export default {
  name: 'IndexPage',
  components: { SendMessage, UserRichmeu, LineMain, Create },
  data() {
    return {
      apiKey: '',
      listDisplay: false,
      createPage: false,
      sendMessagePage: false,
      userSetUp: false,
    }
  },
  mounted() {
    this.apiKey = process.env.API_KEY_DEV
    this.listDisplay = true
  },
  methods: {
    setupEnvironmentInfo(name) {
      if (name === 'dev') {
        this.apiKey = process.env.API_KEY_DEV
      } else {
        this.apiKey = process.env.API_KEY_PROD
      }
      this.listDisplay = true
      this.createPage = false
    },

    showCreatePage(page) {
      this.createPage = false
      this.listDisplay = false
      this.sendMessagePage = false
      this.userSetUp = false

      switch (page){
        case "create":
          this.createPage = true
          break;
        case "message":
          this.sendMessagePage = true;
          break;
        case "user":
          this.userSetUp = true;
      }
    },
  },
}
</script>
