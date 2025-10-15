<template>
  <nav class="navbar">
    <div class="logo">Payments Management</div>
    <div class="nav-links">
      <router-link to="/users">Users</router-link>
      <router-link to="/users/new">Add User</router-link>
      <router-link to="/payments">Payments</router-link>
      <router-link to="/payments/new">Add Payment</router-link>
    </div>
  </nav>
</template>

<script setup></script>

<style scoped>
.navbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #2563eb;
  color: white;
}

/* Links container */
.nav-links {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

/* Links styling */
.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.nav-links a:hover {
  text-decoration: underline;
}

/* Responsive: stack links vertically on small screens */
@media (max-width: 600px) {
  .nav-links {
    width: 100%;
    justify-content: flex-start;
    margin-top: 10px;
  }
}
</style>
