<template>
  <v-row align="center">
    <v-tabs>
      <!-- <v-tab @click="setupEnvironmentInfo('dev')">リッチメニュー【開発環境】</v-tab>
      <v-tab @click="setupEnvironmentInfo('prod')">リッチメニュー【本番環境】</v-tab>
      <v-tab @click="showCreatePage()">新規作成</v-tab> -->
      <v-tab>実機へのメッセージ送信確認</v-tab>
      <v-tab>ユーザーへのリッチメニュ設定</v-tab>
    </v-tabs>
    <LineMain v-if="listDisplay" :api-key="apiKey" />
    <Create v-if="createPage" />
    <SendMessage />
  </v-row>
</template>

<script>
import LineMain from '../components/LineMain'
import Create from '../components/Create'
import SendMessage from '../components/sendMessage'

export default {
  name: 'IndexPage',
  components: { LineMain, Create, SendMessage },
  data() {
    return {
      apiKey: '',
      listDisplay: false,
      createPage: false,
    }
  },
  mounted() {
    // this.apiKey = process.env.API_KEY_DEV
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

    showCreatePage() {
      this.createPage = true
      this.listDisplay = false
    },
  },
}
</script>
