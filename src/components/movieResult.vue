<template>
    <div class="app" v-bind:style="bgc">
        <div class="layer"></div>
        <v-card color="red darken-3" class="card" v-if="dataLoaded">
            <v-card-media :src="movie.Poster" height="200px">
            </v-card-media>
            <v-card-title primary-title>
                <div>
                    <div class="headline">{{ movie.Title }}</div>
                    <p>IMDB Rating: {{ movie.imdbRating }}</p>
                    <span class="grey--text">{{ movie.Actors }}</span>
                </div>
            </v-card-title>
            <v-card-actions>
                <v-btn flat color="white" :href="'http://www.imdb.com/title/' + movie.imdbID" target="_blank">View on IMDB</v-btn>
                <v-spacer/>
                <v-btn color="red darken-2" depressed :to="{ path: '/' }"><router-link to="/home" class="homeButton">Search another</router-link></v-btn>
                <v-btn icon @click.native="show = !show">
                    <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
                </v-btn>
            </v-card-actions>
            <v-slide-y-transition>
                <v-card-text v-show="show">
                    {{ movie.Plot }}
                </v-card-text>
            </v-slide-y-transition>
        </v-card>
        <div v-else>
            <v-progress-circular indeterminate :size="50" color="white"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  beforeCreate: function () {
    document.body.className = 'home'
  },
  name: 'movie_result',
  data: () => ({
    movie: [],
    show: false,
    dataLoaded: false,
    bgc: {
      backgroundColor: '#fff'
    }
  }),
  created () {
    if (this.$route.params.name.length > 1) {
      axios.get(`http://www.omdbapi.com/?t=` + this.$route.params.name + `&apikey=dc0411d4`)
        .then(response => {
          // JSON responses are automatically parsed.
          this.movie = response.data
          this.dataLoaded = !this.dataLoaded
        })
        .catch(e => {
          this.errors.push(e)
        })
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

    .card {
        text-align: left;
        color: #fff;
    }

    .homeButton {
        text-decoration: none;
        color: #fff;
    }
</style>
