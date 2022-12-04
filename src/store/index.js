import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tokenId: '',
    userId: 'mIUzp4LtjbOqG87nibIjGshgpvN2',
    tabstatus: 'home',
    cart: [],
    totalPrice: Number,
    info: {}
  },
  mutations: {
    getuserId (state, payload) {
      state.userId = payload
    },
    tab (state, payload) {
      state.tabstatus = payload
    },
    getcart (state, payload) {
      state.cart = payload
      state.totalPrice = payload.totalPrice
    },
    increment (state, payload) {
      state.cart.product[payload].product_amount++
      state.totalPrice += (state.cart.product[payload].product_amount * state.cart.product[payload].product_price) - (state.cart.product[payload].product_price * (state.cart.product[payload].product_amount - 1))
    },
    decrement (state, payload) {
      state.cart.product[payload].product_amount--
      state.totalPrice -= (state.cart.product[payload].product_amount * state.cart.product[payload].product_price) - (state.cart.product[payload].product_price * (state.cart.product[payload].product_amount - 1))
    },
    getinfo (state, payload) {
      state.info = payload
    },
    select (state, { d, index }) {
      state.cart.product.splice(index, 1)
      state.totalPrice -= d
    },
    addtocart (state, payload) {
      state.cart.product.push(payload)
      state.totalPrice += payload.product_price
    },
    gettokenid (state, payload) {
      state.tokenId = payload
    }
  },
  actions: {
    getcartActions: ({ commit, state }) => {
      axios.post('/getcart', {
        userid: state.userId
      })
        .then((response) => {
          if (response.data.status === 200) {
            commit('getcart', response.data.data)
          }
        })
        .catch(err => {
          console.log(err)
          alert('Cant Connect API')
        })
    },
    getinfoActions: ({ commit, state }) => {
      axios.post('/getinfo', {
        userid: state.userId
      })
        .then((response) => {
          if (response.data.status === 200) {
            commit('getinfo', response.data.data)
          }
        })
        .catch(err => {
          console.log(err)
          alert('Cant Connect API')
        })
    }
  },
  modules: {
  }
})
