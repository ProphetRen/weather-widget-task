<template>
  <div class="weather-app-message-wrapper">
    <span>{{ message }}</span>
    <closeButton @closePopup="closePopup"/>
  </div>
</template>

<script>
import CloseButton from "@/ui/CloseButton";

export default {
  name: "MessagePopup",
  props: ['message'],
  components: {CloseButton},
  methods: {
    closePopup() {
      this.$emit('closePopup')
    }
  }
}
</script>

<style scoped lang="scss">

.weather-app-message-wrapper {
  width: 100%;
  max-width: 250px;
  padding: 10px 20px;
  position: absolute;
  top: 50%;
  background: gray;
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;

  > svg {
    position: absolute;
    top: 5px;
    right: 10px;
    width: 15px;
    height: 15px;

  }
}

</style>