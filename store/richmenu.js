export const state = () => ({
  list: [],
  imageList: [],
})

export const mutations = {
  setup(state, itemList) {
    state.list = itemList
  },

  setupImage(state, urlinfo) {
    state.imageList.push(urlinfo)
  },
  add(state, item) {
    state.list.push(item)
  },
  remove(state, item) {
    state.list.splice(item, 1)
  },
}
