from django.db import models
from orders.models import Order

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
    updated_confirm_date = models.DateField(null=True, blank=True)
    original_confirm_date = models.DateField(null=True, blank=True)
    factory = models.TextField()
    balance = models.IntegerField(null=True, blank=True)
    status = models.CharField(max_length=10)
