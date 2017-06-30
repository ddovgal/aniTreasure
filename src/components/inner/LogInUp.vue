<template>
  <v-card>
    <v-card-row>
      <v-card-title>Enter your credentials</v-card-title>
    </v-card-row>
    <v-card-row>
      <v-card-text>
        <v-text-field label="Email" required v-model="email"></v-text-field>
        <v-text-field label="Password" type="password" required v-model="password"></v-text-field>
        <small>*indicates required field</small>
      </v-card-text>
    </v-card-row>
    <v-card-row v-show="errorMessage" id="errors">
      <v-card-text>
        <small><div class="red--text" v-html="errorMessage"></div></small>
      </v-card-text>
    </v-card-row>

    <v-card-row actions>
      <v-btn class="blue--text darken-1" flat @click.native="logIn">Log in</v-btn>
      <v-btn class="blue--text darken-1" flat @click.native="signUp">Sign up</v-btn>
      <v-spacer/>
      <v-btn class="blue--text darken-1" flat @click.native="$emit('dialogClosed')">Close</v-btn>
    </v-card-row>

  </v-card>
</template>

<script>
export default {
  name: 'logInUp',
  data () {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    checkInputDataCorrectness () {
      let isAllOk = true
      const noEmailMessage = 'Please enter an email address'
      const noPasswordMessage = 'Please enter a password'

      if (this.email.length < 5) {
        this.errorMessage = noEmailMessage
        isAllOk = false
      }
      if (this.password.length < 4) {
        this.errorMessage += '<br>' + noPasswordMessage
        isAllOk = false
      }

      return isAllOk
    },
    logIn () {
      if (!this.checkInputDataCorrectness()) return

      const vm = this
      this.$firebase.auth().signInWithEmailAndPassword(vm.email, vm.password).catch((error) => {
        const errorCode = error.code
        switch (errorCode) {
          case 'auth/invalid-email':
            vm.errorMessage = 'Email address is not valid'
            break
          case 'auth/user-disabled':
            vm.errorMessage = 'User corresponding to the given email has been disabled'
            break
          case 'auth/user-not-found':
            vm.errorMessage = 'There is no user corresponding to the given email'
            break
          case 'auth/wrong-password':
            vm.errorMessage = 'Password is invalid for the given email, or the account corresponding to the email does not have a password set'
        }
      })
    },
    signUp () {
      if (!this.checkInputDataCorrectness()) return

      const vm = this
      this.$firebase.auth().createUserWithEmailAndPassword(vm.email, vm.password).then((user) => {
        user.sendEmailVerification()
      }).catch((error) => {
        const errorCode = error.code
        switch (errorCode) {
          case 'auth/email-already-in-use':
          case 'auth/operation-not-allowed':
            vm.errorMessage = 'Account with the given email address is already exists'
            break
          case 'auth/invalid-email':
            vm.errorMessage = 'Please enter a valid email address'
            break
          case 'auth/weak-password':
            vm.errorMessage = 'Please enter a stronger password'
        }
      })
    }
  }
}
</script>

<style scoped>
/*.card__text vertical padding and margin fixes*/
.card__text > .input-group:last-of-type {
  margin-bottom: 0px;
}
.card__text > .input-group:first-of-type {
  margin-top: 0px;
}
#errors > .card__text {
  padding-top: 0px;
  /*padding-bottom: 0px;*/
}
</style>
