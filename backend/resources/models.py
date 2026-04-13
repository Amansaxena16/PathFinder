from django.db import models
from django.utils import timezone


class Resource(models.Model):
    class Category(models.TextChoices):
        FRAMEWORK = "framework", "Framework"
        PLAYBOOK = "playbook", "Playbook"
        MARKET_MAP = "market_map", "Market Map"
        CASE_STUDY = "case_study", "Case Study"
        TOOL = "tool", "Tool"
        BLOG = "blog", "Orbit Blog"

    class ResourceType(models.TextChoices):
        PDF = "pdf", "PDF"
        VIDEO = "video", "Video"
        TEMPLATE = "template", "Template"
        ARTICLE = "article", "Article"

    class ContentTemplate(models.TextChoices):
        CONCEPT = "concept", "Concept Overview"
        RESEARCH = "research", "Research Brief"
        DOWNLOAD = "download", "Downloadable Resource"

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    summary = models.TextField()
    description = models.TextField()
    category = models.CharField(max_length=32, choices=Category.choices)
    resource_type = models.CharField(max_length=20, choices=ResourceType.choices)
    read_time = models.CharField(max_length=50, blank=True)
    tags = models.JSONField(default=list, blank=True)
    content_template = models.CharField(
        max_length=20,
        choices=ContentTemplate.choices,
        default=ContentTemplate.CONCEPT,
    )
    overview = models.JSONField(
        default=list,
        blank=True,
        help_text="Ordered list of opening overview paragraphs.",
    )
    sections = models.JSONField(
        default=list,
        blank=True,
        help_text="List of sections. Example: [{'title': 'Why it matters', 'paragraphs': ['...']}]",
    )
    key_points = models.JSONField(
        default=list,
        blank=True,
        help_text="Short bullet points shown in the detail sidebar.",
    )
    external_url = models.URLField(blank=True)
    download_file = models.FileField(
        upload_to="resources/downloads/",
        blank=True,
        null=True,
    )
    thumbnail = models.ImageField(
        upload_to="resources/thumbnails/",
        blank=True,
        null=True,
    )
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    published_at = models.DateTimeField(default=timezone.now)
    related_resources = models.ManyToManyField(
        "self",
        blank=True,
        symmetrical=False,
        related_name="referenced_by_resources",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-is_featured", "-published_at", "title"]

    def __str__(self) -> str:
        return self.title

    @property
    def has_download(self) -> bool:
        return bool(self.download_file or self.external_url)
