<template>

<div class="container">

<h2>Student Profile</h2>

<h3>Enrolled Courses</h3>

<ul>

<li
v-for="course in store.enrolledCourses"
:key="course.id"
>

{{ course.name }} -
{{ course.credits }} Credits

</li>

</ul>

<h3>

Total Credits :

{{ store.totalCredits }}

</h3>

</div>

</template>

<script setup>

import { useEnrollmentStore } from '../stores/enrollment'

const store=useEnrollmentStore()

</script>

<style scoped>

.container{

padding:20px;

}

ul{

padding-left:20px;

}

</style>