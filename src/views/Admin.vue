<template>
  <div class="admin">
    <h1>Admin Page</h1>

    <router-link to="/">
      <button>Go to Home</button>
    </router-link>
  </div>
</template>

<style scoped>
.admin {
  text-align: center;
}

h1 {
  color: rgb(67, 20, 177);
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
