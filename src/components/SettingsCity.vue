<template>
  <div class="settings-item" @dragstart="settingsItemDragHandler" @dragleave=""
       @dragend="settingsItemDragHandler" @dragover.prevent="" @drop.prevent="settingsItemDragHandler"
       :ref="calcItemRef">
    <BurgerButton @mousedown="burgerDragHandler"/>
    <span class="settings-item__city-name">{{ city.name }}, {{ city.country }}</span>
    <DeleteButton @deleteItem="deleteCity"/>
  </div>
</template>

<script>
import BurgerButton from "@/ui/BurgerButton";
import DeleteButton from "@/ui/DeleteButton";

export default {
  name: "SettingsCity",
  components: {BurgerButton, DeleteButton},
  props: ['city', 'currentCard'],
  computed: {
    calcItemRef() {
      return `settings-item-${this.city.id}`
    }
  },
  methods: {
    deleteCity() {
      this.$emit('deleteCityFromState', this.city.id)
    },
    burgerDragHandler() {
      this.$refs[this.calcItemRef].draggable = true
    },
    settingsItemDragHandler(e) {
      switch (e.type) {
        case 'dragstart':
          this.$emit('setCurrentDraggableCity', this.city)
          break;
        case 'drop':
          this.$emit('dropCard', this.city)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.settings-item {
  padding: 5px;
  border: 2px solid #e7e7e7;
  background: #e7e7e7;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &__city-name {
    font-size: 18px;
  }

  > svg {
    width: 20px;
    height: 20px;
  }
}

</style>