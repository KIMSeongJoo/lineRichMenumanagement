<template>
  <v-row align="center">
    <h3>line lich menu management page</h3>
    <v-tabs>
      <v-tab @click="setupEnvironmentInfo('dev')">開発環境</v-tab>
      <v-tab @click="setupEnvironmentInfo('prod')">本番環境</v-tab>
      <v-tab>新規作成</v-tab>
    </v-tabs>
    <LineMain :apiKey="apiKey" v-if="listDisplay"/>
    <Create/>
  </v-row>
</template>

<script>
import LineMain from '../components/LineMain'
import Create from '../components/Create'
export default {
  name: 'IndexPage',
  components : { LineMain, Create },
  data() {
    return {
      apiKey : '',
      listDisplay : false,
      createPage : false,
    }
  },
  mounted() {
    this.apiKey = process.env.API_KEY_DEV
  },
  methods: {
    setupEnvironmentInfo(name) {
      if (name === 'dev') {
        this.apiKey = process.env.API_KEY_DEV
      } else {
        this.apiKey = process.env.API_KEY_PROD
      }
      this.listDisplay = true
    },

    showCreatePage() {

    }
  }
}
</script>
