from django.urls import path

from .views import GoogleView



# app_name will help us do a reverse look-up latter.
urlpatterns = [
    path('google/', GoogleView.as_view()),
]
