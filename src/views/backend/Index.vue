<template>
  <div class="q-mt-md">
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-right">Name</th>
          <th class="text-right">Type</th>
          <th class="text-right">Price</th>
          <th class="text-right">Stock</th>
          <th class="text-right">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td class="text-left">{{product.id}}</td>
          <td class="text-right">{{product.product_name}}</td>
          <td class="text-right">{{product.product_type}}</td>
          <td class="text-right">{{product.product_price}}</td>
          <td class="text-right">{{product.product_stock}}</td>
          <td class="text-right">
            <a href="#" >
              <i @click="onEdit(product.id)" class="material-icons">edit</i>
            </a>
            <a href="#">
              <i @click="onDelete(product.id)" class="material-icons">delete</i>
            </a>
            <a href="#">
              <i @click="onView(product.id)" class="material-icons">visibility</i>
            </a>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      products: []
    }
  },
  created () {
    this.getProduct()
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
    onDelete (id) {
      this.$axios.post('/deleteproduct',
        {
          id: id
        })
        .then(() => {
          this.getProduct()
        })
        .catch(err => {
          console.log(err)
        })
    },
    onEdit (id) {
      this.$router.push({ path: `/index/edit/${id}` })
    },
    onView (id) {
      this.$router.push({ path: `/index/view/${id}` })
    }
  }
}
</script>

<style scoped>

</style>
