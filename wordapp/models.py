from django.db import models

# Create your models here.
class word_list(models.Model):
    word = models.CharField(max_length=500)

    def __str__(self):
        return self.word