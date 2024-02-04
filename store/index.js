import { SET_BLOG_POSTS, SET_CONNECTIONS, TOGGLE_MENU, IS_MOBILE, SET_SITE_INFO } from './mutations.type'

export const state = () => ({
  blogPosts: [],
  connections: [],
  menuOpen: false,
  isMobile: false,
  site_info: '',
})

export const getters = {
  getIsMenuOpen(state) {
    return state.menuOpen
  },
  getIsMobile(state) {
    return state.isMobile
  },
  getSiteInfo(state) {
    return state.site_info
  }
}

export const mutations = {
  [SET_BLOG_POSTS](state, list) {
    state.blogPosts = list
  },
  [SET_CONNECTIONS](state, list) {
    state.connections = list
  },
  [TOGGLE_MENU](state, payload) {
    state.menuOpen = payload
  },
  [IS_MOBILE](state, payload) {
    state.isMobile = payload
  },
  [SET_SITE_INFO](state, payload) {
    state.site_info = payload
  }
}

export const actions = {
  getPosts(files) {
    console.log("getPosts")
    return files.keys().map((key) => {
      let res = files(key)
      res.slug = key.slice(2, -5)
      return res
    })
  },
  toggleMenu({ commit }, payload) {
    commit('toggleMenu', payload)
  },
  setIsMobile({ commit }, payload) {
    commit('isMobile', payload)
  },
  async nuxtServerInit({ commit }) {
    // Blog collection type
    let blogFiles = await require.context('~/assets/content/blog/', false, /\.json$/)
    await commit(SET_BLOG_POSTS, actions.getPosts(blogFiles))

    // Connections collection type
    let connections = await require.context('~/assets/content/connections/', false, /\.json$/)
    await commit(SET_CONNECTIONS, actions.getPosts(connections))

    let site_info = await require('~/assets/content/site/info.json')
    console.log("site_info", site_info)
    commit(SET_SITE_INFO, site_info)

    // ? When adding/changing NetlifyCMS collection types, make sure to:
    // ? 1. Add/rename exact slugs here
    // ? 2. Add/rename the MUTATION_TYPE names in `./mutations.type.js`
    // ? 3. Add/rename `pages/YOUR_SLUG_HERE` and use the Vuex store like the included examples
    // ? If you are adding, add a state, mutation and commit (like above) for it too
  }
}
