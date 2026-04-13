export type ResourceType = "pdf" | "video" | "template" | "article";
export type ResourceCategory =
  | "framework"
  | "playbook"
  | "market_map"
  | "case_study"
  | "tool"
  | "blog";

export type ContentTemplate = "concept" | "research" | "download";

export interface ResourceSection {
  title: string;
  paragraphs: string[];
}

export interface ResourceListItem {
  id: number;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: ResourceCategory;
  resourceType: ResourceType;
  readTime: string;
  tags: string[];
  contentTemplate: ContentTemplate;
  isFeatured: boolean;
  thumbnailUrl: string | null;
  detailUrl: string | null;
  downloadUrl: string | null;
}

export interface RelatedResource {
  title: string;
  slug: string;
  summary: string;
  category: ResourceCategory;
  resourceType: ResourceType;
  detailUrl: string | null;
}

export interface ResourceDetailItem extends ResourceListItem {
  overview: string[];
  sections: ResourceSection[];
  keyPoints: string[];
  relatedResources: RelatedResource[];
  publishedAt: string;
}

export interface ResourceMeta {
  total: number;
  featured: number;
  counts: Partial<Record<ResourceCategory, number>>;
  templates: Partial<Record<ContentTemplate, number>>;
}

interface ApiResourceListItem {
  id: number;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: ResourceCategory;
  resource_type: ResourceType;
  read_time: string;
  tags: string[];
  content_template: ContentTemplate;
  is_featured: boolean;
  thumbnail_url: string | null;
  detail_url: string | null;
  download_url: string | null;
}

interface ApiRelatedResource {
  title: string;
  slug: string;
  summary: string;
  category: ResourceCategory;
  resource_type: ResourceType;
  detail_url: string | null;
}

interface ApiResourceDetailItem extends ApiResourceListItem {
  overview: string[];
  sections: ResourceSection[];
  key_points: string[];
  related_resources: ApiRelatedResource[];
  published_at: string;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

function makeApiUrl(path: string) {
  return `${API_BASE}${path}`;
}

async function fetchJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(makeApiUrl(path), { signal });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

function normalizeResource(item: ApiResourceListItem): ResourceListItem {
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    summary: item.summary,
    description: item.description,
    category: item.category,
    resourceType: item.resource_type,
    readTime: item.read_time,
    tags: item.tags,
    contentTemplate: item.content_template,
    isFeatured: item.is_featured,
    thumbnailUrl: item.thumbnail_url,
    detailUrl: item.detail_url,
    downloadUrl: item.download_url,
  };
}

function normalizeRelatedResource(item: ApiRelatedResource): RelatedResource {
  return {
    title: item.title,
    slug: item.slug,
    summary: item.summary,
    category: item.category,
    resourceType: item.resource_type,
    detailUrl: item.detail_url,
  };
}

function normalizeResourceDetail(item: ApiResourceDetailItem): ResourceDetailItem {
  return {
    ...normalizeResource(item),
    overview: item.overview,
    sections: item.sections,
    keyPoints: item.key_points,
    relatedResources: item.related_resources.map(normalizeRelatedResource),
    publishedAt: item.published_at,
  };
}

export async function fetchResources(
  options: {
    category?: ResourceCategory | "all";
    search?: string;
  } = {},
  signal?: AbortSignal
) {
  const params = new URLSearchParams();

  if (options.category && options.category !== "all") {
    params.set("category", options.category);
  }

  if (options.search?.trim()) {
    params.set("search", options.search.trim());
  }

  const query = params.toString();
  const path = query ? `/api/resources/?${query}` : "/api/resources/";
  const payload = await fetchJson<PaginatedResponse<ApiResourceListItem>>(path, signal);

  return payload.results.map(normalizeResource);
}

export async function fetchResourceMeta(signal?: AbortSignal) {
  return fetchJson<ResourceMeta>("/api/resources/meta/", signal);
}

export async function fetchFeaturedResource(signal?: AbortSignal) {
  return normalizeResourceDetail(
    await fetchJson<ApiResourceDetailItem>("/api/resources/featured/", signal)
  );
}

export async function fetchResourceDetail(slug: string, signal?: AbortSignal) {
  return normalizeResourceDetail(
    await fetchJson<ApiResourceDetailItem>(`/api/resources/${slug}/`, signal)
  );
}

export const PATHFINDER_PILLARS = [
  {
    title: "Align",
    description:
      "Clarify the opportunity, sharpen the value proposition, and understand where real traction can come from.",
  },
  {
    title: "Act",
    description:
      "Translate strategy into focused founder moves through practical frameworks, playbooks, and reusable tools.",
  },
  {
    title: "Advance",
    description:
      "Build momentum with a stronger market view, better sequencing, and a more coherent path from 0 to 1.",
  },
];
