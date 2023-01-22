export const state = () => ({
  list: [],
  imageList: [],
  defaultRichmenu : ''
})

export const mutations = {
  setup(state, itemList) {
    const result = []
    itemList.forEach(function(value){
      value.image = false;
      result.push(value)
    });
    state.list = result
  },

  setupImage(state, urlinfo) {
    state.imageList.push(urlinfo)
  },
  updateListImage(state, idx) {
    state.list[idx].image = true
  },
  remove(state, item) {
    state.list.splice(item, 1)
  },

  setupDefaultRichmenu(state, item) {
    state.defaultRichmenu = item
  }
}
