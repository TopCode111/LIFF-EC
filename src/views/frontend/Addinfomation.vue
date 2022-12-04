<template>
  <div>
    <div class="q-pa-md">
      <Header title = "รายละเอียดการจัดส่ง"></Header>
      <form @submit.prevent="saveAddress">
        <div class="row">
          <div class="col-xs-6">
            <q-input outlined rounded v-model="name.firstname" label="ชื่อ" :rules="firstnameRule"/>
          </div>
          <div class="col-xs-6">
            <q-input outlined rounded v-model="name.lastname" label="นามสกุล" :rules="lastnameRule" />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <q-input outlined rounded v-model="address" label="ที่อยู่" type="textarea" :rules="addressRule"/>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-6">
            <ThailandAutoComplete v-model="district" type="district" @select="select" placeholder="ตำบล..."/>
          </div>
          <div class="col-xs-6">
            <ThailandAutoComplete v-model="amphoe" type="amphoe" @select="select" placeholder="อำเภอ..."/>
          </div>
        </div>
        <div class="row" >
          <div class="col-xs-6">
            <ThailandAutoComplete v-model="province" type="province" @select="select" placeholder="จังหวัด..."/>
          </div>
          <div class="col-xs-6">
            <ThailandAutoComplete v-model="zipcode" type="zipcode" @select="select" placeholder="รหัสไปรษณีย์..."/>
          </div>
        </div>
        <q-btn rounded type="submit" color="primary" style="width:50%;margin-top:7%">บันทึก</q-btn>
      </form>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import ThailandAutoComplete from '@/components/vue-thailand-address-autocomplete.vue'
export default {
  data () {
    return {
      name: {
        firstname: this.$route.query.type === 'edit' ? this.$store.state.info.name.firstname : '',
        lastname: this.$route.query.type === 'edit' ? this.$store.state.info.name.lastname : ''
      },
      address: this.$route.query.type === 'edit' ? this.$store.state.info.address.address : '',
      district: this.$route.query.type === 'edit' ? this.$store.state.info.address.district : '',
      amphoe: this.$route.query.type === 'edit' ? this.$store.state.info.address.amphoe : '',
      province: this.$route.query.type === 'edit' ? this.$store.state.info.address.province : '',
      zipcode: this.$route.query.type === 'edit' ? this.$store.state.info.address.zipcode : '',
      firstnameRule: [
        v => !!v || 'กรุณากรอกชื่อ'
      ],
      lastnameRule: [
        v => !!v || 'กรุณากรอกนามสกุล'
      ],
      addressRule: [
        v => !!v || 'กรุณากรอกที่อยู่'
      ]
    }
  },
  components: {
    Header, ThailandAutoComplete
  },
  methods: {
    saveAddress () {
      this.$q.loading.show()
      this.$axios.post('/addinfo', {
        userid: this.$store.state.userId,
        name: this.name,
        address: {
          address: this.address,
          district: this.district,
          amphoe: this.amphoe,
          province: this.province,
          zipcode: this.zipcode
        }
      })
        .then((response) => {
          if (response.data.status === 200) {
            this.$store.dispatch('getinfoActions')
              .then(() => {
                this.$q.loading.hide()
                if (this.$route.query.type === 'edit') {
                  this.$router.push('/confirmcart')
                } else {
                  this.$router.push('/product')
                }
              })
              .catch(err => {
                console.log(err)
                alert('Network Error')
                this.$q.loading.hide()
              })
          }
        })
        .catch(err => {
          console.log(err)
          alert('Network Error')
          this.$q.loading.hide()
        })
    },
    select (address) {
      this.district = address.district
      this.amphoe = address.amphoe
      this.province = address.province
      this.zipcode = address.zipcode
    }
  }
}
</script>

<style scoped>
.q-field--outlined {
  padding: 0 5px;
}
.row {
  margin-top: 5%;
}
</style>
