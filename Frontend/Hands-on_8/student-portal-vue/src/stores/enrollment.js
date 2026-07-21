import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useEnrollmentStore = defineStore('enrollment', () => {

  const enrolledCourses = ref([])

  const totalCredits = computed(() =>
    enrolledCourses.value.reduce((total, course) => total + course.credits, 0)
  )

  function enroll(course) {
    const exists = enrolledCourses.value.find(c => c.id === course.id)

    if (!exists) {
      enrolledCourses.value.push(course)
    }
  }

  function unenroll(courseId) {
    enrolledCourses.value = enrolledCourses.value.filter(
      course => course.id !== courseId
    )
  }

  return {
    enrolledCourses,
    totalCredits,
    enroll,
    unenroll
  }
})