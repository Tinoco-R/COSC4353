# Generated by Django 5.0.6 on 2024-07-16 21:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_event_volunteer_count_alter_event_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='Date',
            field=models.CharField(default='2024/16/07', max_length=10),
        ),
    ]
