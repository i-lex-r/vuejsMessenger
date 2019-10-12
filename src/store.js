import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const getCurrentDateTimeString = () => {
  //  "2019-08-06 12:34",
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hours = now.getHours();
  const min = now.getMinutes();
  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  } ${hours < 10 ? `0${hours}` : hours}:${min < 10 ? `0${min}` : min}`;
};
const randId = () => {
  return Math.round(Math.random() * 10000);
};
export default new Vuex.Store({
  state: {
    chatsData: [
      {
        id: 1,
        subject: "Простой запрос",
        created: "2019-08-01 23:59",
        parts: [
          {
            id: 1,
            author: "vasya",
            text: "Привет, как дела?",
            created: "2019-08-01 23:59"
          },
          {
            id: 2,
            author: "petya",
            created: "2019-08-02 01:20",
            text: "Привет, все хорошо, спасибо!"
          },
          {
            id: 3,
            author: "petya",
            created: "2019-08-02 05:20",
            text:
              "Pharetra, eum ut primis orci labore velit? Ridiculus. Officia mattis pariatur justo.  Ridiculus. Officia mattis pariatur justo"
          }
        ]
      },
      {
        id: 2,
        subject: "Вопрос по домену",
        created: "2016-03-02 14:19",
        parts: [
          {
            id: 1,
            author: "petr",
            created: "2019-08-06 12:20",
            text: "Здравствуйте, тут есть кто-нибудь?"
          },
          {
            id: 2,
            author: "vasiliy",
            created: "2019-08-06 12:34",
            text: "Да, я вас слушаю!"
          },
          {
            id: 3,
            author: "petr",
            created: "2019-08-06 12:38",
            text: "Помогите мне настроить домен!"
          }
        ]
      },
      {
        id: 3,
        subject: "Вопрос про пену",
        created: "2016-03-02 14:19",
        parts: null
      },
      {
        id: 4,
        subject: "Вопрос Диагену",
        created: "2016-03-02 14:19",
        parts: null
      },
      {
        id: 5,
        subject: "Вопрос по коллагену",
        created: "2016-03-02 14:19",
        parts: null
      },
      {
        id: 6,
        subject: "Когда придет Лена",
        created: "2016-03-02 14:19",
        parts: null
      },
      {
        id: 7,
        subject: "А может быть на месте Гена",
        created: "2016-03-02 14:19",
        parts: null
      }
    ],
    selectedChatId: 0,
    userData: {
      name: "Александр"
    }
  },
  getters: {
    chatList: state => {
      return state.chatsData.map(i => {
        const lastMessage = i.parts && i.parts.slice(-1)[0];
        return {
          id: i.id,
          subject: i.subject,
          date: (lastMessage && lastMessage.created) || i.created,
          text: (lastMessage && lastMessage.text) || ""
        };
      });
    },
    selectedChat: state => {
      if (!state.selectedChatId) {
        return null;
      }

      const selectedChat = state.chatsData.find(
        i => i.id === state.selectedChatId
      );

      return selectedChat || null;
    },
    chatMessages: (state, getters) => {
      const chat = getters.selectedChat;

      if (!chat) {
        return null;
      }

      if (!chat.parts) {
        return null;
      }

      return chat.parts
        .map(i => {
          return {
            id: `${chat.id}_${i.id}`,
            author: i.author,
            date: i.created,
            text: i.text,
            isIncoming: state.userData.name !== i.author
          };
        })
        .reverse();
    }
  },
  mutations: {
    setChatSelected(state, chatId) {
      state.selectedChatId = +chatId;
    },
    addChatMessages(state, { chatId, messages }) {
      const newChatsData = state.chatsData.map(i => {
        if (i.id === +chatId) {
          return {
            ...i,
            parts: [
              ...(i.parts || []),
              ...messages.map(m => {
                return {
                  id: m.id,
                  author: m.author,
                  created: getCurrentDateTimeString(),
                  text: m.text
                };
              })
            ]
          };
        } else {
          return i;
        }
      });
      state.chatsData = newChatsData;
    }
  },
  actions: {
    postMessage({ commit, state }, { chatId, message }) {
      return new Promise(resolve => {
        // stub
        setTimeout(() => {
          const newMessage = {
            id: randId(),
            author: state.userData.name,
            created: getCurrentDateTimeString(),
            text: message
          };
          commit("addChatMessages", { chatId, messages: [newMessage] });
          resolve();
        }, 3000 * Math.random());
      });
    },
    requestMessages({ commit }, { chatId }) {
      return new Promise(resolve => {
        // stub
        setTimeout(() => {
          const newMessages = [
            {
              id: 1,
              author: "petr",
              created: "2019-08-06 12:20",
              text: "Здравствуйте, тут есть кто-нибудь?"
            },
            {
              id: 2,
              author: "vasiliy",
              created: "2019-08-06 12:34",
              text: "Да, я вас слушаю!"
            },
            {
              id: 3,
              author: "petr",
              created: "2019-08-06 12:38",
              text: "Помогите мне настроить домен!"
            }
          ];
          commit("addChatMessages", { chatId, messages: newMessages });
          resolve();
        }, 3000 * Math.random());
      });
    }
  }
});
