<template>
  <div class="single-page">
    <div class="goFront" @click="goFrontPage"></div>
    <ul class="button-container" @click="clickHandler">
      <li :class="['number', { checked: currentNum == 1 }]" :data="1">1</li>
      <li class="to-left-more" v-show="leftShow" @click="jump('left')"></li>
      <li
        :class="['number', { checked: currentNum == num }]"
        v-for="(num, index) in numList"
        :key="index"
        :data="num"
      >
        {{ num }}
      </li>
      <li class="to-right-more" v-show="rightShow" @click="jump('right')"></li>
      <li
        :class="['number', { checked: currentNum == pageNum }]"
        :data="pageNum"
      >
        {{ pageNum }}
      </li>
    </ul>
    <div class="goNext" @click="goNextPage"></div>
    <div class="flyer" v-show="flyer">
      <span>前往</span>
      <input type="text" v-model="flyTo" @keyup.enter="goTo">
      <span>页</span>
    </div>
    <div class="page-size-changer" v-show="downUpListShow">
      <input
        type="text"
        v-model="select"

        @click="showList = !showList"
      />
      <div class="down-up-list-container" v-show="showList">
        <ul class="down-up-list">
          <li
            v-for="num in selectablePageList"
            :key="num"
            @click="changeSelect(num)"
          >
            {{ num + "条/页" }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "single-page",
  props: {
    buttonNum: {
      type: Number,
    },
    total: {
      type: Number,
      require: true,
    },
    pageList: {
      type: Number,
      require: true,
    },
    changePage: {
      type: Function,
      default: () => {},
    },
    selectablePageList: {
      type: Array,
    },
    flyer: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      //pageNum: 0,
      numList: [],
      currentNum: 1,
      leftShow: false,
      rightShow: true,
      diaplayButtonNum: this.buttonNum,
      showList: false,
      select: "",
      pageSize: this.pageList,
      flyTo: '',
    };
  },
  computed: {
    pageNum() {
      return Math.ceil(this.total / this.pageSize);
    },
    downUpListShow() {
      return this.selectablePageList ? true : false;
    },
  },
  mounted() {
    this.initButtonNum();
    this.initNumList();
  },
  
  methods: {
    initNumList() {
      let newNumList = [];
      if (this.diaplayButtonNum <= 7 && this.diaplayButtonNum >= 2) {
        this.leftShow = false;
        this.rightShow = false;
      } else {
        this.leftShow = false;
        this.rightShow = true;
      }
      let num = this.diaplayButtonNum - 2;
      for (let i = 2; i <= num + 1; i++) {
        newNumList.push(i);
      }
      this.numList = newNumList;
    },
    initButtonNum() {
      this.diaplayButtonNum = this.buttonNum;
      if (this.pageNum < this.diaplayButtonNum && this.pageNum > 7) {
        throw "按钮数不能多于页数";
      } else if (this.pageNum <= 7) {
        this.diaplayButtonNum = this.pageNum;
      }
      if ((this.diaplayButtonNum & 1) === 0 && this.pageNum > 7) {
        throw "按钮数目只能是奇数";
      }
    },
    clickHandler(event) {
      let data = event.target.getAttribute("data");
      if (data && this.currentNum !== data) {
        if (this.diaplayButtonNum > 7) {
          this.changeButton(data);
        }
        this.currentNum = data;
        this.$emit("changePage", this.currentNum);
      }
    },
    frontHandler() {
      let head = this.numList[0] - 1;
      this.numList.pop();
      this.numList.unshift(head);
      if (head - 1 === 1) {
        this.leftShow = false;
      }
    },
    nextHandler() {
      let tail = this.numList[this.numList.length - 1] + 1;
      this.numList.shift();
      this.numList.push(tail);
      if (tail + 1 === this.pageNum) {
        this.rightShow = false;
      }
    },
    goFrontPage() {
      if(this.currentNum == 1) {
        return;
      }
      this.currentNum--;
      if (this.leftShow == true && this.rightShow == true) {
        this.frontHandler();
      } else if (
        this.leftShow == true &&
        this.rightShow == false &&
        this.numList.indexOf(this.currentNum) < this.numList.length >> 1
      ) {
        this.rightShow = true;
        this.frontHandler();
      }
    },
    goNextPage() {
      if(this.currentNum == this.pageNum) {
        return;
      }
      this.currentNum++;
      if (this.leftShow == true && this.rightShow == true) {
        this.nextHandler();
      } else if (
        this.leftShow == false &&
        this.rightShow == true &&
        this.numList.indexOf(this.currentNum) > this.numList.length >> 1
      ) {
        this.leftShow = true;
        this.nextHandler();
      }
    },
    changeButton(data) {
      let step = this.currentNum - data;
      if (step > 0) {
        for (let i = 1; i <= step; i++) {
          this.goFrontPage();
        }
      } else {
        step = Math.abs(step);
        for (let i = 1; i <= step; i++) {
          this.goNextPage();
        }
      }
    },
    jump(dir) {
      let data;
      if (dir === "right") {
        data =
          this.currentNum + this.diaplayButtonNum - 2 > this.pageNum
            ? this.pageNum
            : this.currentNum + this.diaplayButtonNum - 2;
      } else {
        data =
          this.currentNum - this.diaplayButtonNum - 2 < 1
            ? 1
            : this.currentNum - this.diaplayButtonNum - 2;
      }
      this.changeButton(data);
    },
    goTo() {
      if(parseInt(this.flyTo) > this.pageNum || parseInt(this.flyTo) < 1) {
        return;
      }
      this.changeButton(parseInt(this.flyTo));
    },
    changeSelect(num) {
      this.select = num + "条/页";
      this.showList = false;
      this.pageSize = num;
      //如果不改这个，上一次点完了一个页码之后，再换"条/页"，如果又点了换页前的点过的页码，是不会换页的，因为换页的依据是currentNum要发生变化
      this.currentNum = 1;
      this.initButtonNum();
      this.initNumList();
    },
  },
};
</script>

<style lang="scss">
</style>