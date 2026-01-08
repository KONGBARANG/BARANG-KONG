<template>
  <div class="about">
    <h1>About Page Welcome</h1>

    <router-link to="/component">
      <button class="btn">Click to Component</button>
    </router-link>
  </div>
</template>

<style scoped>
.about {
  text-align: center;
  margin-top: 50px;
}

h1 {
  color: blue;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

button {
  margin-top: 20px;
  color: rgb(99, 117, 111);
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>