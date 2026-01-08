<template>
  <div class="home">
    <h1>Page Home</h1>

    <router-link to="/about">
      <button>Click to About</button>
    </router-link>
    <router-link to="/admin">
      <button>Click to Admin</button>
    </router-link>
  </div>
</template>

<style scoped>
.home {
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
