import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CourseCard } from '../course-card/course-card';
import { CourseService } from '../course';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CourseCard
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {

  courses: any[] = [];

  filteredCourses: any[] = [];

  searchTerm: string = '';

  loading: boolean = false;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {

    this.loading = true;

    this.courseService.getCourses().subscribe({

      next: (data) => {

        const courseNames = [
          'Angular Fundamentals',
          'Web Development',
          'Database Management',
          'Operating Systems',
          'Software Engineering'
        ];

        this.courses = data.map((item: any, index: number) => ({

          name: courseNames[index],

          code: 'CS10' + (index + 1),

          credits: 3,

          grade: 'A'

        }));

        this.filteredCourses = this.courses;

        this.loading = false;
      },

      error: (err) => {

        console.log(err);

        this.loading = false;

      }

    });

  }

  searchCourse(): void {

    const value = this.searchTerm.toLowerCase();

    this.filteredCourses = this.courses.filter(course =>

      course.name.toLowerCase().includes(value)

    );

  }

  trackByIndex(index: number): number {

    return index;

  }

}