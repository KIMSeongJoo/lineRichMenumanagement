export const state = () => ({
  envInfo: {
    name: '開発環境',
    apiKey: '',
  },
})

export const mutations = {
  setEnv(state, payload) {
    state.envInfo.name = payload.envName
    state.envInfo.apiKey = payload.apiKey
  },

  getEnv() {
    return state.envInfo
  },
}
