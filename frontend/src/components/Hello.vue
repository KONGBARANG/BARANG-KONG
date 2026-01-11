<template>
  <div class="component">
    <h1>Component Page</h1>

    <router-link to="/" class="btn">
      <button>Click to back Home</button>
    </router-link>
    <router-link to="/admin" class="btn">
      <button>Click to Admin</button>
    </router-link>
  </div>
</template>

<style scoped>
.component {
  text-align: center;
  margin-top: 50px;
}

h1 {
  color: blue;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
