<template>
  <v-row>
    <!-- user id field -->
    <v-col cols="12">
      <label><h3>送信ユーザ</h3></label>
      <v-text-field
        v-model="targetUser"
        :counter="max"
        :rules="rules"
        label="LINE UID"
      ></v-text-field>
    </v-col>
    <!-- rich menu id field -->
    <v-col cols="12">
      <label><h3>リッチーメニューID</h3></label>
      <v-text-field
        v-model="richmenuId"
        :counter="max"
        :rules="rules"
        label="RICH MENU ID"
      ></v-text-field>
    </v-col>
    <!-- send button area -->
    <v-col cols="12">
      <v-btn elevation="2" large depressed color="primary">送信</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: 'UserRichmeu',
  data() {
    return {
      targetUser : null,
      richmenuId : null,
    }
  },
  computed : {
    envInfo() {
      return this.$store.state.lines.envInfo
    },
  },
  method : {
    setupRichmenu() {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.envInfo.apiKey,
      }

      const url = '/v2/bot/user/' + this.targetUser + '/richmenu/' + this.richmenuId
      this.$axios.post(url, '',{headers})
        .then((res) => {

        })
        .catch(({e}) => {
          if (e.response) {
            Swal.fire({
              icon: 'error',
              title: 'リッチーメニューとユーザー情報のリンクに失敗しました。',
              text: e,
            })
          }
        })
    }
  }
}
</script>
<style scoped></style>
