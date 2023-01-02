export const state = () => ({
  envInfo: {
    name: '開発環境',
    dns: '',
  },
})

export const mutations = {
  setEnv(state, payload) {
    state.envInfo.name = payload.envName
    state.envInfo.dns = payload.dns
  },

  getEnv() {
    return state.envInfo
  },
}
