# Generated by Django 5.0.6 on 2024-07-02 05:03

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=20, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.IntegerField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('Event_ID', models.CharField(default='', max_length=10, primary_key=True, serialize=False, unique=True)),
                ('Administrator', models.CharField(max_length=50)),
                ('Urgency', models.CharField(default='', max_length=10)),
                ('Address', models.CharField(max_length=75)),
                ('State', models.CharField(max_length=2)),
                ('City', models.CharField(max_length=45)),
                ('Zip_Code', models.CharField(max_length=10)),
                ('Volunteer_Count', models.IntegerField()),
                ('Created_At', models.DateTimeField(auto_now_add=True)),
                ('Created_By', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('Skills', models.ManyToManyField(related_name='events', to='api.skill')),
            ],
        ),
    ]
