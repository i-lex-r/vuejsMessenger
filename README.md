# Task: make a simple list of messages.

This is the test project to demonstrate develop "messenger mockup" with vue.js.

Project build is located [here](https://i-lex-r.github.io/vuejsMessenger/dist/).

### Layout: https://www.figma.com/file/VUgBI3xtcU56EDR4u7uJVK/Test

![layout preview](/public/preview.png)

### General requirements

- The application must be implemented on Vue JS using Vuex or similar
- Support routing (displaying a specific dialog by ID)
- When you open a dialog, an animated loader (loading animation) is displayed on the right side with a list of messages
- When sending a new message, the input field and the send button are blocked, and an animated loader appears at the time of sending
- For testing, you can set an artificial delay so that these loaders are visible (that is, you do not need to send data to the server, everything works in a local state)
- BEM layout

**Important!** Create an application in the best traditions of the component approach.
Imagine that the application will further develop and acquire different functionality.

```
Sample data:
  [
    {
      id: 1,
      subject: 'Простой запрос',
      created: '2019-08-01 23:59',
      parts: [
        {
          id: 1,
          author: 'vasya',
          text: 'Привет, как дела?',
          created: '2019-08-01 23:59',
        },
        {
          id: 2,
          author: 'petya',
          created: '2019-08-02 01:20',
          text: 'Привет, все хорошо, спасибо!',
        },
        {
          id: 3,
          author: 'petya',
          created: '2019-08-02 05:20',
          text: 'А у тебя?',
        },
      ],
    },
    {
      id: 2,
      subject: 'Вопрос по домену',
      created: '2016-03-02 14:19',
      parts: [
        {
          id: 1,
          author: 'petr',
          created: '2019-08-06 12:20',
          text: 'Здравствуйте, тут есть кто-нибудь?',
        },
        {
          id: 2,
          author: 'vasiliy',
          created: '2019-08-06 12:34',
          text: 'Да, я вас слушаю!',
        },
        {
          id: 3,
          author: 'petr',
          created: '2019-08-06 12:38',
          text: 'Помогите мне настроить домен!',
        },
      ],
    },
  ];
```

```
npm run serve
npm run build
npm run test
npm run lint
```
