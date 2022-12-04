<template>
  <div>
  <Topbar></Topbar>
  <div class="q-pa-md">
    <section>
      <Header title = "ยืนยันตะกร้าสินค้า"></Header>
      <div class="row" v-for="(product, index) in this.$store.state.cart.product" :key="index">
        <div class="col-xs-4">
          <q-img :src = product.product_image
              :ratio = "1"
            />
        </div>
        <div class="col-xs-8">
          <p class="fontheader">{{product.product_name}}</p>
          <p class="fontheader">{{product.product_detail}}</p>
          <p class="fontheader">{{"จำนวน: " + product.product_amount + " รายการ"}}</p>
          <p class="fontheader">{{"ราคา: " + Number(product.product_price*product.product_amount).toLocaleString() + " THB"}}</p>
        </div>
        <q-separator inset style="margin-top:5%; margin-bottom:5%" />
      </div>
      <div class="row">
        <div class="col">
          <p class="fontheader">Total Price</p>
        </div>
        <div class="col">
          <p class="fontheader" style="color:green;">{{ Number(this.$store.state.totalPrice).toLocaleString()+" THB" }}</p>
        </div>
      </div>
    </section>
    <q-separator inset />
    <section>
      <Header title = "ที่อยู่ในการจัดส่ง"></Header>
      <div class="q-pa-sm" style="margin-top:3%; margin-bottom:7%;">
        <p style="text-align:left;">{{fullname}}</p>
        <p style="text-align:left;">{{address}}</p>
        <div class="row">
          <div class="col-xs-4">
            <a @click="$router.push({ path: 'addinfo', query: { type: 'edit' } })">เปลี่ยนแปลงที่อยู่</a>
          </div>
          <div class="col"></div>
          </div>
      </div>
    </section>
    <!-- <section>
      <Header title = "กรุณาเลือกการชำระเงิน"></Header>
      <q-btn style="width:50%;  >
        <q-avatar style="width:100%">
          <img src="@/assets/linepay_logo.png">
        </q-avatar>
      </q-btn>
    </section> -->
  </div>
  <q-btn-group spread>
    <q-btn color="grey-8" @click="$router.push('/cart')" label="ย้อนกลับ" icon="arrow_back" />
    <q-btn color="green" label="ยืนยันออเดอร์" icon="playlist_add_check" @click="confirmorder()"/>
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
  computed: {
    fullname () {
      return 'ชื่อ-นามสกุล: ' + this.$store.state.info.name.firstname + ' ' + this.$store.state.info.name.lastname + ' เบอร์โทรติดต่อ: ( ' + this.$store.state.info.telno.replace('+66', '0') + ' )'
    },
    address () {
      return `ที่อยู่: ${this.$store.state.info.address.address} ${this.$store.state.info.address.district} ${this.$store.state.info.address.amphoe} ${this.$store.state.info.address.province} ${this.$store.state.info.address.zipcode}`
    }
  },
  mounted () {
  },
  methods: {
    confirmorder () {
      this.$q.loading.show()
      this.$axios.post('/confirmorder', {
        userid: this.$store.state.userId,
        contact: this.$store.state.info.name.firstname + ' ' + this.$store.state.info.name.lastname + ' ' + this.$store.state.info.telno,
        address: this.$store.state.info.address,
        cart: this.$store.state.cart,
        totalPrice: this.$store.state.totalPrice
      })
        .then((res) => {
          this.$q.loading.hide()
          this.$liff.closeWindow()
        })
        .catch(e => {
          this.$q.loading.hide()
          console.log(e)
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
