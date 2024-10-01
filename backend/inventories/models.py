from django.db import models
# Create your models here.

class InventoryItem(models.Model):
    part_number = models.TextField(null=True, blank=True)
    dwg_number = models.TextField(null=True, blank=True)
    revision = models.CharField(max_length=10, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    material = models.TextField(null=True, blank=True)
    weight = models.FloatField(null=True, blank=True)
    factory = models.TextField(null=True, blank=True)
    min_inventory = models.IntegerField(null=True, blank=True)
    max_inventory = models.IntegerField(null=True, blank=True)
