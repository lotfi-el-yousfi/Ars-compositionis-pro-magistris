<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <a @click="redirect" class="back-link">Go back to Home</a>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';

const router = useRouter();
const redirect = () => {
  router.push({name: 'ProductList' });
}
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f0f0f0;
  color: #333;
}

h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.back-link {
  font-size: 1.2rem;
  color: #42b983;
  text-decoration: none;
  border: 2px solid #42b983;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.back-link:hover {
  background-color: #42b983;
  color: #fff;
}
</style>