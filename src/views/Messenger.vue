<template>
  <chat-window>
    <template #list>
      <chat-list
        :messagesCount="151"
        :chatList="chatList"
        :chatSelectedId="+chatId"
        @select-chat="onChatSelect"
      />
    </template>
    <template #form>
      <chat-form
        :isDisconnect="!chatId"
        :chatMessages="selectedChatMessages"
        :isDataLoading="chatDataLoading"
        :isPostProcessing="chatPostProcessing"
        @post-message="onPostMessage"
      />
    </template>
  </chat-window>
</template>

<script>
import ChatWindow from "@/components/chatWindow.vue";
import ChatList from "@/components/chatList.vue";
import ChatForm from "@/components/chatForm.vue";

import { mapMutations, mapGetters, mapActions } from "vuex";
import { isNull } from "util";

export default {
  name: "view_Messenger",
  components: {
    ChatWindow,
    ChatList,
    ChatForm
  },
  props: {
    chatId: {
      type: String,
      default: ""
    },
    routingIsUsed: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chatDataLoading: false,
      chatPostProcessing: false
    };
  },
  watch: {
    chatId(newChatId) {
      this.setChatSelected(newChatId || 0);
    },
    selectedChat(newChat) {
      if (this.chatId && isNull(newChat)) {
        alert(`Не найден чат c id:${this.chatId}`);
        this.$router.push("/chat");
      } else if (newChat && isNull(this.chatMessages)) {
        this.requestChatMessages();
      }
    }
  },
  computed: {
    ...mapGetters(["chatList", "selectedChat", "chatMessages"]),
    selectedChatMessages() {
      return this.chatMessages || [];
    }
  },
  mounted() {
    if (this.chatId) {
      this.setChatSelected(this.chatId);
      this.$nextTick(() => {
        if (this.chatId && isNull(this.selectedChat)) {
          alert(`Не найден чат c id:${this.chatId}`);
          this.$router.push("/chat");
        }
      });
    }
  },
  methods: {
    ...mapMutations(["setChatSelected"]),
    ...mapActions(["postMessage", "requestMessages"]),
    onChatSelect(selectChatId) {
      if (this.routingIsUsed) {
        if (String(selectChatId) !== this.chatId) {
          this.$router.push(`/chat/${selectChatId}`);
        } else {
          this.$router.push("/chat");
        }
      }
    },
    async onPostMessage(message) {
      this.chatPostProcessing = true;
      await this.postMessage({ chatId: this.chatId, message });
      this.chatPostProcessing = false;
    },
    async requestChatMessages() {
      this.chatDataLoading = true;
      await this.requestMessages({ chatId: this.chatId });
      this.chatDataLoading = false;
    }
  }
};
</script>
