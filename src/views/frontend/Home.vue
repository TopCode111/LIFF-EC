<template>
  <div class="q-pa-md">
    <Header title="สมัครใช้งาน"></Header>
      <div v-if="inputphone">
        <q-form
        @submit.prevent="sendSMS"
        class="q-gutter-md"
        >
        <q-input
        filled
        rounded
        v-model="phone"
        label="กรุณากรอกเบอร์โทรศัพท์"
        mask="(###) - ### - ####"
        unmasked-value
        lazy-rules
        />
        <div>
        <q-btn rounded :disable="disabled" id="sign-in-button" type="submit" color="primary">{{getSignInCodeButton.text}}</q-btn>
        </div>
        </q-form>
      </div>
      <div id="recaptcha-container"></div>
      <div v-if="inputOTP">
        <q-form
        @submit.prevent="verifyOtp"
        class="q-gutter-md"
        >
        <p class="text">กรุณาใส่รหัส OTP ที่ได้จาก SMS</p>
        <q-input
        filled
        v-model="otp"
        label="กรุณายืนยัน OTP"
        mask="######"
        />
        <div>
        <q-btn rounded id="sign-in-button" type="submit" color="primary">{{getSignInCodeButton.text}}</q-btn>
        </div>
        </q-form>
      </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import firebase from 'firebase'
export default {
  components: {
    Header
  },
  data () {
    return {
      phone: '',
      disabled: false,
      inputphone: true,
      inputOTP: false,
      otp: '',
      getSignInCodeButton: {
        text: 'รับรหัส OTP'
      }
    }
  },
  methods: {
    onSubmit () {
      const regex = /^0[0-9]{9}$/im
      const matches = regex.test(this.phone)
      if (matches) {
        var phoneNumber = this.phone.replace('0', '+66')
      } else {
        alert('Please type your number')
      }
      console.log(phoneNumber)
    },
    sendSMS () {
      this.disabled = true
      this.getSignInCodeButton = {
        text: 'กำลังส่ง SMS ..'
      }
      const regex = /^0[0-9]{9}$/im
      const matches = regex.test(this.phone)
      if (matches) {
        var phoneNumber = this.phone.replace('0', '+66')
      } else {
        alert('Please type your number')
      }
      let appVerifier = this.appVerifier
      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult
          this.inputOTP = true
          this.inputphone = false
          this.getSignInCodeButton = {
            text: 'ยืนยัน OTP'
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    initReCaptcha () {
      setTimeout(() => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible',
          'callback': function (response) {
          },
          'expired-callback': function () {
          }
        })
        //
        this.appVerifier = window.recaptchaVerifier
      }, 1000)
    },
    verifyOtp () {
      let code = this.otp
      window.confirmationResult.confirm(code)
        .then((result) => {
          this.$store.commit('getuserId', result.user.uid)
          this.addUser(result.user.phoneNumber)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addUser (tel) {
      this.$q.loading.show()
      this.$axios.post('/adduser', {
        tokenid: this.$store.state.tokenId,
        userid: this.$store.state.userId,
        tel: tel
      })
        .then((response) => {
          if (response.data.status === 200) {
            this.$q.loading.hide()
            // this.$router.push('/product')
            this.$router.push('/addinfo')
          }
        })
        .catch(err => {
          console.log(err)
          alert('Network Error')
        })
    },
    checkUser () {
      this.$q.loading.show()
      this.$axios.post('/checkuser', {
        userid: this.$store.state.userId,
        tokenid: this.$store.state.tokenId
      })
        .then((response) => {
          if (response.data.status === 200) {
            if (response.data.isMember === 1) {
              this.$q.loading.hide()
              this.$router.push('/product')
            }
            this.$q.loading.hide()
          }
        })
        .catch(err => {
          console.log(err)
          alert('Network Error')
        })
    }
  },
  async mounted () {
    const profile = await this.$liff.getProfile()
    await this.$store.commit('gettokenid', profile.userId)
    await this.checkUser()
    this.initReCaptcha()
  }
}
</script>
<style scoped>
</style>
