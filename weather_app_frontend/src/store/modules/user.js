const state = {
    username: sessionStorage.getItem('username') ?
        sessionStorage.getItem('username') :
        null,
    token: sessionStorage.getItem('token') ?
        sessionStorage.getItem('token') :
        null,
};

const mutations = {
    set_user(state, payload) {
        state.username = payload.username;
        state.token = payload.token;
        sessionStorage.setItem('username', state.username);
        sessionStorage.setItem('token', state.token);
    },
    clear_user(state) {
        state.username = null;
        state.token = null;
        sessionStorage.clear();
    },
};

const getters = {
    user() {
        return state;
    },
};

const actions = {
    set_user(context, payload) {
        context.commit('set_user', payload);
    },
    clear_user(context) {
        context.commit('clear_user');
    },
};

export default {
    state,
    mutations,
    getters,
    actions,
};