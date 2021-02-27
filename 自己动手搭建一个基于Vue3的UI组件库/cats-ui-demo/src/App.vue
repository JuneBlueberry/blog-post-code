<template>
  <div>
      <div class="demo">
        <cat-button class="demo1">按钮</cat-button>
        <cat-button class="demo1" type='primary'>按钮</cat-button>
        <cat-button class="demo1" type='success'>按钮</cat-button>
        <cat-button class="demo1" type='info'>按钮</cat-button>
        <cat-button class="demo1" type='warning'>按钮</cat-button>
        <cat-button class="demo1" type='error'>按钮</cat-button>
    </div>
    <div class="demo">
        <cat-button class="demo1" plain>按钮</cat-button>
        <cat-button class="demo1" type='primary' plain>按钮</cat-button>
        <cat-button class="demo1" type='success' plain>按钮</cat-button>
        <cat-button class="demo1" type='info' plain>按钮</cat-button>
        <cat-button class="demo1" type='warning' plain>按钮</cat-button>
        <cat-button class="demo1" type='error' plain>按钮</cat-button>
    </div>
    <div class="demo">
        <cat-button class="demo1" round>按钮</cat-button>
        <cat-button class="demo1" type='primary' round>按钮</cat-button>
        <cat-button class="demo1" type='success' round>按钮</cat-button>
        <cat-button class="demo1" type='info' round>按钮</cat-button>
        <cat-button class="demo1" type='warning' round>按钮</cat-button>
        <cat-button class="demo1" type='error' round>按钮</cat-button>
    </div>
    <div class="demo">
        <cat-button class="demo1" disabled>按钮</cat-button>
        <cat-button class="demo1" type='primary' disabled>按钮</cat-button>
        <cat-button class="demo1" type='success' disabled>按钮</cat-button>
        <cat-button class="demo1" type='info' disabled>按钮</cat-button>
        <cat-button class="demo1" type='warning' disabled>按钮</cat-button>
        <cat-button class="demo1" type='error' disabled>按钮</cat-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.demo {
  margin: 10px 0;
}

.demo1 {
  margin: 0 10px;
}
</style>
