<template>
  <nav class="navbar">
    <div class="nav-left">
      <router-link to="/" class="link" active-class="active">Home</router-link>
      <router-link to="/about" class="link" active-class="active">About</router-link>
      <router-link to="/component" class="link" active-class="active">Component</router-link>
    </div>

    <div class="nav-right">
      <router-link to="/admin" class="link admin" active-class="active">
        Admin
      </router-link>
    </div>
  </nav>

  <router-view />
</template>

<style>
/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #2c3e50;
}

/* Left group */
.nav-left {
  display: flex;
  gap: 20px;
}

/* Right group */
.nav-right {
  display: flex;
}

/* Link */
.link {
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
}

/* Hover */
.link:hover {
  color: #42b983;
}

/* Active route */
.active {
  border-bottom: 2px solid #42b983;
  padding-bottom: 5px;
}

/* Admin special */
.admin {
  font-weight: bold;
}
</style>
