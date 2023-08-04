<template>
  <div class="city-weather-info cities-weather-list__item">
    <div class="city-weather-info__header">
      {{ city.name }}, {{ city.sys.country }}
    </div>
    <div class="city-weather-info__body">
      <div class="city-weather-info__main-temperature-info">
        <img :src="imagesApi" alt="">
        <span class="city-weather-info__temperature" title="Temperature">{{ Math.round(city.main.temp) }}°C</span>
      </div>
      <div class="city-weather-info__description-text">
        <span class="city-weather-info__feels-like"
              title="Feels like temperature">Feels like {{ Math.round(city.main.feels_like) }}°C. </span>
        <span class="city-weather-info__clouds-info" title="Clouds">{{ city.weather[0].main }}. </span>
        <span class="city-weather-info__clouds-description"
              title="Clouds description">{{ city.weather[0].description }}.</span>
      </div>
    </div>
    <div class="city-weather-info__footer">
      <div class="city-weather-info__winds-speed" title="Winds speed">Wind speed: {{ city.wind.speed }}m/s</div>
      <div class="city-weather-info__pressure" title="Pressure">Pressure: {{ city.main.pressure }}hPa</div>
      <div class="city-weather-info__humidity" title="Humidity">Humidity: {{ city.main.humidity }}%</div>
      <div class="city-weather-info__visibility" title="Visibility">Visibility: {{ convertVisibilityProp }}km</div>
    </div>
  </div>
</template>

<script>
import {apiList} from "@/api";

export default {
  name: "CityWeatherInfo",
  computed: {
    imagesApi() {
      return apiList.imagesApi + this.city.weather[0].icon + '.png'
    },
    convertVisibilityProp() {
      return this.city.visibility / 1000
    }
  },
  props: ['city'],
}
</script>

<style scoped lang="scss">


.city-weather-info {
  padding: 10px;
  background: #f1f1f1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 20px;

  &__header {
    font-size: 16px;
    font-weight: bold;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 15px;

  }

  &__main-temperature-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;

    > img {
      background: gray;
      border-radius: 20px;
      width: 100px;
      height: 100px;
    }
  }

  &__temperature {
    font-size: 20px;
  }

  &__description-text {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  &__footer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    max-width: 300px;
  }
}

</style>