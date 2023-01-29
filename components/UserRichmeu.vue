<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-row>
      <!-- user id field -->
      <v-col cols="12">
          <label class="text-h4">送信ユーザ</label>
          <v-text-field
            v-model="targetUser"
            :counter="max"
            :rules="riciMenuRules"
            label="LINE UID"
            required
          ></v-text-field>
      </v-col>
      <!-- rich menu id field -->
      <v-col cols="12">
        <label class="text-h4">リッチーメニューID</label>
        <v-text-field
          v-model="richmenuId"
          :counter="max"
          :rules="lineUIDRules"
          label="RICH MENU ID"
          required
        ></v-text-field>
      </v-col>
      <!-- send button area -->
      <v-col cols="12">
        <v-btn
          :disabled="!valid"
          elevation="2"
          large
          depressed
          color="primary"
          @click="validate"
          >送信</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'

export default {
  name: 'UserRichmeu',
  data() {
    return {
      riciMenuRules: [
        v => !!v || 'richmenu id は必須です',
        v => (v && v.length <= 64) || 'richmenu idは最大64文字以内で入力してください。',
      ],
      lineUIDRules: [
        v => !!v || 'line uidは必須です',
        v => (v && v.length <= 64) || 'line uidは最大64文字以内で入力してください。',
      ],
      targetUser: '',
      richmenuId: '',
      valid: true,
      max: 64,
    }
  },
  computed: {
    envInfo() {
      return this.$store.state.lines.envInfo
    },
  },
  methods: {
    validate () {
      this.$refs.form.validate()
      if (this.valid) {
        const params = {
          'apikey' : this.envInfo.apiKey,
          'uid' : this.targetUser,
          'ricimenuId' : this.richmenuId,
        }
        this.setupRichmenu(params)
      }
    },
    setupRichmenu : async (params) => {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + params.apikey,
      }

      const url =
        '/v2/bot/user/' + params.uid + '/richmenu/' + params.ricimenuId

      try {
        await axios
          .post(url, '', { headers })
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: '作成完了',
              text: 'ユーザー設定完了',
            })
          })
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: '作業失敗',
          text: e.response.statusText,
        })
      }
    }
  },
}
</script>
<style scoped></style>
