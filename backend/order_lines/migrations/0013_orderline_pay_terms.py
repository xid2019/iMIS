# Generated by Django 5.1 on 2024-09-18 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("order_lines", "0012_alter_orderline_weight"),
    ]

    operations = [
        migrations.AddField(
            model_name="orderline",
            name="pay_terms",
            field=models.TextField(blank=True, null=True),
        ),
    ]
