<template>
<div>
  <Topbar></Topbar>
  <div class="q-pa-md" style="margin-bottom:7%;">
    <Header title="รายการสินค้า"></Header>
    <q-card class="my-card" v-for="product in products" :key="product.product_id">
      <div @click="$router.push({ path: `/productdetail/${product.product_id}` })">
        <q-img :src = product.product_image
        :ratio = "1"
        />
        <q-card-section>
          <div class="text-h6">{{product.product_name}}</div>
          <div class="text-subtitle2" style="color:green;" v-if="product.product_stock !== '0'">{{Number(product.product_price).toLocaleString()+" THB"}}</div>
          <div class="text-subtitle2" style="color:red;" v-else>Out of Stock</div>
        </q-card-section>
      </div>
    </q-card>
  </div>
  <q-btn-group spread>
    <q-btn color="red" label="ออกจากแอพลิเคชั่น" icon="exit_to_app" @click="exit()"/>
  </q-btn-group>
</div>
</template>

<script>
import Topbar from '@/components/Topbar.vue'
import Header from '@/components/Header.vue'
export default {
  components: {
    Topbar, Header
  },
  data () {
    return {
      products: [],
      cart: []
    }
  },
  async created () {
    this.$q.loading.show()
    await this.getProduct()
    await this.$q.loading.hide()
  },
  methods: {
    getProduct () {
      this.$axios.get('/getproduct')
        .then((response) => {
          this.products = response.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    exit () {
      this.$liff.closeWindow()
    }
  }
}
</script>
