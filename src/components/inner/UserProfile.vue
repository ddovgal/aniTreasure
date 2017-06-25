<template>
  <v-card>
    <v-card-row>
      <v-layout wrap>

        <v-flex xs sm6>
          <img src="http://images.sciencetimes.com/data/images/full/2142/dark-matter.jpg"/>
        </v-flex>

        <v-flex xs sm6>
          <v-layout column-sm wrap>
            <v-flex xs12>
              <v-card-title>
                <div class="display-2 hidden-xs-only">User Profile</div>
                <div class="hidden-sm-and-up">User Profile</div>
              </v-card-title>
            </v-flex>
            <v-flex xs12>
              <v-card-text>
                <v-text-field label="Email" required></v-text-field>
                <v-text-field label="Password" type="password" required></v-text-field>
                <v-text-field label="Nickname" required></v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs>
          <v-card-text>
            <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
            <v-text-field label="Legal last name" hint="example of persistent helper text" persistent-hint required></v-text-field>
            <v-select label="Age" required :items="['0-17', '18-29', '30-54', '54+']"></v-select>
            <small>*indicates required field</small>
          </v-card-text>
        </v-flex>

      </v-layout>
    </v-card-row>

    <v-card-row actions>
      <v-btn class="blue--text darken-1" flat @click.native="$emit('dialogClosed')">Close</v-btn>
      <v-btn class="blue--text darken-1" flat @click.native="$emit('dialogClosed')">Save</v-btn>
    </v-card-row>

  </v-card>
</template>

<script>
export default {
  name: 'userProfile',
  data () {
    return {
      // msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
/*Here just fixing margin/padding for layout in dialog*/
.layout {
  max-height: calc(90vh - 56px);
  margin-left: 0px;
  margin-right: 0px;
}
.layout > .flex {
  padding-left: 0px;
  padding-right: 0px;
}


/*Avatar image fitiing and max-height = 30% of scrollable part of dialog*/
.layout > .flex img {
  height: 300px;
  max-height: calc(0.3*(90vh - 56px));
  object-fit: cover;
  width: 100%;
  border-top-left-radius: 2px;
  /*border-top-right-radius: 2px;*/
}
/*Avatar's borders*/
@media(max-width: 600px) {
  .layout > .flex img {
    border-top-right-radius: 2px;
  }
}
@media(min-width: 600px) {
  .layout > .flex img {
    border-bottom-right-radius: 4px;
    /*In two columns mode no more need of max-height.
    It will be equal to heit of another column*/
    max-height: none;
  }
}


/*Right column padding and margin fixes*/
.column-sm > .flex > .card__text {
  padding-bottom: 0px;
  margin-bottom: -16px;
}
.column-sm > .flex > .card__text > .input-group:last-child {
  margin-bottom: 0px;
}
/*@media only screen and (min-width: 600px) {
  .flex > .card__text > .input-group:first-child {
    margin-top: 0px;
  }
}*/
</style>
