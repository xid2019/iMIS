from django.db import models
from datetime import date


class Order(models.Model):
    customer_id = models.CharField(max_length=10)
    customer_po = models.TextField()
    order_date = models.DateField(date.today())
    buyer = models.TextField()
