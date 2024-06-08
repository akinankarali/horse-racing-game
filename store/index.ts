import type { Context } from '@nuxt/types'
import type { GetterTree, ActionTree, MutationTree } from 'vuex'

export interface RootState {
  game: string
}

export const state = (): RootState => ({
  game: "I'm defined as an initial state"
})

export const getters: GetterTree<RootState, RootState> = {
  reversedName: (state): string => state.game.split('').reverse().join('')
}

export const MutationType = {
  CHANGE_GAME: 'changegame'
}

export const mutations: MutationTree<RootState> = {
  [MutationType.CHANGE_GAME]: (state, newgame: string) => { state.game = newgame }
}

export const actions: ActionTree<RootState, RootState> = {
  nuxtServerInit ({ commit }, _context: Context) {
    commit(MutationType.CHANGE_GAME, "I'm defined by server side")
  }
}
