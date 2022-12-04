<template>
  <div>
    <Topbar></Topbar>
    <div class="q-pa-md">
      <q-img
      :src = products.product_image
      :ratio="1"
      />
      <h4 style="text-align:left;">{{products.product_name}}</h4>
      <div class="text-h5" style="color:green; text-align:left;" v-if="products.product_stock !== '0'">
        {{Number(products.product_price).toLocaleString()+" THB"}}</div>
      <div class="text-h5" style="color:red; text-align:left;" v-else>Out of Stock</div>
      <p class="text-body2 text-weight-medium" style="text-align:left;">{{products.product_detail}}</p>
    </div>
    <q-btn-group spread v-if="products.product_stock !== '0'">
      <q-btn color="grey-8" @click="$router.go(-1)" label="ย้อนกลับ" icon="arrow_back" />
      <q-btn color="green" @click="addtoCart()" label="เพิ่มลงตะกร้าสินค้า" icon="shopping_cart" />
    </q-btn-group>
  </div>
</template>

<script>
import Topbar from '@/components/Topbar.vue'
export default {
  components: {
    Topbar
  },
  name: 'ProductDetail',
  data () {
    return {
      products: {},
      duplicate: false
    }
  },
  props: ['id'],
  template: 'ProductDetail {{id}}',
  created () {
    this.getProductDetail()
  },
  methods: {
    getProductDetail () {
      this.$q.loading.show()
      this.$axios.get('/getproduct/' + this.id)
        .then(response => {
          this.products = response.data.data
          this.$q.loading.hide()
          // console.log(this.products)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addtoCart () {
      this.$store.state.cart.product.forEach(v => {
        if (v.product_id === this.products.product_id) {
          this.duplicate = true
          alert('ท่านเพิ่มสินค้าชิ้นนี้แล้ว')
        }
      })
      if (this.duplicate === false) {
        this.products.product_amount = 1
        this.$store.commit('addtocart', this.products)
      }
    }
  }
}
</script>

<style scoped>
</style>
