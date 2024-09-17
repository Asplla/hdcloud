<template>
  <div class="focus-wrap w-[1024px] h-[576px] 1024:w-screen 1024:h-screen">
    <div class="content">
      <div class="absolute w-full h-full">
        <div v-for="(swiper, index) in swipers" :key="index" @mouseenter="swiperStopAutoPlay" class="focus-img transition-all duration-500" style="background-color: rgb(54, 64, 61);" :class="[index === swipersActiveIndex ? 'show' : '']" :style="{'background-image': `url('${swiper.backdrop}')`}"></div>
        <div class="info-wrap">
          <div v-if="!swipersActive.logo" class="title text-[54px] text-white font-bold">{{ swipersActive.title }}</div>
          <div v-else class="video-logo-wrap w-[240px] h-[160px]">
            <img class="video-logo" :src="swipersActive.logo">
          </div>
          <div class="description">{{ swipersActive.description }}</div>
        </div>
      </div>
    </div>
    <div class="focus-mask"></div>
    <div class="bottom-mask"></div>
    <div class="left-mask"></div>
    <div class="focus-list">
      <IconChevronLeft @click="swiperPrev" class="turn-page-btn absolute w-11 h-11 text-11 cursor-pointer left-[-32px] hover:text-white transition-all duration-200" />
      <IconChevronRight @click="swiperNext" class="turn-page-btn absolute w-11 h-11 text-11 cursor-pointer right-[-44px] hover:text-white transition-all duration-200" />
      <div class="focus-list-content flex overflow-hidden max-w[356px]">
        <div v-for="(swiper, index) in swipers" :key="index" @mouseover="swiperShow(index)" class="focus-item min-w-[80px] max-w-[96px] flex-none ml-3" :class="[index === swipersActiveIndex ? 'active' : '']">
          <div class="poster min-h-[120px]">
            <img class="pic" :src="swiper.poster">
            <div class="unchoice-mask transition-all duration-300"></div>
          </div>
          <div class="title transition-all duration-300">{{ swiper.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="tsx" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue';

// 轮播图
const swipersActive = ref([]);
const swipersActiveIndex = ref(0);
const swipersHover = ref(false);
let swipersAutoPlayInterval = null;
const swipers = [
  {
    title: '藏海花',
    description: '本剧改编自南派三叔同名小说《藏海花》。讲述了《盗墓笔记》故事后，吴邪和王胖子因缘际会下前往雪山，探寻张起灵神秘身世，过程中与张家兄妹张海杏、张海客斗智斗勇，并卷入一场前所未见的阴谋中。一场浪漫彼岸的冒险由此拉开帷幕……',
    logo: 'https://tv.puui.qpic.cn/tv/0/mz_tv_image_frontend_0e7ae3-4_847551756_1724838758129585/0',
    poster: 'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/gfxVTeFPGzDgLjjon99i13OMeAB.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/9uHQJX8wx5IwC2JeBcNqbKK95Hk.jpg'
  },
  {
    title: '孤注一掷',
    description: '电影取材自上万起真实诈骗案例，境外网络诈骗全产业链骇人内幕将在大银幕上首度被揭秘。南亚某国诈骗团伙头目陆经理（王传君 饰）张狂傲慢，用诡计和暴力统治着这个血泪王国。程序员潘生（张艺兴 饰）离开之前的公司，根据高薪招聘启示走入了陆经理设下的圈套，成为一名利用网络诈骗的“狗推”。因为羡慕闺蜜的生活，模特梁安娜（金晨 饰）也飞到异国他乡寻找机会，结果护照被没收，成为陆经理手下利用美色诈骗的工具。为了离开，潘生与安娜两人准备向赌徒顾天之（“阿天”，王大陆 饰）和其女友宋雨（“小雨”，周也 饰）下手，从他们身上套现、完成业绩…',
    logo: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/mzc00200wvr54jf1724312851755/0?imageView2/2/w/728/h/360',
    poster: 'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/gjyqQD5LsNOiVIXuczw9joqjiKQ.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/eqNuKqNjKAcOT6hlufhkkpxQ35F.jpg',
  },
  {
    title: '凡人歌',
    description: '当了五年全职主妇的沈琳遭遇丈夫那伟失业，夫妻双双无业，二胎嗷嗷待哺，房贷月月逼近，沈琳回归职场之路也频频碰壁之后，沈琳选择摆摊卖卤货实现再就业；名校毕业的沈磊在单位档案科工作，岁月静好，与世无争，妻子却因他安于现状与之离婚，沈磊信念崩塌，辞去工作，躲进终南山隐居；百万年薪的程序员那隽因高强度工作患了惊恐症，为怕失业拼命掩饰，让以及时行乐为人生态度的女友李晓悦难以理解，彼此相爱的两人渐行渐远。面对各自的人生窘境，他们不控诉不自怜，直面内心，共渡人生危机。',
    logo: 'https://tv.puui.qpic.cn/tv/0/mz_tv_image_frontend_d37c33-3_611703602_1725101559607916/0',
    poster: 'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/sdwS9GGF8J4jxbi0A3BKTa0x0tY.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/isrvLrfbn4sk4nVdizUWXRfgvvt.jpg',
  }
]
const swiperShow = (index) => {
  swipersActiveIndex.value = index % swipers.length;
  swipersActive.value = swipers[`${index}`];
}
const swiperNext = () => {
  swiperShow((swipersActiveIndex.value + 1) % swipers.length);
}
const swiperPrev = () => {
  swiperShow((swipersActiveIndex.value - 1 + swipers.length) % swipers.length);
}
const swiperStartAutoPlay = () => {
  swipersHover.value = false;
  swipersAutoPlayInterval = setInterval(() => {
    swiperShow((swipersActiveIndex.value + 1) % swipers.length);
  }, 5000);
};
const swiperStopAutoPlay = () => {
  isHover.value = true;
  clearInterval(swipersAutoPlayInterval);
};
onMounted(() => {
  swiperShow(0);
  swiperStartAutoPlay();
});
 
onUnmounted(() => {
  swiperShow(0);
  clearInterval(swiperStartAutoPlay);
});
</script>