# Generated by Django 5.1 on 2024-08-16 01:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("order_lines", "0003_rename_order_orderline_order_id"),
    ]

    operations = [
        migrations.RenameField(
            model_name="orderline", old_name="order_id", new_name="order",
        ),
    ]
