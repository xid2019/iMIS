from django.db import models


class Part(models.Model):
    customer_id = models.CharField(max_length=10)
    part_number = models.TextField(null=True, blank=True)
    dwg_number = models.TextField(null=True, blank=True)
    revision = models.CharField(max_length=10, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    price = models.FloatField(null=True, blank=True)
    cost = models.FloatField(null=True, blank=True)
    material = models.TextField(null=True, blank=True)
    weight = models.FloatField(null=True, blank=True)
    order_quantity = models.IntegerField(null=True, blank=True)
    factory = models.TextField(null=True, blank=True)

    class Meta:
        # Create an index on customer_id and part_number
        indexes = [
            models.Index(fields=['customer_id', 'part_number'], name='idx_customer_id_part_number'),
        ]