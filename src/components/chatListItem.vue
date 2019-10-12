<template>
  <div
    :class="{
      chatListItem: true,
      chatListItem_selected: isSelected
    }"
  >
    <div class="chatListItem__subject">
      {{ subject }}
    </div>
    <div class="chatListItem__date">
      {{ formattedDate }}
    </div>
    <div class="chatListItem__preview">
      {{ text }}
    </div>
  </div>
</template>

<script>
const dateStringRegexp = /[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[0-1]) ([01]\d|2[0-3]):[0-5]\d/;
const monthNames = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Мая",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек"
];
export default {
  name: "comp_chatListItem",
  props: {
    subject: {
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
    isSelected: Boolean
  },
  computed: {
    formattedDate() {
      // date format '2019-08-01 23:59',
      const dateString = this.date.split(" ")[0].split("-");
      const year = parseInt(dateString[0]);
      const day = parseInt(dateString[2]);
      const monthIndex = parseInt(dateString[1]) - 1;
      return `${day} ${monthNames[monthIndex]} ${year}`;
    }
  }
};
</script>

<style lang="less">
.chatListItem {
  & {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    cursor: pointer;

    padding: 20px 20px 22px 23px;
    background-color: #f3f6f8;
    border-bottom: solid 1px #e9edf2;
    transition: backgroud-color 0.3s ease;
    font-size: 14px;

    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: -1px;
      bottom: -1px;
      width: 2px;
      background-color: #398bff;
      transform: scaleY(0);
      transform-origin: 50%;
      transition: transform 0.25s ease;
    }
  }

  &__subject {
    flex: 1 0 auto;
    max-width: calc(100% - 7em * 0.714);

    line-height: 1.428;
    font-weight: bold;
    color: #35383d;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__date {
    flex: 0 1 auto;
    width: 6.5em;

    font-size: 0.714em;
    text-align: right;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #b7c0c8;
  }
  &__preview {
    flex: 1 1 100%;

    font-size: 0.928em;
    line-height: 1.45;
    color: #7d8790;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 2.768em;
    overflow: hidden;
  }

  &_selected {
    background-color: #ffffff;
    &:before {
      transform: scaleY(1);
    }
  }
  &_selected &__date {
    color: #7d8790;
  }
}
</style>
