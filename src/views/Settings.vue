<template>
  <div class="settings-list">
    <div class="settings-list__header">
      <span class="settings-list__header-text">Settings</span>
      <BackButton @switchToWeather="switchToWeather"/>
    </div>
    <div class="settings-list__body">
      <SettingsCity v-for="city in citiesList" :city="city" :currentCard="currentCard" @deleteCityFromState="deleteCity"
                    @setCurrentDraggableCity="setCurrentDraggableCity" @dropCard="sortCards"/>
    </div>
    <div class="settings-list__footer">
      <label for="weatherAppCityInput" class="settings-list__city-input-label">Add location: </label>
      <div class="settings-list__input-wrapper">
        <input id="weatherAppCityInput" type="text" v-model="cityName" class="settings-list__input">
        <EnterButton @addCity="addCity"/>
      </div>
    </div>
    <MessagePopup :message="message" v-if="message" @closePopup="setMessage('')"/>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import {defineComponent} from "vue";
import BackButton from "@/ui/BackButton";
import EnterButton from "@/ui/EnterButton";
import MessagePopup from "@/components/MessagePopup";
import SettingsCity from "@/components/SettingsCity";

export default defineComponent({
  data() {
    return {
      cityName: '',
      currentCard: undefined
    }
  },
  computed: {
    ...mapState(['message']),
  },
  props: ['citiesList'],
  name: "Settings",
  components: {BackButton, EnterButton, MessagePopup, SettingsCity},
  methods: {
    ...mapActions(['addCityToState', 'deleteDataFromLocalStorage', 'sortCities']),
    ...mapMutations(['setMessage']),
    switchToWeather() {
      this.$emit('switchToWeather')
    },
    addCity() {
      this.addCityToState(this.cityName)
    },
    deleteCity(id) {
      this.deleteDataFromLocalStorage(id)
    },
    setCurrentDraggableCity(city) {
      this.currentCard = city
    },
    sortCards(dropCity) {
      this.sortCities({
        dropCard: dropCity,
        currentCard: this.currentCard
      })
    }
  }
})
</script>

<style lang="scss" scoped>

.settings-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  width: 100%;
  max-width: 350px;

  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-text {
      font-size: 20px;
    }
  }

  &__body {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 30px;
  }

  &__footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
  }

  &__input-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__input {
    width: 250px;
    font-size: 16px;
  }
}

</style>