<template>
  <div>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated class="glossy">
        <q-toolbar>
            <q-btn
            flat
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            aria-label="Menu"
            icon="menu"
            />

            <q-toolbar-title>
            Backend Mode
            </q-toolbar-title>

        </q-toolbar>
        </q-header>

        <q-drawer
        v-model="leftDrawerOpen"
        bordered
        content-class="bg-grey-2"
        >
        <q-list>
            <q-item-label header>Menu</q-item-label>
            <q-item clickable tag="a" target="_blank" @click="$router.push({ path: `/index/index` })">
            <q-item-section avatar>
                <q-icon name="home" />
            </q-item-section>
            <q-item-section>
                <q-item-label>Index</q-item-label>
                <q-item-label caption>Data Table</q-item-label>
            </q-item-section>
            </q-item>
            <q-item clickable tag="a" target="_blank" @click="$router.push({ path: `/index/create` })">
            <q-item-section avatar>
                <q-icon name="add_box" />
            </q-item-section>
            <q-item-section>
                <q-item-label>Create</q-item-label>
                <q-item-label caption>Create Product</q-item-label>
            </q-item-section>
            </q-item>
            <q-item clickable tag="a" target="_blank" @click="logout()">
              <q-item-section avatar>
                  <q-icon name="exit_to_app" />
              </q-item-section>
              <q-item-section>
                  <q-item-label>Logout</q-item-label>
                  <q-item-label caption>Back to Login</q-item-label>
              </q-item-section>
            </q-item>
        </q-list>
        </q-drawer>

        <q-page-container>
          <router-view />
        </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    logout () {
      firebase.auth().signOut().then(function () {
        alert('Logout Completed')
      })
        .catch((err) => {
          console.log(err)
        })
      this.$router.push('/loginbackend')
    }
  }
}
</script>

<style scoped>
</style>
