/*
 * @Author: your name
 * @Date: 2020-04-18 23:31:45
 * @LastEditTime: 2020-04-19 10:51:07
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \egg\app\web\store\modules\user.js
 */
const state = {
    userinfo: "",
    pasteItem: []
}

const getters = {
    userinfo: (state) => {
        return state.userinfo
    },
}

const mutations = {
    SET_USER_INFO(state, value) {
        state.userinfo = value
    },
    SET_PASTE_ITEM(state, value) {
        state.pasteItem = value
    },
}

const actions = {

}

export default {
    state,
    getters,
    getters,
    mutations
}