# Generated by Django 5.0.6 on 2024-07-19 02:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_event_volunteers_remove_profile_availability_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event_volunteers',
            name='Event_ID',
            field=models.CharField(max_length=10),
        ),
        migrations.AlterField(
            model_name='event_volunteers',
            name='Volunteer',
            field=models.CharField(max_length=30),
        ),
    ]