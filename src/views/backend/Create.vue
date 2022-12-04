<template>
  <div class="q-pa-md">
    <h4>Add Products</h4>
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
            :options="options"
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
  name: 'Index',
  data () {
    return {
      product_id: '',
      product_name: '',
      product_price: '',
      product_type: '',
      product_image: '',
      product_stock: '',
      product_detail: '',
      options: [
        'Hoegaarden', 'Stella Artois'
      ]
    }
  },
  methods: {
    onSubmit () {
      this.$axios.post('/createproduct', {
        product_id: this.product_id,
        product_name: this.product_name,
        product_price: parseInt(this.product_price),
        product_type: this.product_type,
        product_image: this.product_image,
        product_stock: parseInt(this.product_stock),
        product_detail: this.product_detail
      })
        .then((response) => {
          if (response.data.status === 200) {
            alert('Create Item Completed')
            this.$router.push('/index/index')
          } else if (response.data.status === 400) {
            alert('Item Already Exists')
          }
        })
        .catch(err => {
          console.log(err)
          alert('Create Item Failed')
        })
    }
  }
}
</script>
