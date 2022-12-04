<template>
<div class="q-pa-md">
  <h4>View Products</h4>
  <q-card>
    <q-card-section>
      <div class="row">
        <div class="col-xs-6 col-sm-6 col-md-1">
          <q-input
          filled
          v-model="product_id"
          label="ID *"
          readonly
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </div>
        <div class="col-xs-6 col-sm-6 col-md-4">
          <q-input
          filled
          v-model="product_name"
          label="NAME *"
          readonly
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3">
          <q-select
          filled
          readonly
          v-model="product_type"
          label="TYPE " />
        </div>
        <div class="col-xs-6 col-sm-6 col-md-2">
          <q-input
          filled
          readonly
          v-model="product_price"
          label="PRICE *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-2">
          <q-input
          filled
          readonly
          v-model="product_stock"
          label="AMOUNT *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6">
          <q-input
          filled
          readonly
          type="textarea"
          v-model="product_detail"
          label="ITEM DETAILS *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6">
          <q-input
          filled
          readonly
          type="textarea"
          v-model="product_image"
          label="IMAGE *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</div>
</template>

<script>
export default {
  name: 'Edit',
  data () {
    return {
      product_id: '',
      product_name: '',
      product_price: '',
      product_type: '',
      product_image: '',
      product_stock: '',
      product_detail: ''
    }
  },
  props: ['id'],
  template: 'Edit {{id}}',
  created () {
    this.$axios.get('/getproduct/' + this.id)
      .then((response) => {
        this.products = response.data.data
        this.product_id = this.products.product_id
        this.product_name = this.products.product_name
        this.product_price = this.products.product_price
        this.product_type = this.products.product_type
        this.product_image = this.products.product_image
        this.product_stock = this.products.product_stock
        this.product_detail = this.products.product_detail
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
