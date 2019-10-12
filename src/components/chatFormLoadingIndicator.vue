<template>
  <div class="chatFormLoadingIndicator" />
</template>

<script>
export default {
  name: "comp_chatFormLoadingIndicator"
};
</script>

<style lang="less">
// https://codepen.io/ibanez182/pen/YyJKde
@keyframes sk-chasing-dots-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes sk-chasing-dots-bounce {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
.chatFormLoadingIndicator {
  & {
    width: 4em;
    height: 4em;
    position: relative;
    margin: auto;
    text-align: center;
    animation: sk-chasing-dots-rotate 2s infinite linear;
  }
  &:before,
  &:after {
    content: "";
    width: 2em;
    height: 2em;
    display: inline-block;
    position: absolute;
    top: 0;
    background-color: #398bff;
    border-radius: 100%;
    animation: sk-chasing-dots-bounce 2s infinite ease-in-out;
  }

  &:after {
    top: auto;
    bottom: 0;
    animation-delay: -1s;
  }
}
</style>
