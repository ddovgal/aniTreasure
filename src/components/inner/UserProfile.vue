<template>
  <v-card>
    <v-layout wrap>

      <v-flex xs sm6 style="position: relative;">
        <img :src="editableUserData.avatarData || 'static/noUser.png'"
        @mouseover="isAvatarHoverShowed = true"
        @mouseout="isAvatarHoverShowed = false"
        @click="changeAvatar"/>
        <transition name="fade" mode="out-in" appear>
          <div v-show="isAvatarHoverShowed" id="avatarHover">
            <div class="white--text">Change picture</div>
          </div>
        </transition>
      </v-flex>

      <v-flex xs sm6>
        <v-card-title>
          <div class="display-1 hidden-xs-only">Profile</div>
          <div class="hidden-sm-and-up">Profile</div>
        </v-card-title>

        <v-card-text>
          <v-text-field label="Email" disabled :value="auth.user.email"></v-text-field>
          <v-text-field label="Password" type="password" ref="passwordField" v-model="editableUserData.password"></v-text-field>
          <v-text-field label="Nickname" ref="nicknameField" v-model="editableUserData.nickname"></v-text-field>
        </v-card-text>

        <v-card-text v-show="errorMessage" id="errors">
          <small><div class="red--text" v-html="errorMessage"></div></small>
        </v-card-text>
      </v-flex>

    </v-layout>

    <v-card-row actions>
      <v-btn v-if="auth.user.isEmailVerified" class="blue--text darken-1" flat @click.native="updateProfile">Update</v-btn>
      <v-btn v-else class="blue--text darken-1" flat @click.native="sendVerificationMail">Send verification mail</v-btn>
      <!-- <v-btn class="blue--text darken-1" flat @click.native="deleteAccount">Delete account</v-btn> -->
      <v-btn class="blue--text darken-1" flat @click.native="logout">Logout</v-btn>
      <v-spacer/>
      <v-btn class="blue--text darken-1" flat @click.native="close">Close</v-btn>
    </v-card-row>

  </v-card>
</template>

<script>
export default {
  name: 'userProfile',
  props: {
    auth: Object
  },
  data () {
    return {
      isAvatarHoverShowed: false,
      editableUserData: {
        nickname: '',
        password: '',
        avatarData: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    close () {
      this.editableUserData.password = ''
      this.$refs.passwordField.hasFocused = false
      this.editableUserData.nickname = ''
      this.$refs.nicknameField.hasFocused = false
      this.editableUserData.avatarData = ''
      this.errorMessage = ''
      this.$emit('dialogClosed')
    },
    changeAvatar () {

    },
    updateProfile () {

    },
    logout () {
      this.$firebase.auth().signOut()
      this.$emit('dialogClosed')
    }
  },
  created () {
    this.editableUserData.nickname = this.$props.auth.user.nickname
    this.editableUserData.avatarData = this.$props.auth.user.avatarURL
  }
}
</script>

<style scoped>
/*Here just setting max height and fixing margin/padding for layout in dialog*/
.layout {
  max-height: calc(90vh - 56px);
  margin-left: 0px;
  margin-right: 0px;
  overflow-y: auto;
}
.layout > .flex {
  padding-left: 0px;
  padding-right: 0px;
}


/*Avatar image fitting and max-height = 30% of scrollable part of dialog*/
.layout > .flex img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
  /*Avatar's borders*/
/*In single column mode*/
@media(max-width: 600px) {
  .layout > .flex img {
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    max-height: calc(0.4 * (90vh - 56px));
  }
}
/*In two columns mode*/
@media(min-width: 600px) {
  .layout > .flex:first-of-type {
    padding-top: 16px;
    padding-left: 16px;
    padding-right: 16px;
    /*Need to compensate something. Dont know what and why, but need*/
    padding-bottom: 4px;
  }
  .layout > .flex img {
    border-radius: 4px;
  }
}


/*.card__text vertical padding and margin fixes*/
.flex > .card__text {
  /*padding-top: 0px;*/
  padding-bottom: 0px;
}
.flex > .card__text > .input-group:last-of-type {
  margin-bottom: 0px;
}
.flex > .card__text > .input-group:first-of-type {
  margin-top: 0px;
}
#errors {
  padding-top: 0px;
  /*padding-bottom: 0px;*/
}


/*Avater hover styling*/
#avatarHover {
  pointer-events: none; /*to prevent blinking*/
  position: absolute;
  min-height: 40px;
  height: 15%;
  text-align: center;
  background: rgba(0,0,0,.25);
  font-weight: 300;
  font-size: medium;
  text-transform: uppercase;
}
/*In single column mode*/
@media(max-width: 600px) {
  #avatarHover {
    width: 100%;
    bottom: 6px; /*avatar's "strange" bottom padding*/
  }
}
/*In two columns mode*/
@media(min-width: 600px) {
  #avatarHover {
    width: calc(100% - 32px); /* 16 right and left padding*/
    bottom: 4px; /*avatar's "strange" bottom padding*/
  }
}
/*For text y-axis centring*/
#avatarHover > .white--text {
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 50%;
}


/*Avatar hover animation*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
