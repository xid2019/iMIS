from django.db import models

# Create your models here.
class Company(models.Model):
    name = models.CharField(max_length=10)
    sold_to_address_line1 = models.TextField(null=True, blank=True)
    sold_to_address_line2 = models.TextField(null=True, blank=True)
    sold_to_address_line3 = models.TextField(null=True, blank=True)
    sold_to_address_line4 = models.TextField(null=True, blank=True)
    sold_to_contact_person = models.TextField(null=True, blank=True)
    sold_to_phone = models.TextField(null=True, blank=True)
    sold_to_email = models.TextField(null=True, blank=True)
    ship_to_address_line1 = models.TextField(null=True, blank=True)
    ship_to_address_line2 = models.TextField(null=True, blank=True)
    ship_to_address_line3 = models.TextField(null=True, blank=True)
    ship_to_address_line4 = models.TextField(null=True, blank=True)
    ship_to_contact_person = models.TextField(null=True, blank=True)
    ship_to_phone = models.TextField(null=True, blank=True)
    ship_to_email = models.TextField(null=True, blank=True)
    dispatch_address_line1 = models.TextField(null=True, blank=True)
    dispatch_address_line2 = models.TextField(null=True, blank=True)
    dispatch_address_line3 = models.TextField(null=True, blank=True)
    dispatch_address_line4 = models.TextField(null=True, blank=True)
    dispatch_contact_person = models.TextField(null=True, blank=True)
    dispatch_phone = models.TextField(null=True, blank=True)
    dispatch_email = models.TextField(null=True, blank=True)
    plant_id = models.TextField(null=True, blank=True)
    