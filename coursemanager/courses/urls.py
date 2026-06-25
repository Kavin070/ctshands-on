from django.urls import path
from .views import hello_view, CourseListView, CourseDetailView

urlpatterns = [
    path('hello/', hello_view),

    path('courses/', CourseListView.as_view(), name='course-list'),

    path('courses/<int:pk>/', CourseDetailView.as_view(), name='course-detail'),
]