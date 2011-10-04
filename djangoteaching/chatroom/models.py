from django.db import models

class chatroomMessages(models.Model):
    text = models.CharField(max_length=250)
    author = models.CharField(max_length=150)
    pub_date = models.DateTimeField(auto_now_add=True)
