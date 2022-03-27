<template>
  <v-row align="center">
    <v-card
      elevation="1"
    >
      <p> 環境選択 </p>
      <v-btn
        color="accent"
        elevation="12"
        rounded
        @click="setupEnvironmentInfo('dev')"
      >開発環境</v-btn>
      <v-btn
        color="accent"
        elevation="12"
        rounded
        @click="setupEnvironmentInfo('prod')"
      > 本番環境 </v-btn>
    </v-card>
    <div v-if="display === false">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      />
    </div>
    <div v-if="display">
      <LineMain :apiKey="apiKey"/>
    </div>
  </v-row>
</template>

<script>
import LineMain from '../components/LineMain'
export default{
  name: 'IndexPage',
  components : { LineMain },
  data() {
    return {
      display : false,
      apiKey : '',
    }
  },
  methods: {
    setupEnvironmentInfo(name) {
      if (name === 'dev') {
        this.apiKey = process.env.API_KEY_DEV
      } else {
        this.apiKey = process.env.API_KEY_PROD
      }
      this.display = true
    }
  }
}
</script>
