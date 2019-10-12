<template>
  <div class="chatWindow">
    <div class="chatWindow__list">
      <slot name="list">Список чатов</slot>
    </div>
    <div class="chatWindow__form">
      <slot name="form">Форма сообщений</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "comp_ChatWindow"
};
</script>

<style lang="less">
.chatWindow {
  & {
    height: 100%;
    display: flex;
    align-items: stretch;
  }
  &__list {
    flex: 0 1 300px;
    max-width: 300px;
  }
  &__form {
    flex: 1 0 50%;
    z-index: 2;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  }
}
</style>
