# Generated by Django 5.1 on 2024-08-25 19:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("parts", "0002_alter_part_revision"),
    ]

    operations = [
        migrations.AlterField(
            model_name="part",
            name="cost",
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="part",
            name="dwg_number",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="part",
            name="price",
            field=models.FloatField(blank=True, null=True),
        ),
    ]
