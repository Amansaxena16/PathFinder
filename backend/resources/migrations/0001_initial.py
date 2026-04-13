# Generated manually for the Pathfinder assessment backend scaffold.

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Resource",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=255)),
                ("slug", models.SlugField(unique=True)),
                ("summary", models.TextField()),
                ("description", models.TextField()),
                (
                    "category",
                    models.CharField(
                        choices=[
                            ("framework", "Framework"),
                            ("playbook", "Playbook"),
                            ("market_map", "Market Map"),
                            ("case_study", "Case Study"),
                            ("tool", "Tool"),
                            ("blog", "Orbit Blog"),
                        ],
                        max_length=32,
                    ),
                ),
                (
                    "resource_type",
                    models.CharField(
                        choices=[
                            ("pdf", "PDF"),
                            ("video", "Video"),
                            ("template", "Template"),
                            ("article", "Article"),
                        ],
                        max_length=20,
                    ),
                ),
                ("read_time", models.CharField(blank=True, max_length=50)),
                ("tags", models.JSONField(blank=True, default=list)),
                (
                    "content_template",
                    models.CharField(
                        choices=[
                            ("concept", "Concept Overview"),
                            ("research", "Research Brief"),
                            ("download", "Downloadable Resource"),
                        ],
                        default="concept",
                        max_length=20,
                    ),
                ),
                (
                    "overview",
                    models.JSONField(
                        blank=True,
                        default=list,
                        help_text="Ordered list of opening overview paragraphs.",
                    ),
                ),
                (
                    "sections",
                    models.JSONField(
                        blank=True,
                        default=list,
                        help_text="List of sections. Example: [{'title': 'Why it matters', 'paragraphs': ['...']}]",
                    ),
                ),
                (
                    "key_points",
                    models.JSONField(
                        blank=True,
                        default=list,
                        help_text="Short bullet points shown in the detail sidebar.",
                    ),
                ),
                ("external_url", models.URLField(blank=True)),
                (
                    "download_file",
                    models.FileField(blank=True, null=True, upload_to="resources/downloads/"),
                ),
                (
                    "thumbnail",
                    models.ImageField(blank=True, null=True, upload_to="resources/thumbnails/"),
                ),
                ("is_featured", models.BooleanField(default=False)),
                ("is_published", models.BooleanField(default=True)),
                ("published_at", models.DateTimeField(default=django.utils.timezone.now)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "related_resources",
                    models.ManyToManyField(
                        blank=True,
                        related_name="referenced_by_resources",
                        symmetrical=False,
                        to="resources.resource",
                    ),
                ),
            ],
            options={
                "ordering": ["-is_featured", "-published_at", "title"],
            },
        ),
    ]
