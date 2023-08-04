<template>
  <div class="weather-app-wrapper">
    <weather-info-list v-if="!isSettingsView && savedCities" @switchToSettings="isSettingsView = true" :citiesWeather="citiesWeather"/>
    <settings v-else-if="isSettingsView" @switchToWeather="isSettingsView = false" :cities-list="savedCities"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import WeatherInfoList from '@/views/WeatherInfoList.vue'
import Settings from '@/views/Settings.vue'
import {mapActions, mapMutations, mapState} from "vuex";

export default defineComponent({
  data() {
    return {
      isSettingsView: false,
    }
  },
  computed: {
    ...mapState(['savedCities', 'citiesWeather']),
  },
  name: 'App',
  components: {WeatherInfoList, Settings},
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions(['getCurrentLocation', 'loadCitiesWeather']),
    ...mapMutations(['setSavedCities']),
    init() {
      if (!window.localStorage.weatherApp || !JSON.parse(window.localStorage.weatherApp)?.citiesList?.length) {
        window.localStorage.setItem('weatherApp', '{}')
        this.getCurrentLocation()
      } else {
        this.setSavedCities(JSON.parse(window.localStorage.weatherApp)?.citiesList)
        this.loadCitiesWeather()
      }
    },
  }
});
</script>

<style lang="scss" scoped>

.weather-app-wrapper::v-deep {
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  * {
    font-family: "Roboto", sans-serif;
    box-sizing: border-box;
  }
  svg {
    cursor: pointer;
  }

  .empty-list-pug {
    font-size: 18px;
    font-weight: bold;
  }
}

</style>

