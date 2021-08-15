import { LStorage } from '../../utils/storages';

export default {
  namespaced: true,

  state: {
    history: LStorage.get('history') || [],
  },

  getters: {},

  mutations: {
    ADD_RECORD(state, record) {
      const { history } = state;
      if (history.length === 8) {
        history.pop();
      }

      history.unshift(record);
      LStorage.set('history', state.history);
    },
    DELETE_RECORD(state, recordIndex) {
      state.history.splice(recordIndex, 1);
      LStorage.set('history', state.history);
    },
  },

  actions: {
    addRecord({ commit }, record) {
      commit('ADD_RECORD', record);
    },
    removeRecord({ commit }, recordIndex) {
      commit('DELETE_RECORD', recordIndex);
    },
  },
};
