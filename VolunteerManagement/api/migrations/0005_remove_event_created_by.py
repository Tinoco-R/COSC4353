# Generated by Django 5.0.6 on 2024-07-16 21:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_event_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='Created_By',
        ),
    ]
