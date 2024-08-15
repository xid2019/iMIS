from django.db import models
from orders.models import Order

# Create your models here.


class OrderLine(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    line_number = models.CharField(max_length=10)
    part_number = models.TextField()
    description = models.TextField()
    quantity = models.IntegerField()
    ship_via = models.CharField(max_length=5)
    required_date = models.DateField()
    updated_confirm_date = models.DateField()
    original_confirm_date = models.DateField()
    factory = models.TextField()
    balance = models.IntegerField()
    status = models.CharField(max_length=10)
