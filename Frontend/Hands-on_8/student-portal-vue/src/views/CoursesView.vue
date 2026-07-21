<template>
  <div class="container">

    <h2>Courses</h2>

    <input
      type="text"
      v-model="searchTerm"
      placeholder="Search Course..."
    />

    <div
      v-for="course in filteredCourses"
      :key="course.id"
      class="course-box"
    >

      <CourseCard
        :name="course.name"
        :code="course.code"
        :credits="course.credits"
        :grade="course.grade"
      />

      <button @click="store.enroll(course)">
        Enroll
      </button>

      <RouterLink :to="'/courses/' + course.id">
        View Details
      </RouterLink>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import CourseCard from '../components/CourseCard.vue'
import { useEnrollmentStore } from '../stores/enrollment'

const store = useEnrollmentStore()

const searchTerm = ref('')

const courses = ref([])

onMounted(() => {
  courses.value = [
    {
      id:1,
      name:'Mathematics',
      code:'MAT101',
      credits:4,
      grade:'A'
    },
    {
      id:2,
      name:'Data Structures',
      code:'CSE201',
      credits:3,
      grade:'A+'
    },
    {
      id:3,
      name:'Operating Systems',
      code:'CSE301',
      credits:4,
      grade:'B+'
    },
    {
      id:4,
      name:'Database Systems',
      code:'CSE302',
      credits:3,
      grade:'A'
    },
    {
      id:5,
      name:'Artificial Intelligence',
      code:'AI401',
      credits:4,
      grade:'A+'
    }
  ]
})

const filteredCourses = computed(() =>
  courses.value.filter(course =>
    course.name
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase())
  )
)
</script>

<style scoped>

.container{
    padding:20px;
}

input{
    width:300px;
    padding:10px;
    margin-bottom:20px;
}

.course-box{
    margin-bottom:20px;
}

button{
    margin-right:10px;
    padding:8px 15px;
}
</style>