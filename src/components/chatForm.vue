<template>
  <div class="chatForm">
    <div class="chatForm__dialog" v-chat-scroll>
      <div
        :class="{
          'chatForm__dialog-container': true,
          'chatForm__dialog-container_empty': isDataLoading || isDisconnect
        }"
      >
        <template v-if="isDisconnect">
          <h3 key="empty-chat-dialog-text">Выберите диалог в панели слева</h3>
        </template>
        <template v-else-if="isDataLoading">
          <chat-form-loading-indicator key="loading-chat-data-indicator" />
        </template>
        <template v-else>
          <chat-form-message
            :class="{
              'chatForm__dialog-item': true,
              'chatForm__dialog-item_self': !msg.isIncoming
            }"
            v-for="msg in chatMessages"
            :key="msg.id"
            :self="!msg.isIncoming"
            :author="msg.author"
            :date="msg.date"
            :text="msg.text"
          />
        </template>
      </div>
    </div>
    <div
      :class="{
        chatForm__input: true,
        chatForm__input_processing: isPostProcessing,
        chatForm__input_hidden: isDisconnect
      }"
    >
      <textarea
        ref="inputField"
        class="chatForm__input-field"
        :readonly="isPostProcessing"
        placeholder="Введите текст..."
        v-model="message"
        rows="1"
        @keypress.13.prevent="onMessageEnter"
        @input="checkMessageFieldResize"
      ></textarea>
      <div ref="inputShadow" class="chatForm__input-field-shadow">
        {{ message }}
      </div>
      <button
        :class="{
          'chatForm__post-button': true,
          'chatForm__post-button_disabled': isPostProcessing || !message
        }"
        @click="onMessageEnter"
      >
        <svg
          width="22"
          height="18"
          viewBox="0 0 22 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.00936317 17.2563C0.00989464 17.6114 0.3701 17.8528 0.698756 17.7183L20.8694 9.46274C21.2835 9.29324 21.2835 8.70676 20.8694 8.53726L0.698758 0.281704C0.370102 0.14719 0.00989463 0.388579 0.00936317 0.743697L0.000660091 6.55894C0.000282918 6.81096 0.187529 7.02387 0.437532 7.05569L11.8171 8.504C12.3996 8.57814 12.3996 9.42186 11.8172 9.496L0.437533 10.9443C0.187529 10.9761 0.000282918 11.189 0.000660091 11.4411L0.00936317 17.2563Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import "@/assets/fonts/TTNorms/font.css";
import ChatFormMessage from "@/components/chatFormMessage";
import ChatFormLoadingIndicator from "@/components/chatFormLoadingIndicator";
export default {
  name: "comp_ChatForm",
  components: {
    ChatFormMessage,
    ChatFormLoadingIndicator
  },
  props: {
    chatMessages: {
      validator: function(list) {
        if (Array.isArray(list)) {
          if (list.length) {
            const [item] = list;
            return item.author && item.date && item.text;
          }
          return true;
        }
        return false;
      }
    },
    isDataLoading: Boolean,
    isPostProcessing: Boolean,
    isDisconnect: Boolean
  },
  data() {
    return {
      message: "",
      messageSent: false
    };
  },
  watch: {
    chatMessages(/*newChatIdMessages*/) {
      if (this.messageSent) {
        this.messageSent = false;
        this.message = "";
        this.checkMessageFieldResize();
      }
    }
  },

  methods: {
    checkMessageFieldResize() {
      this.$nextTick(() => {
        this.$refs.inputField.style.height = `${this.$refs.inputShadow.clientHeight}px`;
      });
    },
    onMessageEnter() {
      this.messageSent = true;
      this.$emit("post-message", this.message);
    }
  }
};
</script>

<style lang="less">
.chatForm {
  & {
    height: 100%;
    display: flex;
    flex-flow: column;
    background-color: #fff;
    font-family: "TT Norms";
    font-size: 14px;
    position: relative;
    overflow: hidden;
  }
  &__dialog {
    flex: 1 1 90%;
    overflow-y: auto;
  }

  &__dialog-container {
    display: flex;
    flex-flow: column-reverse;
    align-items: flex-start;
    min-height: 100%;
    padding: 16px 16px 43px 39px;
  }
  &__dialog-container_empty {
    align-items: center;
    justify-content: center;
    font-size: 20px;
    text-align: center;
  }
  &__dialog-item {
    width: 380px;
    margin-top: 20px;
  }
  &__dialog-item_self {
    align-self: flex-end;
  }

  &__input {
    flex: 0 0 auto;
    display: flex;
    position: relative;
    align-items: center;
    min-height: 80px;
    border-top: solid 1px #e9edf2;
    transition: transform 0.5s ease-in-out;

    @keyframes elastic-line-animation {
      from {
        left: -200px;
        width: 30%;
      }
      50% {
        width: 30%;
      }
      70% {
        width: 70%;
      }
      80% {
        left: 50%;
      }
      95% {
        left: 120%;
      }
      to {
        left: 100%;
      }
    }
    &:before {
      content: "";
      position: absolute;
      left: -200px;
      top: -1px;
      width: 200px;
      height: 4px;
      background-color: #398bff;
    }
  }
  &__input_processing:before {
    animation: elastic-line-animation 1.8s linear infinite;
  }
  &__input_hidden {
    transform: translateY(101%);
  }
  &__input-field {
    flex: 1 1 auto;
    min-height: calc(1.3em + 30px);
    max-height: 170px;
    height: calc(1.3em + 30px);
    padding: 15px 33px;
    border: none;
    background-color: transparent;
    resize: none;
    outline: none;
    font-family: "TT Norms";
    font-size: 14px;
    transition: all 0.3s ease-out;
    overflow-y: hidden;
  }
  &__input-field-shadow {
    position: absolute;
    z-index: 0;
    width: calc(100% - 80px);
    top: 101%;
    left: 0;
    padding: 15px 33px;
    min-height: calc(1.3em + 30px);
    max-height: 170px;
    // font-size: 14px;
  }
  &__post-button {
    flex: 0 0 80px;
    align-self: stretch;
    border: none;
    cursor: pointer;
    background-color: #398bff;
    transition: opacity 0.3s ease-out;
  }
  &__input-field:read-only,
  &__post-button_disabled {
    opacity: 0.5;
  }
}
</style>
