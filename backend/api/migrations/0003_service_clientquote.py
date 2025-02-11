# Generated by Django 5.1.4 on 2025-01-09 03:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_image_height_alter_image_width'),
    ]

    operations = [
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('interior_painting', 'Interior Painting'), ('cabinet_painting', 'Cabinet Painting'), ('drywall', 'Drywall & Plaster Repair'), ('wallpaper', 'Wallpaper Removal & Installation'), ('trim_painting', 'Trim & Baseboards'), ('crown_molding', 'Crown Molding Installation'), ('exterior_painting', 'Exterior Painting'), ('staining', 'Staining & Varnishing'), ('stucco', 'Stucco Repair & Painting'), ('siding', 'Siding Repair'), ('power_washing', 'Power Washing')], max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='ClientQuote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=20)),
                ('message', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('service_type', models.ManyToManyField(to='api.service')),
            ],
        ),
    ]
