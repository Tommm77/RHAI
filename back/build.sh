#!/bin/bash

# Mettre à jour pip
pip install --upgrade pip

# Réinstaller setuptools
pip install --force-reinstall -U setuptools

# Installer les dépendances du projet
pip install -r requirements.txt
