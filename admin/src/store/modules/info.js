import { infoAction } from '../actions/info'
import { infoMutations } from '../mutations/info'
import { getMenuByRouter } from '@/assets/js/tool'
import routers from '@/router/router'
import util from '../../assets/js/util'

const pageInfo = {
  state: {
    userinfo: {}
  },
  getters: {
    menuList: () => {
      let access = util.getLocalStorage('access')
      return getMenuByRouter(routers, access ? access.split(',') : [1, 2])
    }
  },
  actions: infoAction,
  mutations: infoMutations
}

export default pageInfo