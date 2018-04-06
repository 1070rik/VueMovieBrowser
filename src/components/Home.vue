<template>
    <div class="app">
        <v-card color="red darken-3" class="white--text">
            <v-card-title primary-title>
                <div class="headline">Search for a movie</div>
                <div id="movieNameInput">
                    <v-text-field name="movieName" label="Enter movie name here" v-model="movieName" class="movieName"/>
                </div>
            </v-card-title>
            <v-card-actions>
                <v-btn color="red" class="search-button" :disabled="isDisabled" :href="'movie/' + movieName">Search for the movie!</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      movieName: ''
    }
  },
  methods: {
    alert: function () {
      alert('Hi!')
    }
  },
  computed: {
    isDisabled () {
      // evaluate whatever you need to determine disabled here...
      if (this.movieName.length > 1) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style scoped>
    .app  {
        text-align: center;
        position: relative;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }
    .headline {
        width: 100%;
    }
    #movieNameInput {
        width: 100%;
    }

    .search-button {
        color: #fff;
        width: 100%;
    }
</style>
