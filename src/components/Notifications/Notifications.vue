<template>
  <notifications>
    <template #body="props">
      <div class="my-notification">
        <p class="title">
          {{ props.item.title }}
        </p>
        <button class="close" @click="props.close">
          <i class="fa fa-fw fa-close"></i>
        </button>
        <div v-html="props.item.text"/>
      </div>
    </template>
  </notifications>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>