import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard {

  @Input() name: string = '';

  @Input() code: string = '';

  @Input() credits: number = 0;

  @Input() grade: string = '';

}