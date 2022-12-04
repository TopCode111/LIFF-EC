<template>
  <q-tabs
    v-model="tab"
    align="justify"
    narrow-indicator
    style="box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);"
  >
    <q-tab name="home" label="หน้าแรก" icon="home"/>
    <q-separator vertical inset />
    <q-tab name="cart" label="ตะกร้าสินค้า" icon="shopping_cart">
      <q-badge color="blue" floating>{{this.$store.state.cart.product.length}}</q-badge>
    </q-tab>
  </q-tabs>
</template>

<style>
</style>

<script>
export default {
  name: 'Topbar',
  props: {
    count: Number
  },
  data () {
    return {
      tab: this.$store.state.tabstatus
    }
  },
  watch: {
    tab (e) {
      this.$store.commit('tab', e)
      if (e === 'home') {
        this.$router.push({ path: `/product` })
      } else if (e === 'cart') {
        this.$router.push({ path: `/cart` })
      }
    }
  }
}
</script>
