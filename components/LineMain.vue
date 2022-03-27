<template>
  <v-simple-table>
    <template #default>
      <thead>
      <tr>
        <th>
          No.
        </th>
        <th class="text-left">
          Richmenu ID
        </th>
        <th>
          Name
        </th>
        <th>
          show json
        </th>
        <th>
          show image
        </th>
        <th>
          Delete
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="(item, idx) in richmenuList"
        :key="idx"
      >
        <td>{{ idx + 1 }}</td>
        <td>{{ item.richMenuId }}</td>
        <td>{{ item.name }}</td>
        <td> <DialogComponent :jsonDetail="item"/> </td>
        <td>
          <v-btn
            color="secondary"
            elevation="12"
            rounded
            @click="getContents(item.richMenuId, idx)"
          > イメージ表示 </v-btn>
          <div v-if="imageList.length > 0">
            <div v-for="val in imageList" :key="val.id">
              <span v-if="val.id === idx">
                <img :src="val.url" alt="cc" style="width: 200px;"/>
              </span>
            </div>
          </div>
        </td>
        <td>
          <DeleteDialog :itemId="item.richMenuId"/>
        </td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import DialogComponent from "~/components/Dialog";

export default {
  name: "LineMain",
  components: {DialogComponent},
  // eslint-disable-next-line vue/require-prop-types
  props: ['apiKey'],
  data() {
    return {
      richmenuList : [],
      imageList : [],
    }
  },
  mounted() {
    const headers = {
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + this.apiKey
    }
    this.$axios.get('/v2/bot/richmenu/list', {headers})
      .then(res => {
        this.richmenuList = res.data.richmenus
      })
      .catch()
  },
  watch: {
    apiKey(after,before) {
      const headers = {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + before
      }
      this.$axios.get('/v2/bot/richmenu/list', {headers})
        .then(res => {
          console.log('new item list!')
          this.richmenuList = res.data.richmenus
          this.imageList = [];
        })
        .catch()
    }
  },
  methods: {
    getContents(id, idx) {
      // イメージは１個限定
      if(this.imageList.length > 0) {
        return;
      }
      const headers = {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + this.apiKey
      }
      this.$axios.get('/api/v2/bot/richmenu/' + id + '/content', {
        headers,
        responseType: "arraybuffer" }
      )
      .then(res => {
        // blobオブジェクトにしたい場合
        const blob = new Blob([res.data], { type: 'image/png' })
        const url = window.URL || window.webkitURL
        this.imageList.push({
          id : idx,
          url : url.createObjectURL(blob)
        })
      })
      .catch(e => {
      })
    },
    deleteItem(id) {
      alert(id);

    }
  }

}
</script>

<style scoped>

</style>
