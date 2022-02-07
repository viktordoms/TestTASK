from django.db import models


class User(models.Model):
    user_name = models.CharField(max_length=50, unique=True)
    create_date = models.DateField(auto_now_add=True)
    group = models.ForeignKey('Group', on_delete=models.PROTECT, related_name='group', null=False)

    def __str__(self):
        return self.user_name


class Group(models.Model):
    name = models.CharField(max_length=50, db_index=True, unique=True)
    description = models.TextField(max_length=150, blank=True, null=False)

    def __str__(self):
        return self.name

