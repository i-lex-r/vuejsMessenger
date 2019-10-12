<template>
  <div
    :class="{
      chatFormMessage: true,
      chatFormMessage_self: self
    }"
  >
    <div class="chatFormMessage__text">
      {{ text }}
    </div>
    <div class="chatFormMessage__author">
      {{ author }}
    </div>
    <div class="chatFormMessage__date">
      {{ formattedDate }}
    </div>
  </div>
</template>

<script>
const dateStringRegexp = /[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[0-1]) ([01]\d|2[0-3]):[0-5]\d/;
export default {
  name: "comp_chatFormMessage",
  props: {
    author: {
      type: String,
      required: true
    },
    date: {
      validator: function(value) {
        return typeof value === "string" && dateStringRegexp.test(value);
      }
    },
    text: {
      type: String
    },
    self: Boolean
  },
  computed: {
    formattedDate() {
      // date format '2019-08-01 23:59',
      const dateString = this.date.split(" ")[0].split("-");
      const year = dateString[0];
      const day = dateString[2];
      const month = dateString[1];
      return `${day}.${month}.${year} ${this.date.split(" ")[1]}`;
    }
  }
};
</script>

<style lang="less">
.chatFormMessage {
  & {
    text-align: left;
  }
  &_self {
    text-align: right;
  }

  &__text {
    padding: 18px 17px 16px 26px;
    background-color: #f6f7f9;
    border-radius: 8px 8px 8px 0;
    margin-bottom: 9px;
    color: #474e54;
    text-align: left;
  }
  &_self &__text {
    background: #e9f5f4;
    border-radius: 8px 8px 0 8px;
  }
  &__author {
    font-weight: bold;
    display: inline-block;
    padding-right: 12px;
    font-size: 13px;
    line-height: 18px;
    color: #000;
  }
  &__date {
    display: inline-block;
    font-size: 10px;
    line-height: 18px;
    color: #b7c0c8;
  }
}
</style>
