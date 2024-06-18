# Generated by Django 4.2.13 on 2024-06-18 12:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Cv",
            fields=[
                ("id_cv", models.AutoField(primary_key=True, serialize=False)),
                ("cv", models.BinaryField()),
                ("score", models.DecimalField(decimal_places=2, max_digits=5)),
            ],
            options={
                "db_table": "CV",
            },
        ),
        migrations.CreateModel(
            name="Motivation",
            fields=[
                ("id_m", models.AutoField(primary_key=True, serialize=False)),
                ("lettre", models.BinaryField()),
                ("score", models.DecimalField(decimal_places=2, max_digits=5)),
            ],
            options={
                "db_table": "motivation",
            },
        ),
        migrations.CreateModel(
            name="Profil",
            fields=[
                ("id_p", models.AutoField(primary_key=True, serialize=False)),
                ("role", models.CharField(max_length=30)),
                ("nom", models.CharField(max_length=30)),
                ("prenom", models.CharField(blank=True, max_length=30, null=True)),
                ("mdp", models.CharField(max_length=30)),
                ("email", models.CharField(max_length=50)),
                ("photo_profil", models.BinaryField(blank=True, null=True)),
                ("num_tel", models.CharField(max_length=10)),
            ],
            options={
                "db_table": "Profil",
            },
        ),
        migrations.CreateModel(
            name="Candidature",
            fields=[
                ("id_can", models.AutoField(primary_key=True, serialize=False)),
                ("email", models.CharField(max_length=50)),
                ("dep", models.CharField(blank=True, max_length=50, null=True)),
                (
                    "cv",
                    models.ForeignKey(
                        blank=True,
                        db_column="cv",
                        null=True,
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="api.cv",
                    ),
                ),
                (
                    "lettre",
                    models.ForeignKey(
                        blank=True,
                        db_column="lettre",
                        null=True,
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="api.motivation",
                    ),
                ),
            ],
            options={
                "db_table": "candidature",
            },
        ),
    ]
