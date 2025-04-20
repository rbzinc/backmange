<script setup>
import { defineProps, onMounted, ref } from "vue"
import { gsap } from "gsap-trial"

const props = defineProps({
  datas: {
    type: Number,
    required: true
  }
})

const showNumber = ref(0)

const counterCartoon = () => {
  const target = { value: showNumber.value }
  gsap.to(target, {
    value: props.datas,
    duration: 1,
    onUpdate: () => {
      showNumber.value = Math.round(target.value)
    },
    onComplete: () => {
      showNumber.value = props.datas
    }
  })
}

onMounted(() => counterCartoon())
</script>

<template>
  <div class="box">
    {{ showNumber }}
  </div>
</template>

<style scoped>
.box {
  display: flex;
}
</style>