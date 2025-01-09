from django.db import models

# Create your models here.
class Image(models.Model):
    class CategoryChoices(models.TextChoices):
        INTERIOR = 'interior', 'Interior'  # First value is stored in DB, second is human-readable
        EXTERIOR = 'exterior', 'Exterior'

    imageUrl = models.CharField(max_length=200)
    width = models.IntegerField(default=800)
    height = models.IntegerField(default=600)
    category = models.CharField(
        max_length=8,
        choices=CategoryChoices.choices,
        default=CategoryChoices.INTERIOR
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.imageUrl

class Service(models.Model):
    class ServiceType(models.TextChoices):
        # Interior Services
        INTERIOR_PAINTING = 'interior_painting', 'Interior Painting'
        CABINET_PAINTING = 'cabinet_painting', 'Cabinet Painting'
        DRYWALL = 'drywall', 'Drywall & Plaster Repair'
        WALLPAPER = 'wallpaper', 'Wallpaper Removal & Installation'
        TRIM_PAINTING = 'trim_painting', 'Trim & Baseboards'
        CROWN_MOLDING = 'crown_molding', 'Crown Molding Installation'

        # Exterior Services
        EXTERIOR_PAINTING = 'exterior_painting', 'Exterior Painting'
        STAINING = 'staining', 'Staining & Varnishing'
        STUCCO = 'stucco', 'Stucco Repair & Painting'
        SIDING = 'siding', 'Siding Repair'
        POWER_WASHING = 'power_washing', 'Power Washing'

    name = models.CharField(
        max_length=20,
        choices=ServiceType.choices
    )

    def __str__(self):
        return self.name

class ClientQuote(models.Model):
    first_name = models.CharField(max_length=50, default='')
    last_name = models.CharField(max_length=50, default='')
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    message = models.TextField()
    services = models.ManyToManyField(Service)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.email}"

    @property
    def selected_services(self):
        return ", ".join([service.name for service in self.services.all()])
    