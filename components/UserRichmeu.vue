<template>
  <v-row>
    <!-- user id field -->
    <v-col cols="12">
      <label class="text-h4">送信ユーザ</label>
      <v-text-field
        v-model="targetUser"
        :counter="64"
        :rules="rules"
        label="LINE UID"
      ></v-text-field>
    </v-col>
    <!-- rich menu id field -->
    <v-col cols="12">
      <label class="text-h4">リッチーメニューID</label>
      <v-text-field
        v-model="richmenuId"
        :counter="64"
        :rules="rules"
        label="RICH MENU ID"
      ></v-text-field>
    </v-col>
    <!-- send button area -->
    <v-col cols="12">
      <v-btn
        elevation="2"
        large
        depressed
        color="primary"
        @click="setupRichmenu"
        >送信</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'UserRichmeu',
  data() {
    return {
      rules: [v => v.length <= 64 || 'Max 1024 characters'],
      targetUser: null,
      richmenuId: null,
    }
  },
  computed: {
    envInfo() {
      return this.$store.state.lines.envInfo
    },
  },
  methods: {
    setupRichmenu() {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.envInfo.apiKey,
      }

      const url =
        '/v2/bot/user/' + this.targetUser + '/richmenu/' + this.richmenuId
      this.$axios
        .post(url, '', { headers })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: '作成完了',
            text: 'ユーザー設定完了',
          })
        })
        .catch(({ e }) => {
          if (e.response) {
            Swal.fire({
              icon: 'error',
              title: 'リッチーメニューとユーザー情報のリンクに失敗しました。',
              text: e,
            })
          }
        })
    },
  },
}
</script>
<style scoped></style>
