from django.db import models


class Cv(models.Model):
    id_cv = models.AutoField(primary_key=True)
    cv = models.TextField()
    score = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    class Meta:
        db_table = 'CV'


class Profil(models.Model):
    id_p = models.AutoField(primary_key=True)
    role = models.CharField(max_length=30)
    nom = models.CharField(max_length=30)
    prenom = models.CharField(max_length=30, blank=True, null=True)
    mdp = models.CharField(max_length=30)
    email = models.CharField(max_length=50)
    photo_profil = models.TextField(blank=True, null=True)
    num_tel = models.CharField(max_length=10)

    class Meta:
        db_table = 'Profil'


class Candidature(models.Model):
    id_can = models.AutoField(primary_key=True)
    cv = models.ForeignKey(Cv, models.DO_NOTHING, db_column='cv', blank=True, null=True)
    lettre = models.ForeignKey('Motivation', models.DO_NOTHING, db_column='lettre', blank=True, null=True)
    email = models.CharField(max_length=50)
    dep = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        db_table = 'candidature'


class Motivation(models.Model):
    id_m = models.AutoField(primary_key=True)
    lettre = models.TextField()
    score = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    class Meta:
        db_table = 'motivation'
