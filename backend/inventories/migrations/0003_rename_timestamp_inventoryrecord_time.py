# Generated by Django 4.2.16 on 2024-10-29 15:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("inventories", "0002_inventoryrecord"),
    ]

    operations = [
        migrations.RenameField(
            model_name="inventoryrecord", old_name="timestamp", new_name="time",
        ),
    ]
