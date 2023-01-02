<template>
  <v-col cols="12">
    <v-simple-table>
      <template #default>
        <thead>
          <tr>
            <th>No.</th>
            <th class="text-left">Richmenu ID</th>
            <th>Name</th>
            <th>Json表示</th>
            <th>イメージ</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in richmenuList" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ item.richMenuId }}</td>
            <td>{{ item.name }}</td>
            <td><DialogComponent :json-detail="item" /></td>
            <td>
              <v-btn
                color="secondary"
                elevation="12"
                @click="getContents(item.richMenuId, idx)"
              >
                イメージ表示
              </v-btn>
              <div v-if="imageList.length > 0">
                <div v-for="val in imageList" :key="val.id">
                  <span v-if="val.id === idx">
                    <img :src="val.url" alt="イメージ" style="width: 200px" />
                  </span>
                </div>
              </div>
            </td>
            <td>
              <DeleteDialog
                :item-id="item.richMenuId"
                :index-id="idx"
                :api-key="apiKey"
              />
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-col>
</template>

<script>
import Swal from 'sweetalert2'
import DialogComponent from '~/components/Dialog'

export default {
  name: 'LineMain',
  components: { DialogComponent },
  // eslint-disable-next-line vue/require-prop-types,vue/prop-name-casing
  props: ['apiKey'],
  computed: {
    richmenuList() {
      return this.$store.state.richmenu.list
    },
    imageList() {
      return this.$store.state.richmenu.imageList
    },
  },
  watch: {
    apiKey(after, before) {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + before,
      }
      this.$axios
        .get('/v2/bot/richmenu/list', { headers })
        .then((res) => {
          console.log('new item list!')
          this.$store.commit('richmenu/setup', res.data.richmenus)
          this.imageList = []
        })
        .catch()
    },
  },
  mounted() {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.apiKey,
    }
    this.$axios
      .get('/v2/bot/richmenu/list', { headers })
      .then((res) => {
        this.$store.commit('richmenu/setup', res.data.richmenus)
      })
      .catch()
  },
  methods: {
    getContents(id, idx) {
      // イメージは１個限定
      if (this.imageList.length > 0) {
        return
      }
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.apiKey,
      }
      this.$axios
        .get('/api/v2/bot/richmenu/' + id + '/content', {
          headers,
          responseType: 'arraybuffer',
        })
        .then((res) => {
          // blobオブジェクトにしたい場合
          const blob = new Blob([res.data], { type: 'image/png' })
          const url = window.URL || window.webkitURL
          const params = {
            id: idx,
            url: url.createObjectURL(blob),
          }
          this.$store.commit('richmenu/setupImage', params)
        })
        .catch((e) => {
          if (e.response) {
            if (e.response.status === 404) {
              Swal.fire({
                title: 'エラー',
                text: '該当リッチメニュにはイメージが設定されてません',
                icon: 'error',
                confirmButtonText: 'Cool',
              })
            }
          } else {
            Swal.fire({
              title: 'エラー',
              text: 'イメージを取得する処理でなにか問題が発生しました。',
              icon: 'error',
              confirmButtonText: 'Cool',
            })
          }
        })
    },
    deleteItem(id) {
      alert(id)
    },
  },
}
</script>

<style scoped></style>
