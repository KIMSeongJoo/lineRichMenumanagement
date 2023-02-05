<template>
  <v-row
    justify="space-between"
    class="d-flex align-center"
  >
    <v-col cols="12">
      <v-select
        class="pa-4"
        v-model="envSelected"
        :items="envList"
        item-text="envName"
        item-value="apiKey"
        label="環境選択"
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
    envInfo: {
      deep: true,
      handler(after) {
        this.envSelected = after.nameKey
      }
    },
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
          nameKey: 'prod'
        }
        this.$store.commit('lines/setEnv', payload)
      } else {
        const payload = {
          envName: '開発環境',
          apiKey: process.env.API_KEY_DEV,
          nameKey: 'dev'
        }
        this.$store.commit('lines/setEnv', payload)
      }
    },
  }
}
</script>

<style scoped>

</style>
