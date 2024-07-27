# Generated by Django 5.0.6 on 2024-07-26 06:50

import django.contrib.auth.models
import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('Event_ID', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(default='', max_length=100)),
                ('Administrator', models.CharField(max_length=50)),
                ('Description', models.CharField(default='', max_length=256)),
                ('Address', models.CharField(max_length=75)),
                ('City', models.CharField(max_length=28)),
                ('State', models.CharField(max_length=13)),
                ('Zip_Code', models.CharField(max_length=5)),
                ('Date', models.CharField(default='2024/26/07', max_length=10)),
                ('Start_Time', models.CharField(default='12:00 PM', max_length=8)),
                ('Duration', models.CharField(default='3h 0m', max_length=6)),
                ('Skills', models.CharField(max_length=200)),
                ('Urgency', models.CharField(default='', max_length=10)),
                ('Created_At', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Event_Matched_Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event_id', models.IntegerField()),
                ('username', models.CharField()),
                ('acknowledged', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Event_Update_Volunteers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Event_ID', models.CharField(max_length=10)),
                ('Volunteer', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Event_Volunteers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Event_ID', models.CharField(max_length=10)),
                ('Volunteer', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(default='', max_length=50)),
                ('address1', models.CharField(default='', max_length=100)),
                ('address2', models.CharField(blank=True, max_length=100, null=True)),
                ('city', models.CharField(default='Houston', max_length=100)),
                ('state', models.CharField(default='TX', max_length=2)),
                ('zip_code', models.CharField(default='12345', max_length=9, validators=[django.core.validators.MinLengthValidator(5)])),
                ('skills', models.CharField()),
                ('preferences', models.TextField(blank=True, max_length=1000, null=True)),
                ('availability', models.CharField(default='')),
            ],
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=20, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='States',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('abbreviation', models.CharField(max_length=2)),
                ('name', models.CharField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('auth.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.AddConstraint(
            model_name='event_update_volunteers',
            constraint=models.UniqueConstraint(fields=('Event_ID', 'Volunteer'), name='unique_event_volunteers'),
        ),
        migrations.AddConstraint(
            model_name='event_volunteers',
            constraint=models.UniqueConstraint(fields=('Event_ID', 'Volunteer'), name='unique_event_volunteer'),
        ),
        migrations.AddField(
            model_name='profile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
