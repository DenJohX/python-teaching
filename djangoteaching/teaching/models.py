from django.db import models

class TeachingChat(models.Model):
    text = models.CharField(max_length=250)
    pub_date = models.DateTimeField('date published')
    author = models.CharField(max_length=150)

class TeachingConsole(models.Model):
    text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
