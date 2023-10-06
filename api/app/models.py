from django.db import models

# Create your models here.


class User(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=254, unique=True)
    password = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Job(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    company = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=3000, null=True, blank=True)
    dateapplied = models.DateField()
    urllink = models.CharField(max_length=200)

    def __str__(self):
        return self.company
