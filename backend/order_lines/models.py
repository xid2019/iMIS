from django.db import models
from orders.models import Order
from parts.models import Part


# Create your models here.


class OrderLine(models.Model):
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name='order')
    line_number = models.CharField(max_length=10)
    part_number = models.TextField()
    description = models.TextField(null=True, blank=True)
    quantity = models.IntegerField()
    ship_via = models.CharField(max_length=5)
    required_date = models.DateField()
    confirmed_date = models.DateField(null=True, blank=True)
    factory = models.TextField(null=True, blank=True)
    balance = models.IntegerField(null=True, blank=True)
    status = models.CharField(max_length=10, null=True, blank=True)
    dwg_number = models.TextField(null=True, blank=True)
    revision = models.TextField(null=True, blank=True)
    price = models.FloatField(null=True, blank=True)
    material = models.TextField(null=True, blank=True)
    weight = models.FloatField(null=True, blank=True)
    pay_terms = models.TextField(null=True, blank=True)
