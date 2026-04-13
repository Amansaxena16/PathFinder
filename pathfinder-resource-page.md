# Pathfinder — Resource Page Development Guide

> **Project:** Library / Resource Page for [pathfinder.build](https://pathfinder.build)
> **Stack:** TypeScript (Frontend) + Django (Backend)
> **Tagline:** *"Bold Innovators choose Enduring Paths"*

---

## Table of Contents

1. [Color Tokens Setup](#1-color-tokens-setup)
2. [Page Content Plan](#2-page-content-plan)
3. [Components to Build](#3-components-to-build)
4. [Django Backend Structure](#4-django-backend-structure)
5. [TypeScript Frontend Structure](#5-typescript-frontend-structure)
6. [Page Layout — Visual Order](#6-page-layout--visual-order)
7. [Bonus Polish Tips](#7-bonus-polish-tips)

---

## 1. Color Tokens Setup

Lock in Pathfinder's exact brand palette as TypeScript design tokens. This ensures color consistency across every component.

**File:** `src/tokens/colors.ts`

```typescript
export const PathfinderColors = {

  // --- Primary Greens (dominant brand color) ---
  voltGreen:    "#C8F135",   // Main brand color, card backgrounds, headings
  limeAction:   "#A8D420",   // Hover states, deeper section fills
  electricLime: "#B6E82A",   // CTA buttons, bullet dots

  // --- Accent Teals ---
  tealPrimary:  "#1FC8C8",   // Icons, nav labels, highlighted text
  deepTeal:     "#00B4B4",   // 3D visual elements, Team card
  tealGreen:    "#17C4A4",   // CTA box backgrounds (e.g. "Ready to Course Correct")

  // --- Neutral Backgrounds ---
  mistBlue:     "#D6DEF0",   // Full page background (top of gradient)
  softSlate:    "#C2CCDE",   // Library & Orbit muted cards, inactive tabs
  offWhite:     "#F5F7FA",   // Light card surfaces

  // --- Text & Dark ---
  deepNavy:     "#1A1A2E",   // Primary headings, logo background
  darkCharcoal: "#2C2C3E",   // Body text, card descriptions
  mutedSlate:   "#4A4A6A",   // Secondary labels, hints, subtext

} as const;

// Gradient combinations used on the site
export const PathfinderGradients = {
  pageBackground: "linear-gradient(135deg, #D6DEF0 0%, #C2CCDE 100%)",
  brandCard:      "linear-gradient(135deg, #C8F135 0%, #A8D420 100%)",
  tealCard:       "linear-gradient(135deg, #1FC8C8 0%, #00B4B4 100%)",
};
```

---

## 2. Page Content Plan

The Resource Page is called **"The Library"** — consistent with Pathfinder's themed naming convention (The Program, The Orbit, The Library).

---

### 2.1 Hero Section

```
Title:    "The Library"
Subtitle: "Knowledge that powers your ascent.
           Curated tools, frameworks, and insights
           for early-stage founders navigating the 0→1 climb."
CTA:      Search bar — "Search resources..."
```

---

### 2.2 Resource Categories

| # | Category | Description | Icon Concept |
|---|---|---|---|
| 1 | **Frameworks** | Structured thinking models from Pathfinder | Compass / Star |
| 2 | **Founder Playbooks** | Step-by-step execution guides | Map / Route |
| 3 | **Market Maps** | Sector landscapes and competitor views | Grid / Territory |
| 4 | **Case Studies** | Real 0→1 founder journeys and outcomes | Lightbulb |
| 5 | **Tools & Templates** | Ready-to-use canvases and trackers | Wrench / Tool |
| 6 | **Orbit Blog** | Latest strategic insights and articles | Signal / Wave |

---

### 2.3 Sample Resource Content (per category)

#### Frameworks
- *The Ideate–Innovate–Elevate Guide* — PDF
- *The Obelisk System: Structure the Advantage* — PDF
- *The Integral Curve Explained* — Video
- *The Domino Model: Trigger the Fitment Effect* — Article

#### Founder Playbooks
- *0→1 Go-to-Market Playbook* — PDF
- *Pitch Deck Blueprint for Early-Stage Founders* — Template
- *The Winning Playbook Framework* — PDF
- *How to Define Your True Heading* — Article

#### Market Maps
- *Sector Landscape Template* — Template
- *Competitor Positioning Map* — Template
- *Opportunity Sizing Framework* — PDF

#### Case Studies
- *From Concept to Pilot: A Founder's 0→1 Journey* — Article
- *How Strategic Coherence Changed the Trajectory* — Article
- *The Fitment Effect in Action* — Video

#### Tools & Templates
- *Value Proposition Canvas* — Template
- *Traction Tracker Sheet* — Template
- *Weekly Founder Review Template* — Template
- *Market Segmentation Worksheet* — Template

#### Orbit Blog (latest articles)
- *Why Most Founders Mistake Motion for Progress*
- *The Blind Spot Every Early-Stage Founder Has*
- *Sequencing the Edge: How to Build Competitive Advantage*
- *The Real Meaning of Product–Market Fit at 0→1*

---

### 2.4 Featured Resource Banner

```
Title:       "The Pathfinder Road(Map)"
Description: "Our signature framework — a deliberate climb
              from 0 to competitive edge. Ideate. Innovate. Elevate."
CTA Button:  "Explore the RoadMap →"
Style:        Teal gradient banner, pinned at the top of the grid
```

---

### 2.5 Newsletter / Community CTA

```
Section Title: "Join the Orbit"
Body:          "Get curated frameworks, founder insights, and
                early access to new resources — delivered weekly."
Input:         Email address field
CTA Button:    "Join the Orbit →"
Style:         Deep navy background, volt green CTA button
```

---

## 3. Components to Build

Build these components in priority order:

---

### 3.1 `ResourceHero`

- Full-width banner section
- "The Library" heading in deep navy (`#1A1A2E`), large bold display font
- Subtitle in muted slate (`#4A4A6A`)
- Volt green (`#C8F135`) decorative left accent line or underline
- Search bar with teal border on focus (`#1FC8C8`), soft slate background
- Page background: misty blue-grey gradient

```typescript
// Props
interface ResourceHeroProps {
  title: string;
  subtitle: string;
  onSearch: (query: string) => void;
}
```

---

### 3.2 `CategoryTabs`

- Horizontal row of pill-shaped filter tabs
- **Active tab:** volt green background (`#C8F135`), deep navy text
- **Inactive tab:** soft slate background (`#C2CCDE`), muted slate text
- Smooth background-color transition on click (200ms ease)
- On mobile: horizontally scrollable strip

```typescript
interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}
```

---

### 3.3 `ResourceCard`

Each card contains:

| Element | Style |
|---|---|
| Category badge | Volt green pill, dark navy text |
| Resource title | Deep navy, 18px semi-bold |
| Description | 2-line truncated, muted slate |
| Type tag | Color-coded (see Tag System below) |
| Access button | Teal text "Access →", teal underline on hover |

**Hover state:** `transform: translateY(-4px)` + volt green left border appears (3px solid `#C8F135`)

```typescript
interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  resourceType: 'pdf' | 'video' | 'template' | 'article';
  fileUrl: string;
  isFeatured?: boolean;
  thumbnail?: string;
}
```

---

### 3.4 `TagBadge` — Color System

| Type | Background | Text Color |
|---|---|---|
| PDF | `#C8F135` (volt green) | `#1A1A2E` (deep navy) |
| Video | `#1FC8C8` (teal primary) | `#1A1A2E` (deep navy) |
| Template | `#C2CCDE` (soft slate) | `#2C2C3E` (dark charcoal) |
| Article | `#1A1A2E` (deep navy) | `#C8F135` (volt green) |

---

### 3.5 `FeaturedBanner`

- Full-width strip spanning the resource grid
- Teal-to-deep-teal gradient background (`#1FC8C8 → #00B4B4`)
- "Featured" label in volt green (`#C8F135`)
- Resource title in white, bold
- Short description in off-white
- CTA button: volt green background, deep navy text

---

### 3.6 `SearchBar`

- Controlled input connected to Django API via query param `?search=`
- Debounced — 300ms delay before firing API call
- Teal focus ring (`#1FC8C8`)
- Soft slate background, deep navy placeholder text
- Clear (×) button appears when query is non-empty

---

### 3.7 `NewsletterBlock`

- Deep navy background (`#1A1A2E`)
- "Join the Orbit" heading in volt green
- Body text in off-white / light slate
- Email input: dark charcoal background, teal border
- Submit button: volt green background, deep navy text, bold
- Pathfinder logo watermark (low opacity) as background element

---

### 3.8 `EmptyState`

Shown when search returns zero results:

```
Icon:    Small compass or map illustration (teal)
Heading: "No paths found yet."
Body:    "Try a different search or explore all categories."
CTA:     "Clear Search" button (volt green)
```

---

### 3.9 `SkeletonCard`

Loading placeholder while API responds:

- Same dimensions as `ResourceCard`
- Animated shimmer effect in soft slate (`#C2CCDE`)
- No actual content — pure layout placeholder
- Render 6 skeleton cards during initial page load

---

## 4. Django Backend Structure

---

### 4.1 Model

**File:** `resources/models.py`

```python
from django.db import models

class Resource(models.Model):

    CATEGORY_CHOICES = [
        ('framework',   'Framework'),
        ('playbook',    'Founder Playbook'),
        ('market_map',  'Market Map'),
        ('case_study',  'Case Study'),
        ('tool',        'Tool & Template'),
        ('blog',        'Orbit Blog'),
    ]

    TYPE_CHOICES = [
        ('pdf',      'PDF'),
        ('video',    'Video'),
        ('template', 'Template'),
        ('article',  'Article'),
    ]

    title         = models.CharField(max_length=200)
    description   = models.TextField()
    category      = models.CharField(choices=CATEGORY_CHOICES, max_length=50)
    resource_type = models.CharField(choices=TYPE_CHOICES, max_length=20)
    thumbnail     = models.ImageField(upload_to='resources/thumbnails/', blank=True)
    file_url      = models.URLField()
    is_featured   = models.BooleanField(default=False)
    tags          = models.JSONField(default=list)
    created_at    = models.DateTimeField(auto_now_add=True)
    updated_at    = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_featured', '-created_at']

    def __str__(self):
        return self.title
```

---

### 4.2 Serializer

**File:** `resources/serializers.py`

```python
from rest_framework import serializers
from .models import Resource

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = [
            'id', 'title', 'description', 'category',
            'resource_type', 'thumbnail', 'file_url',
            'is_featured', 'tags', 'created_at'
        ]
```

---

### 4.3 Views

**File:** `resources/views.py`

```python
from rest_framework import generics
from .models import Resource
from .serializers import ResourceSerializer

class ResourceListView(generics.ListAPIView):
    serializer_class = ResourceSerializer

    def get_queryset(self):
        queryset = Resource.objects.all()
        category = self.request.query_params.get('category')
        search   = self.request.query_params.get('search')
        res_type = self.request.query_params.get('type')

        if category and category != 'all':
            queryset = queryset.filter(category=category)
        if search:
            queryset = queryset.filter(title__icontains=search)
        if res_type:
            queryset = queryset.filter(resource_type=res_type)

        return queryset


class FeaturedResourceView(generics.ListAPIView):
    serializer_class = ResourceSerializer
    queryset = Resource.objects.filter(is_featured=True)
```

---

### 4.4 URLs

**File:** `resources/urls.py`

```python
from django.urls import path
from .views import ResourceListView, FeaturedResourceView

urlpatterns = [
    path('api/resources/',          ResourceListView.as_view(),    name='resource-list'),
    path('api/resources/featured/', FeaturedResourceView.as_view(), name='resource-featured'),
]
```

---

### 4.5 Pagination

**File:** `settings.py`

```python
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 9,  # 3-column grid, 3 rows per page
}
```

---

## 5. TypeScript Frontend Structure

---

### 5.1 Folder Structure

```
src/
├── components/
│   ├── ResourceHero.tsx        ← Hero banner + search bar
│   ├── CategoryTabs.tsx        ← Filter tab pills
│   ├── ResourceCard.tsx        ← Individual resource card
│   ├── FeaturedBanner.tsx      ← Pinned featured resource strip
│   ├── TagBadge.tsx            ← Color-coded type tag
│   ├── SearchBar.tsx           ← Debounced search input
│   ├── SkeletonCard.tsx        ← Loading placeholder
│   ├── EmptyState.tsx          ← Zero results state
│   └── NewsletterBlock.tsx     ← "Join the Orbit" CTA
│
├── pages/
│   └── LibraryPage.tsx         ← Main page assembling all components
│
├── hooks/
│   ├── useResources.ts         ← Fetches resources from Django API
│   └── useDebounce.ts          ← 300ms debounce for search
│
├── tokens/
│   └── colors.ts               ← All Pathfinder color tokens
│
└── types/
    └── resource.types.ts       ← TypeScript interfaces
```

---

### 5.2 Type Definitions

**File:** `src/types/resource.types.ts`

```typescript
export type ResourceCategory =
  | 'framework'
  | 'playbook'
  | 'market_map'
  | 'case_study'
  | 'tool'
  | 'blog';

export type ResourceType = 'pdf' | 'video' | 'template' | 'article';

export interface Resource {
  id: number;
  title: string;
  description: string;
  category: ResourceCategory;
  resource_type: ResourceType;
  thumbnail: string;
  file_url: string;
  is_featured: boolean;
  tags: string[];
  created_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
```

---

### 5.3 Custom Hook

**File:** `src/hooks/useResources.ts`

```typescript
import { useState, useEffect } from 'react';
import { Resource, PaginatedResponse } from '../types/resource.types';

interface UseResourcesParams {
  category?: string;
  search?: string;
  page?: number;
}

export const useResources = ({ category, search, page = 1 }: UseResourcesParams) => {
  const [data, setData]       = useState<PaginatedResponse<Resource> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.set('category', category);
    if (search) params.set('search', search);
    params.set('page', String(page));

    setLoading(true);
    fetch(`/api/resources/?${params.toString()}`)
      .then(res => res.json())
      .then(json => { setData(json); setLoading(false); })
      .catch(() => { setError('Failed to load resources.'); setLoading(false); });
  }, [category, search, page]);

  return { data, loading, error };
};
```

---

## 6. Page Layout — Visual Order

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   HERO BANNER                                            │
│   "The Library" — subtitle — [ Search bar ]             │
│   Background: misty blue-grey gradient                   │
│   Accent: volt green left border or underline            │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│   CATEGORY FILTER TABS                                   │
│   [ All ] [ Frameworks ] [ Playbooks ] [ Tools ] ...     │
│   Active = volt green  |  Inactive = soft slate          │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│   FEATURED RESOURCE STRIP  (teal gradient)               │
│   ★ The Pathfinder RoadMap — "Explore →"                 │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│   RESOURCE CARD GRID  (3 columns desktop, 1 mobile)      │
│                                                          │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│   │  Card 1  │  │  Card 2  │  │  Card 3  │              │
│   └──────────┘  └──────────┘  └──────────┘              │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│   │  Card 4  │  │  Card 5  │  │  Card 6  │              │
│   └──────────┘  └──────────┘  └──────────┘              │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│   PAGINATION / LOAD MORE                                 │
│   Django paginated API — 9 resources per page            │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│   JOIN THE ORBIT  (newsletter CTA)                       │
│   Deep navy background — volt green CTA button           │
│   "Get curated resources weekly. Join the Orbit →"       │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 7. Bonus Polish Tips

### Micro-interactions
- On card hover: `transform: translateY(-4px)` + volt green 3px left border fades in
- On tab click: background color transitions at 200ms ease
- On search input focus: teal glow ring (`box-shadow: 0 0 0 2px #1FC8C8`)

### Typography
- Hero heading: Large bold display font, deep navy
- Section headings: 24–28px, semi-bold, deep navy
- Body text: 16px, regular weight, dark charcoal
- Subtext / labels: 13px, muted slate

### Loading State
- Render 6 `SkeletonCard` components during API fetch
- Shimmer animation using soft slate color range

### Empty State
- Triggered when `data.results.length === 0`
- Small teal compass icon, encouraging message, "Clear Search" button

### Mobile Responsiveness
- 3-column grid → 2-column (tablet) → 1-column (mobile)
- Category tabs become a horizontally scrollable strip on mobile
- Hero search bar goes full width on mobile

### Accessibility
- All interactive elements have `aria-label`
- Category tabs use `role="tablist"` and `role="tab"`
- Cards have descriptive `aria-label` including title and type
- Focus ring visible on all keyboard-navigable elements

### Performance
- Debounce search input by 300ms before firing API call
- Lazy load card thumbnails with `loading="lazy"`
- Django API response cached with `cache_control` headers

---

*Document prepared for the Pathfinder Library Page — pathfinder.build*
*Stack: TypeScript + Django REST Framework*
*Brand: Align. Act. Advance.*
