<template>
  <v-row
    justify="space-between"
    class="d-flex align-center"
  >
    <v-col cols="auto">
      <span class="text-md-h4"> 操作環境</span>
    </v-col>
    <v-col cols="auto">
      <v-select
        v-model="envSelected"
        :items="envList"
        item-text="envName"
        item-value="apiKey"
        label="環境選択"
        solo
        ></v-select>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "CommonHeader",
  data() {
    return {
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
  methods: {
    setupEnvironmentInfo(name) {
      if (name === 'prod') {
        const payload = {
          envName: '本番環境',
          apiKey: process.env.API_KEY_PROD,
        }
        this.$store.commit('lines/setEnv', payload)
      } else {
        const payload = {
          envName: '開発環境',
          apiKey: process.env.API_KEY_DEV,
        }
        this.$store.commit('lines/setEnv', payload)
      }
    },
  }
}
</script>

<style scoped>

</style>
