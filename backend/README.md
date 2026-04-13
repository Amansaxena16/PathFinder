# Pathfinder Backend

This backend provides the content-management and API layer for the Pathfinder Library / Resources experience.

## Stack

- Django 4.2 LTS
- Django REST Framework
- SQLite for local development

## Features

- `Resource` content model for the library
- Django admin flow for content creators
- REST API for:
  - resource listing
  - resource detail pages
  - featured resource
  - category/template metadata
  - download handling
- media support for downloadable files and thumbnails
- sample fixture content aligned to the Pathfinder assignment

## Local Setup

```bash
cd backend
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/python manage.py migrate
.venv/bin/python manage.py loaddata resources/fixtures/resources.json
.venv/bin/python manage.py createsuperuser
.venv/bin/python manage.py runserver
```

## API Endpoints

- `GET /api/resources/`
- `GET /api/resources/meta/`
- `GET /api/resources/featured/`
- `GET /api/resources/<slug>/`
- `GET /api/resources/<slug>/download/`

## Notes

- `download_file` lets Django serve uploaded downloadable assets directly.
- `external_url` is available as a fallback for resources that should redirect to an external asset.
- Long-form detail page content is modeled using `overview`, `sections`, and `key_points` so the frontend can render multiple standard content templates cleanly.
