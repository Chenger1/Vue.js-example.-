from django.db import models
from django.conf import settings
# Create your models here.

class Task(models.Model):
    user = models.ForeignKey('auth.USER',
                             related_name='tasks',
                            on_delete=models.CASCADE)
    title = models.CharField(max_length=30)
    body = models.CharField(max_length=150)

    date = models.DateField(auto_now=True)
