<template>
  <div class="cascader-container">
    <input
      :class="['input-box', size]"
      type="text"
      :placeholder="placeHolder"
      v-model="textarea"
      @change="$emit('change', $event, textarea.split('/'))"
      @click="inputClick"
      readonly
      unselectable="on"
    />
    <transition name="cascader-open">
      <div
        :class="['select-container', size, direction]"
        v-show="clickedInput"
        :style="containerTransition"
      >
        <transition-group :name="groupMoveOut" tag="div" class="group">
          <ul
            :class="['cascader-list', size]"
            v-for="(list, index) in optionList"
            :key="list[0][label]"
            @click="optionChoose($event, index, list)"
            v-show="showList[index] && clickedInput"
          >
            <li
              :class="['cascader-option', size]"
              v-for="(option, index) in list"
              :key="option[label]"
              :data-index="index"
            >
              {{ option[label] }}
            </li>
          </ul>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "cascader-input",
  props: {
    async: {
      type: Boolean,
      default: false,
    },
    list: {
      tyle: Array,
    },
    label: {
      type: String,
    },
    value: {
      type: String,
    },
    children: {
      type: String,
    },
    size: {
      type: String,
      default: "middle",
    },
    placeHolder: {
      default: '请选择',
    }
  },
  data() {
    return {
      num: 0,
      optionList: [],
      textList: [],
      textarea: "",
      clickedInput: false,
      showList: [true],
      currentNo: -1,
      prevNo: -1,
      containerTransition: {
        transform: "translateY(0)",
        transformOrigin: "center center",
        top: "0px",
      },
      groupMoveOut: "",
      direction: "",
      debounce: null,
    };
  },
  mounted() {
    this.setList();
  },
  methods: {
    setList() {
      if(!this.label || !this.value) {
        throw 'valur or label were not defined'
      }
      if (this.async) {
        this.optionList.push(this.list);
      } else {
        let firstLevelList = [];
        this.list.forEach((item) => {
          let itemObj = {};
          itemObj[this.label] = item[this.label];
          itemObj[this.value] = item[this.value];
          firstLevelList.push(itemObj);
          return;
        });
        this.optionList.push(this.list);
      }
    },
    changeTextList(event, no) {
      this.prevNo = this.currentNo;
      this.currentNo = no;
      if (this.currentNo <= this.prevNo) {
        this.textList.splice(no);
      }
      this.textList.push(event.target.textContent);
    },
    optionChoose(event, no, list) {
        let value = list[event.target.dataset.index] ? list[event.target.dataset.index][this.value] : '';
        let label = list[event.target.dataset.index] ? list[event.target.dataset.index][this.label]: '';
        if(!value || !label) {
            return;
        }
        let nextOptionList = [];
        this.changeTextList(event, no);
        new Promise((res, rej) => {
          if(!this.children && !this.async) {
              throw 'you must give children label';
          }
          nextOptionList = this.async
            ? this.$emit("getNextOptionList", value, label, no)
            : list[event.target.dataset.index][this.children];
          if (nextOptionList && nextOptionList.length) {
            res();
          } else {
            rej();
          }
        }).then(
          () => {
            this.groupMoveOut = "";
            this.optionList.splice(no + 1, 1, nextOptionList);
            this.showList[no + 1] = true;
            this.showList.splice(no + 2);
          },
          () => {
            this.textarea = this.textList.join("/");
          }
        ).catch((reason) => {
            throw reason;
        });
    },
    inputClick(event) {
      this.groupMoveOut = "active";
      if (!this.clickedInput) {
        let bottom = event.target.getBoundingClientRect().bottom;
        let windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        if (windowHeight - bottom <= 230) {
          this.openToTop();
        } else {
          this.openToBottom();
        }
      }
      this.clickedInput = !this.clickedInput;
    },
    openToTop() {
      this.containerTransition.transform = "translateY(-105%)";
      this.containerTransition.top = "0";
      this.direction = "top";
    },
    openToBottom() {
      let top = "";
      if (this.size == "huge") {
        top = "55px";
      } else if (this.size == "middle") {
        top = "50px";
      } else {
        top = "45px";
      }
      this.containerTransition.top = top;
      this.containerTransition.transform = "translateY(0)";
      this.direction = "bottom";
    },
  },
};
</script>
<style lang="scss">
.cascader-container {
  position: relative;
  float: left;
  .huge {
    &.input-box {
      font-size: 16px;
      width: 200px;
      height: 45px;
      padding: 0 12px 0 12px;
    }
    &.select-container {
      height: 225px;
    }
    &.cascader-list {
      width: 180px;
      height: 225px;
      padding: 8px 0;
    }
    &.cascader-option {
      font-size: 16px;
      padding: 10px 22px;
    }
  }
  .middle {
    &.input-box {
      font-size: 14px;
      width: 180px;
      height: 40px;
      padding: 0 10px 0 10px;
    }
    &.select-container {
      height: 200px;
    }
    &.cascader-list {
      width: 160px;
      height: 200px;
      padding: 8px 0;
    }
    &.cascader-option {
      font-size: 14px;
      padding: 8px 20px;
    }
  }
  .small {
    &.input-box {
      font-size: 12px;
      width: 160px;
      height: 35px;
      padding: 0 8px 0 8px;
    }
    &.select-container {
      height: 175px;
    }
    &.cascader-list {
      width: 140px;
      height: 175px;
      padding: 4px 0;
    }
    &.cascader-option {
      font-size: 12px;
      padding: 6px 18px;
    }
  }
  .input-box {
    outline: none;
    border: none;
    overflow: hidden;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    z-index: 9999;
    position: absolute;
    color: #606266;
    border: 1px solid #ddd;
    border-radius: 3%;
  }
  .select-container {
    z-index: 999px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    border: 1px solid #e4e7ed;
    position: absolute;
    z-index: 2;
    &.top::after {
      content: "";
      width: 7px;
      height: 7px;
      border-left: 1px solid #e4e7ed;
      border-bottom: 1px solid #e4e7ed;
      border-top: 1px solid transparent;
      border-right: 1px solid transparent;
      background-color: #fff;
      display: inline-block;
      position: absolute;
      left: 50px;
      bottom: -9px;
      z-index: 1;
      transform-origin: left top;
      transform: rotate(-45deg);
    }
    &.bottom::before {
      content: "";
      width: 7px;
      height: 7px;
      border-top: 1px solid #e4e7ed;
      border-left: 1px solid #e4e7ed;
      border-bottom: 1px solid transparent;
      border-right: 1px solid transparent;
      background-color: #fff;
      display: inline-block;
      position: absolute;
      left: 50px;
      top: -9px;
      z-index: 1;
      transform-origin: left bottom;
      transform: rotate(45deg);
    }
    .group {
      display: flex;
    }
    &.cascader-open-enter,
    &.cascader-open-leave-to {
      opacity: 0;
      height: 0;
    }
    &.cascader-open-enter-active,
    &.cascader-open-leave-active {
      transition: all 0.5s;
    }
    .cascader-list {
      margin: 0;
      list-style: none;
      overflow: auto;
      border-left: 1px solid #e4e7ed;
      background-color: #fff;
      box-sizing: border-box;
      text-align: left;
      &:first-child {
        border: none;
      }
      &.active-enter,
      &.active-leave-to {
        opacity: 0;
        height: 0;
        overflow: hidden;
      }
      &.active-enter-active,
      &.active-leave-active {
        transition: all 0.5s;
      }
      .cascader-option {
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #606266;
        line-height: 1.5;
        box-sizing: border-box;
        cursor: pointer;
        outline: none;
        &:hover {
          background-color: #ddd;
        }
      }
    }
  }
}
</style>