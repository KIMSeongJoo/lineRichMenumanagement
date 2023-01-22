<template>
  <v-row align="center">
    <v-col cols="6">
      <v-subheader> 操作観葉 </v-subheader>
    </v-col>
    <v-col cols="6">
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
      <v-tabs>
        <v-tab @click="showPage('list')">リッチメニュー</v-tab>
        <v-tab @click="showPage('create')">新規作成</v-tab>
        <v-tab @click="showPage('message')">実機へのメッセージ送信確認</v-tab>
        <v-tab @click="showPage('user')">ユーザーへのリッチメニュ設定</v-tab>
        <v-tab @click="showPage('analysis')">チャンネルについて</v-tab>
      </v-tabs>
      <LineMain v-if="listDisplay" :api-key="apiKey" />
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
import SendMessage from '../components/sendMessage'
import UserRichmeu from '~/components/UserRichmeu'
import AnalysisChannel from '~/components/AnalysisChannel'

export default {
  name: 'IndexPage',
  components: { AnalysisChannel, SendMessage, UserRichmeu, LineMain, Create },
  data() {
    return {
      apiKey: '',
      listDisplay: false,
      createPage: false,
      sendMessagePage: false,
      userSetUp: false,
      analysis: false,
      envSelected: null,
      envList: [
        {
          envName: '開発環境',
          apiKey: 'dev',
        },
        {
          envName: '本番環境',
          apiKey: 'prod',
        },
      ],
    }
  },
  computed: {
    envInfo() {
      return this.$store.state.lines.envInfo
    },
  },
  watch: {
    envSelected(after, before) {
      this.setupEnvironmentInfo(after)
    },
  },
  mounted() {
    // default 設定
    // apikey = dev, list display = true
    this.envSelected = 'dev'
    this.apiKey = process.env.API_KEY_DEV
    this.listDisplay = true
  },
  methods: {
    setupEnvironmentInfo(name) {
      if (name === 'dev') {
        const payload = {
          envName: '開発環境',
          apiKey: process.env.API_KEY_DEV,
        }
        this.apiKey = process.env.API_KEY_DEV
        this.$store.commit('lines/setEnv', payload)
      } else {
        const payload = {
          envName: '本番環境',
          apiKey: process.env.API_KEY_DEV,
        }
        this.apiKey = process.env.API_KEY_PROD
        this.$store.commit('lines/setEnv', payload)
      }
    },

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
