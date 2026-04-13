from django.contrib import admin

from .models import Resource


@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "category",
        "resource_type",
        "content_template",
        "is_featured",
        "is_published",
        "published_at",
        "updated_at",
    )
    list_filter = (
        "category",
        "resource_type",
        "content_template",
        "is_featured",
        "is_published",
    )
    search_fields = ("title", "slug", "summary", "description")
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ("related_resources",)
    readonly_fields = ("created_at", "updated_at")

    fieldsets = (
        (
            "Core",
            {
                "fields": (
                    "title",
                    "slug",
                    "summary",
                    "description",
                    "category",
                    "resource_type",
                    "content_template",
                    "read_time",
                    "tags",
                )
            },
        ),
        (
            "Detail Page Content",
            {
                "description": (
                    "These fields drive the frontend resource detail page and give content creators"
                    " a simple way to update long-form content."
                ),
                "fields": ("overview", "sections", "key_points", "related_resources"),
            },
        ),
        (
            "Media & Downloads",
            {
                "fields": ("thumbnail", "download_file", "external_url"),
                "description": (
                    "Upload a file to let Django serve downloads directly, or store an external link"
                    " when a file lives elsewhere."
                ),
            },
        ),
        (
            "Publishing",
            {"fields": ("is_featured", "is_published", "published_at")},
        ),
        (
            "Timestamps",
            {"fields": ("created_at", "updated_at")},
        ),
    )
