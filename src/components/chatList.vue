<template>
  <transition name="fade">
    <div class="chatList">
      <h2 class="chatList__header">
        Сообщения
        <span class="chatList__header__count">
          {{ messagesCount }}
        </span>
      </h2>
      <div class="chatList__items">
        <chat-list-item
          v-for="chat in chatList"
          :key="chat.id"
          :isSelected="chat.id === chatSelectedId"
          :subject="chat.subject"
          :date="chat.date"
          :text="chat.text"
          @click.native="onChatItemClick(chat.id)"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import "@/assets/fonts/TTNorms/font.css";
import ChatListItem from "@/components/chatListItem";
export default {
  name: "comp_chatList",
  components: {
    ChatListItem
  },
  props: {
    messagesCount: {
      type: Number,
      default: 0
    },
    chatList: {
      validator: function(list) {
        if (Array.isArray(list)) {
          if (list.length) {
            const [item] = list;
            return item.subject && item.date;
          }
          return true;
        }
        return false;
      }
    },
    chatSelectedId: {
      type: Number,
      default: 0
    }
  },
  methods: {
    onChatItemClick(chatId) {
      this.$emit("select-chat", chatId);
    }
  }
};
</script>

<style lang="less">
.chatList {
  & {
    height: 100%;
    background-color: #f3f6f8;
    font-family: "TT Norms";
    display: flex;
    flex-flow: column;
  }
  &__header {
    flex: 0 0 60px;
    margin: 0;
    padding: 24px 20px;
    border-bottom: solid 1px #e9edf2;

    font-size: 14px;
    font-weight: normal;
    line-height: 20px;
    color: #656b77;
  }
  &__header__count {
    display: inline-block;
    margin-left: 10px;
    color: #d2d8de;
    font-weight: bold;
  }
  &__items {
    flex: 1 1 60px;
    overflow: auto;
  }
}
</style>
