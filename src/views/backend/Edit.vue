<template>
<div class="q-pa-md">
  <h4>Edit Products</h4>
  <q-card>
    <q-card-section>
      <q-form
      @submit.prevent="onSubmit"
      class="q-gutter-md"
      >
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
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3">
          <q-select
          filled
          v-model="product_type"
          label="TYPE " />
        </div>
        <div class="col-xs-6 col-sm-6 col-md-2">
          <q-input
          filled
          v-model="product_price"
          label="PRICE *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-2">
          <q-input
          filled
          v-model="product_stock"
          label="AMOUNT *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6">
          <q-input
          filled
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
          type="textarea"
          v-model="product_image"
          label="IMAGE *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12">
          <q-btn label="Submit" type="submit" color="primary"/>
        </div>
      </div>
      </q-form>
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
  },
  methods: {
    onSubmit () {
      this.$axios.post('/editproduct', {
        product_id: this.product_id,
        product_name: this.product_name,
        product_price: this.product_price,
        product_type: this.product_type,
        product_image: this.product_image,
        product_stock: this.product_stock,
        product_detail: this.product_detail
      })
        .then((response) => {
          if (response.data.status === 200) {
            alert('Updated Item Completed')
            this.$router.push('/index/index')
          } else {
            alert('Updated Item Failed')
          }
        })
        .catch(err => {
          console.log(err)
          alert('Update Item Failed')
        })
    }
  }
}
</script>
