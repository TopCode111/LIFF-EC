<template>
  <div class='q-pa-md'>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="email"
        label="Email *"
        type="email"
        lazy-rules
        :rules="[
          val => val && val.length > 0 || 'กรุณากรอกอีเมลล์'
        ]"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Password *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'กรุณากรอกรหัสผ่าน'
        ]"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
      </div>
    </q-form>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    onSubmit () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          console.log(user)
          alert('Login Completed')
          this.$router.push('/index/index')
        })
        .catch(err => {
          alert('Login Failed', err)
        })
    }
  }
}
</script>
