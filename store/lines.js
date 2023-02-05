export const state = () => ({
  envInfo: {
    name: '開発環境',
    nameKey : 'dev',
    apiKey: '',
  },
})

export const mutations = {
  setEnv(state, payload) {
    state.envInfo.name = payload.envName
    state.envInfo.apiKey = payload.apiKey
    state.envInfo.nameKey = payload.nameKey
  },

  getEnv() {
    return state.envInfo
  },
}
