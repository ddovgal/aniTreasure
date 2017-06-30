<template>
<div id="app">
  <v-app>

    <v-toolbar class="primary" light>
      <!-- <v-btn icon light small class="hidden-sm-and-down" /> -->

      <v-btn icon light large @click.native="manualRoute('Explore')">
        <img style="width: 28px;" src="./assets/logoIcon.svg">
      </v-btn>

      <v-toolbar-title style="padding-left: 0;">AniTreasure<span class="hidden-md-and-down"> - anime pictures for soul</span></v-toolbar-title>
      <!-- <v-spacer class="hidden-sm-and-up"></v-spacer> -->

      <v-toolbar-items>
        <v-toolbar-item disabled class="hidden-xs-only">By Ddovgal</v-toolbar-item>
      </v-toolbar-items>

      <a href="https://t.me/ddovgal">
        <v-btn icon light class="hidden-xs-only">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#FFFFFF" d="M9.78,18.65L10.06,14.42L17.74,7.5C18.08,7.19 17.67,7.04 17.22,7.31L7.74,13.3L3.64,12C2.76,11.75 2.75,11.14 3.84,10.7L19.81,4.54C20.54,4.21 21.24,4.72 20.96,5.84L18.24,18.65C18.05,19.56 17.5,19.78 16.74,19.36L12.6,16.3L10.61,18.23C10.38,18.46 10.19,18.65 9.78,18.65Z" />
          </svg>
        </v-btn>
      </a>

      <a href="https://github.com/ddovgal">
        <v-btn icon light class="hidden-xs-only">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#FFFFFF" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
          </svg>
        </v-btn>
      </a>

      <v-dialog persistent hide-overlay v-model="dialogIsOpened" :width="isLogged ? '90%' : '350px'">
        <v-btn v-if="isLogged" light icon slot="activator" style="margin-left: 12px;">
          <img style="width: 32px; border-radius: 16px;" :src="currentUser.photoUrl || 'static/noUser.png'">
        </v-btn>
        <v-btn v-else light flat class="btn--light-flat-focused" slot="activator">
        <!-- <v-btn v-else light flat slot="activator" style="margin-right: -12px;"> -->
        <!-- <v-btn v-else light flat slot="activator" style="margin-right: -12px; margin-left: -2px"> -->
          <v-icon light>exit_to_app</v-icon>&nbsp;Login
        </v-btn>

        <component :is="dialogComponent" @dialogClosed="dialogIsOpened = false"/>
      </v-dialog>

      <!-- <v-btn icon light class="hidden-sm-and-down" /> -->
    </v-toolbar>

    <main>
      <v-container fluid>
        <transition name="fade" mode="out-in" appear>
          <router-view/>
        </transition>
      </v-container>
    </main>

    <v-bottom-nav value="true">
      <v-btn flat light @click.native="manualRoute('Add')" :value="selectedNavButton === 'Add'">
        <span>Add</span>
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn flat light @click.native="manualRoute('Explore')" :value="selectedNavButton === 'Explore'">
        <span>Explore</span>
        <v-icon>explore</v-icon>
      </v-btn>
      <v-btn flat light @click.native="manualRoute('Search')" :value="selectedNavButton === 'Search'">
        <span>Search</span>
        <v-icon>search</v-icon>
      </v-btn>
    </v-bottom-nav>

  </v-app>
</div>
</template>

<script>
import UserProfile from './components/inner/UserProfile'
import LogInUp from './components/inner/LogInUp'

export default {
  name: 'app',
  components: {
    UserProfile,
    LogInUp
  },
  data () {
    return {
      // set isLogged to false
      isLogged: true,
      // set currentUser to null
      currentUser: {
        photoURL: 'https://avatars0.githubusercontent.com/u/11231875?v=3&s=460'
      },
      emptyUser: {
        displayName: '',
        email: '',
        emailVerified: false,
        photoURL: ''
      },
      dialogIsOpened: false,
      selectedNavButton: ''
    }
  },
  computed: {
    dialogComponent () {
      return this.isLogged ? 'user-profile' : 'logInUp'
    }
  },
  methods: {
    manualRoute (name) {
      this.$router.push({
        name
      })
      this.selectedNavButton = name
    }
  },
  mounted () {
    // useing for setting active button on first interact
    const path = this.$route.path
    this.selectedNavButton = path.charAt(1).toUpperCase() + path.slice(2) || 'Explore'

    // firebase auth listener
    const vm = this
    this.$firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        vm.isLogged = true
        vm.currentUser.displayName = user.displayName
        vm.currentUser.email = user.email
        vm.currentUser.emailVerified = user.emailVerified
        vm.currentUser.photoURL = user.photoURL
      } else {
        vm.isLogged = false
        vm.currentUser = vm.emptyUser
      }
    })
  }
}
</script>

<style lang="stylus">
@import './stylus/main'
</style>

<style>
/*Dialog's default width is 90%. But need to set max-width.
So its 90%, but not more than 600px*/
.dialog:not(.dialog--fullscreen) {
  max-width: 600px;
}


/*Scrollable part of dialog. Need to set only max height.
Its 90vh(because dialog's max-height=90%) - 56px(height of bottom action card__row)*/
.dialog--scrollable .card__row:not(.card__row--actions) {
  max-height: calc(90vh - 56px);
}


.toolbar {
  height: 48px;
  font-weight: 300;
}

.toolbar__title {
  font-size: 22px;
}

.toolbar__items li {
  font-size: 16px;
}

.toolbar__item--disabled {
  opacity: 1;
}


/*Need additional 56px(default defined height of v-bottom-nav)
of bottom padding for container inner content, because of bottom bar.
Container have min-height: calc(100vh - 56px), thats why need increase padding
directly in container*/
.application > main > .container {
  /*default full 24px + additional 56px = 80px*/
  padding-bottom: 80px;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
