from django.db import models

# Create your models here.
class Image(models.Model):
    class CategoryChoices(models.TextChoices):
        INTERIOR = 'interior', 'Interior'  # First value is stored in DB, second is human-readable
        EXTERIOR = 'exterior', 'Exterior'

    imageUrl = models.CharField(max_length=200)
    width = models.IntegerField()
    height = models.IntegerField()
    category = models.CharField(
        max_length=8,
        choices=CategoryChoices.choices,  # Limits field to only these choices
        default=CategoryChoices.INTERIOR  # Sets default value
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.imageUrl