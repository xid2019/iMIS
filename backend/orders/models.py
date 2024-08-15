from django.db import models

# Create your models here.


class Order(models.Model):
    customer_id = models.CharField(max_length=10)
    customer_PO = models.TextField()
    order_date = models.DateField()
