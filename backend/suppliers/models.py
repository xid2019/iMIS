from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Supplier(models.Model):
    name = models.CharField(max_length=10)
    address_line1 = models.TextField(null=True, blank=True)
    address_line2 = models.TextField(null=True, blank=True)
    address_line3 = models.TextField(null=True, blank=True)
    address_line4 = models.TextField(null=True, blank=True)
    contact_person = models.TextField(null=True, blank=True)
    phone = ArrayField(
        models.TextField(null=True, blank=True),
        null=True, 
        blank=True
    )
    zip = models.TextField(null=True, blank=True)
    