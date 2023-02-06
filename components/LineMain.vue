<template>
  <v-col cols="auto" class="pa-0">
    <v-simple-table>
      <template #default>
        <thead>
          <tr>
            <th>No.</th>
            <th class="text-left">Richmenu ID</th>
            <th>Name</th>
            <th>Json表示</th>
            <th>設定</th>
            <th>イメージ</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in richmenuList" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>
              <label v-if="item.richMenuId === defaultRichmenu">
                <v-tooltip bottom>
                  <template #activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on">mdi-bullseye-arrow</v-icon>
                  </template>
                  <span>ディフォルトリッチーメニュー</span>
                </v-tooltip>
              </label>
              {{ item.richMenuId }}
            </td>
            <td>{{ item.name }}</td>
            <td><DialogComponent :json-detail="item" /></td>
            <td>
              <DefaultRichmenu
                :apiKey="envInfo.apiKey"
                :itemId="item.richMenuId"
                />
            </td>
            <td>
              <v-btn
                v-if="item.image === false"
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
                :api-key="envInfo.apiKey"
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
import DeleteDialog from '~/components/DeleteDialog'
import DefaultRichmenu from "~/components/DefaultRichmenu.vue";

export default {
  name: 'LineMain',
  components: {DefaultRichmenu, DialogComponent, DeleteDialog },
  // eslint-disable-next-line vue/require-prop-types,vue/prop-name-casing
  computed: {
    richmenuList() {
      return this.$store.state.richmenu.list
    },
    imageList() {
      return this.$store.state.richmenu.imageList
    },
    defaultRichmenu() {
      return this.$store.state.richmenu.defaultRichmenu
    },
    envInfo() {
      return this.$store.state.lines.envInfo
    },
  },
  watch: {
    // envinfo 監視
    envInfo: {
      deep: true,
      handler() {
        // envinfoが更新されたら再度一覧取得
        this.getRichmenuList()
      },
    },
  },
  mounted() {
    // storeに取得履歴がある場合スルー
    if (this.richmenuList.length > 0 && this.defaultRichmenu.length > 0) {
      return
    }
    // 保存データがからの場合、データ取得
    this.getRichmenuList()
  },
  methods: {
    getRichmenuList() {
      // mountページがMountされたら実装
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.envInfo.apiKey,
      }
      this.$axios
        .get('/v2/bot/richmenu/list', { headers })
        .then((res) => {
          this.$store.commit('richmenu/setup', res.data.richmenus)
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'エラーが発生しました。',
            text: 'rich menu list 取得失敗',
          })
        })

      // get default rich menu
      this.$axios
        .get('/v2/bot/user/all/richmenu', { headers })
        .then((res) => {
          this.$store.commit(
            'richmenu/setupDefaultRichmenu',
            res.data.richMenuId
          )
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'エラーが発生しました。',
            text: 'ディフォルトリッチーメニュー取得失敗',
          })
        })
    },
    getContents(id, idx) {
      // check image list about idx info
      const obj = this.imageList.find((o) => o.id === idx)
      if (obj !== undefined) {
        return
      }
      // header set up
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.envInfo.apiKey,
      }
      this.$axios
        .get('/api/v2/bot/richmenu/' + id + '/content', {
          headers,
          responseType: 'arraybuffer',
        })
        .then((res) => {
          // modified blob object
          const blob = new Blob([res.data], { type: 'image/png' })
          const url = window.URL || window.webkitURL
          const params = {
            id: idx,
            url: url.createObjectURL(blob),
          }
          // save image data
          this.$store.commit('richmenu/setupImage', params)
          // update item list image info false to true
          this.$store.commit('richmenu/updateListImage', idx)
        })
        .catch((e) => {
          if (e.response) {
            if (e.response.status === 404) {
              Swal.fire({
                title: 'エラー',
                text: '該当リッチメニュにはイメージが設定されてません',
                icon: 'error',
                confirmButtonText: '閉じる',
              })
            }
          } else {
            Swal.fire({
              title: 'エラー',
              text: 'イメージを取得する処理でなにか問題が発生しました。',
              icon: 'error',
              confirmButtonText: '閉じる',
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
