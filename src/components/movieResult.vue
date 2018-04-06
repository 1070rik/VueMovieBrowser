<template>
    <div class="app">
        <div class="layer"></div>
        <v-card color="red darken-3" class="card" v-if="error">
            <v-card-title primary-title>
                <div class="headline">Movie/Series not found</div>
                <div>Check if you typed te name correctly and try again</div>
            </v-card-title>
            <v-card-actions>
                <v-btn color="red darken-2" depressed :to="{ path: '/' }"><router-link to="/home" class="homeButton">Try again</router-link></v-btn>
            </v-card-actions>
        </v-card>
        <v-card color="red darken-3" class="card" v-if="dataLoaded">
            <v-card-media :src="movie.Poster" height="200px" id="posterImage" v-if="movie.Poster != 'N/A'">
            </v-card-media>
            <v-card-media height="200px" id="posterImage" v-else>
                <p class="noPoster">No Poster</p>
            </v-card-media>
            <v-card-title primary-title>
                <div>
                    <div class="headline">{{ movie.Title }}</div>
                    <p class="left informationText">IMDB Rating: {{ movie.imdbRating }}</p><p class=" left informationText">Released: {{ movie.Released }} </p><p class="informationText">Country: {{ movie.Country }}</p>
                    <span class="grey--text">Starring: {{ movie.Actors }}</span>
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
        <div v-if="loading">
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
    loading: true,
    error: false,
    bgc: {
      backgroundColor: '#fff'
    }
  }),
  created () {
    if (this.$route.params.name.length > 1) {
      axios.get(`http://www.omdbapi.com/?t=` + this.$route.params.name + `&apikey=dc0411d4`)
        .then(response => {
          // JSON responses are automatically parsed.
          this.loading = !this.loading
          if (response.data.Response !== 'False') {
            this.movie = response.data
            this.dataLoaded = !this.dataLoaded
          } else {
            // this.dataLoaded = !this.dataLoaded
            this.error = !this.error
          }
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

    #posterImage {
        line-height: 250px;
    }

    .noPoster {
        width: 100%;
        text-align: center;
        font-size: 50px;
        font-weight: 500;
    }

    .card {
        text-align: left;
        color: #fff;
    }

    .homeButton {
        text-decoration: none;
        color: #fff;
    }

    .informationText {
        padding-right: 1vw;
    }
</style>
