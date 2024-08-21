from django.db import models


class Part(models.Model):
    customer_id = models.CharField(max_length=10)
    part_number = models.TextField()
    dwg_number = models.TextField()
    revision = models.CharField(max_length=10)
    description = models.TextField(null=True, blank=True)
    price = models.FloatField()
    cost = models.FloatField()
    material = models.TextField(null=True, blank=True)
    weight = models.FloatField(null=True, blank=True)
    order_quantity = models.IntegerField(null=True, blank=True)