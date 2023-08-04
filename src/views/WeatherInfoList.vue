<template>
  <div class="cities-weather-list">
    <CityWeatherInfo v-for="city in citiesWeather" :key="city.id" :city="city"/>
    <GearButton @switchToSettings="switchToSettings"/>
    <div v-if="!citiesWeather.length" class="empty-list-pug">There is nothing to show :(</div>
  </div>
</template>

<script>
import CityWeatherInfo from "@/components/CityWeatherInfo";
import GearButton from "@/ui/GearButton";

export default {
  components: {CityWeatherInfo, GearButton},
  name: "WeatherInfoList",
  props: ['citiesWeather'],
  methods: {
    switchToSettings() {
      this.$emit('switchToSettings')
    }
  },

}
</script>

<style scoped lang="scss">
.cities-weather-list::v-deep {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  max-height: 400px;
  overflow: auto;
  position: relative;
  width: 100%;
  max-width: 300px;
  min-height: 100px;

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    gap: 10px;
    border-radius: 20px;
  }

  > svg {
    position: absolute;
    top: 15px;
    right: 15px;
  }
}

</style>