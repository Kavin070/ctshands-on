<template>
  <header class="header">
    <h1>Student Portal</h1>

    <p>
      Enrolled Courses:
      <strong>{{ store.enrolledCourses.length }}</strong>
    </p>
  </header>
</template>

<script setup>
import { useEnrollmentStore } from '../stores/enrollment'

const store = useEnrollmentStore()
</script>

<style scoped>
.header {
  background: #42b883;
  color: white;
  padding: 20px;
  text-align: center;
}

h1 {
  margin: 0;
}

p {
  margin-top: 10px;
}
</style>