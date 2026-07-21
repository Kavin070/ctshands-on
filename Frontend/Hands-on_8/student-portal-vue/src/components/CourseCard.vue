<template>
  <div class="course-card">
    <h3>{{ name }}</h3>
    <p><strong>Code:</strong> {{ code }}</p>
    <p><strong>Credits:</strong> {{ credits }}</p>
    <p><strong>Grade:</strong> {{ grade }}</p>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  code: String,
  credits: Number,
  grade: String
})
</script>

<style scoped>
.course-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  margin: 10px 0;
  background: #f9f9f9;
}

h3 {
  margin-bottom: 10px;
  color: #42b883;
}
</style>