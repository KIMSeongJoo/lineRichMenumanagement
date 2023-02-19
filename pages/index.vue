<template>
  <v-row align="center">
    <CommonHeader />
    <v-col cols="12" class="pa-0">
      <v-tabs cols="auto" class="pa-0">
        <v-tab @click="showPage('list')">リッチメニュー</v-tab>
        <v-tab @click="showPage('create')">新規作成</v-tab>
        <v-tab @click="showPage('message')">実機へのメッセージ送信確認</v-tab>
        <v-tab @click="showPage('user')">ユーザーへのリッチメニュ設定</v-tab>
        <v-tab @click="showPage('analysis')">チャンネルについて</v-tab>
      </v-tabs>
      <v-divider class="pa-2"></v-divider>
      <LineMain v-if="listDisplay" />
      <Create v-if="createPage" />
      <SendMessage v-if="sendMessagePage" />
      <UserRichmeu v-if="userSetUp" />
      <AnalysisChannel v-if="analysis" />
    </v-col>
  </v-row>
</template>

<script>
import LineMain from '../components/LineMain'
import Create from '../components/Create'
import SendMessage from '../components/SendMessage'
import UserRichmeu from '~/components/UserRichmeu'
import AnalysisChannel from '~/components/AnalysisChannel'
import CommonHeader from '~/components/CommonHeader.vue'

export default {
  name: 'IndexPage',
  components: {
    CommonHeader,
    AnalysisChannel,
    SendMessage,
    UserRichmeu,
    LineMain,
    Create,
  },
  data() {
    return {
      listDisplay: false,
      createPage: false,
      sendMessagePage: false,
      userSetUp: false,
      analysis: false,
    }
  },
  mounted() {
    // default 設定
    const payload = {
      envName: '開発環境',
      apiKey: process.env.API_KEY_DEV,
      nameKey: 'dev',
    }
    this.$store.commit('lines/setEnv', payload)
    this.listDisplay = true
  },
  methods: {
    showPage(page) {
      this.listDisplay = false
      this.createPage = false
      this.sendMessagePage = false
      this.userSetUp = false
      this.analysis = false

      switch (page) {
        case 'list':
          this.listDisplay = true
          break
        case 'create':
          this.createPage = true
          break
        case 'message':
          this.sendMessagePage = true
          break
        case 'user':
          this.userSetUp = true
          break
        case 'analysis':
          this.analysis = true
      }
    },
  },
}
</script>
