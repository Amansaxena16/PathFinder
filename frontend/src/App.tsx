import { useEffect, useState } from "react";
import CategoryTabs, {
  type ResourceCategory as TabCategory,
} from "./components/CatergoryTab";
import FeaturedBanner from "./components/FeaturedBanner";
import ResourceDetailPage from "./components/ResourceDetailPage";
import ResourceStateNotice from "./components/ResourceStateNotice";
import ResourceCard, {
  type ResourceCategory as CardCategory,
} from "./components/ResourceCard";
import ResourceHero from "./components/ResourceHero";
import AdminPanel from "./components/admin/AdminPanel";
import  AdminAuth from "./components/AdminAuth"
import {
  PATHFINDER_PILLARS,
  fetchFeaturedResource,
  fetchResourceDetail,
  fetchResourceMeta,
  fetchResources,
  type ResourceDetailItem,
  type ResourceListItem,
  type ResourceMeta,
} from "./data/resources";

const CATEGORY_ORDER: CardCategory[] = [
  "framework",
  "playbook",
  "market_map",
  "case_study",
  "tool",
  "blog",
];

function getRouteType(pathname: string) {
  const cleanedPath = pathname.replace(/\/+$/, "") || "/";

  if (cleanedPath === "/" || cleanedPath === "/resources") {
    return { type: "library" as const };
  }

  if (cleanedPath === "/admin") {
    return { type: "admin" as const };
  }

  const detailMatch = cleanedPath.match(/^\/resources\/([^/]+)$/);
  if (detailMatch) {
    return { type: "detail" as const, slug: detailMatch[1] };
  }

  return { type: "not-found" as const };
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<TabCategory>("all");
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);
  const [resources, setResources] = useState<ResourceListItem[]>([]);
  const [featuredResource, setFeaturedResource] = useState<ResourceDetailItem | null>(null);
  const [resourceMeta, setResourceMeta] = useState<ResourceMeta | null>(null);
  const [detailResource, setDetailResource] = useState<ResourceDetailItem | null>(null);
  const [loadedLibraryKey, setLoadedLibraryKey] = useState<string | null>(null);
  const [libraryErrorKey, setLibraryErrorKey] = useState<string | null>(null);
  const [libraryError, setLibraryError] = useState<string | null>(null);
  const [loadedDetailSlug, setLoadedDetailSlug] = useState<string | null>(null);
  const [detailErrorSlug, setDetailErrorSlug] = useState<string | null>(null);
  const [detailError, setDetailError] = useState<string | null>(null);
  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path);
      setCurrentPath(path);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const route = getRouteType(currentPath);
  const detailSlug = route.type === "detail" ? route.slug : null;

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const libraryRequestKey = `${activeCategory}:${normalizedQuery}`;

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      fetchResources(
        {
          category: activeCategory,
          search: searchQuery,
        },
        controller.signal
      ),
      fetchResourceMeta(controller.signal),
      fetchFeaturedResource(controller.signal),
    ])
      .then(([fetchedResources, fetchedMeta, fetchedFeatured]) => {
        setResources(fetchedResources);
        setResourceMeta(fetchedMeta);
        setFeaturedResource(fetchedFeatured);
        setLoadedLibraryKey(libraryRequestKey);
        setLibraryErrorKey(null);
        setLibraryError(null);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setResources([]);
        setFeaturedResource(null);
        setResourceMeta(null);
        setLibraryErrorKey(libraryRequestKey);
        setLibraryError("Unable to load the Pathfinder library right now.");
      });

    return () => controller.abort();
  }, [activeCategory, libraryRequestKey, searchQuery]);

  useEffect(() => {
    if (!detailSlug) {
      return;
    }

    const controller = new AbortController();

    fetchResourceDetail(detailSlug, controller.signal)
      .then((resource) => {
        setDetailResource(resource);
        setLoadedDetailSlug(detailSlug);
        setDetailErrorSlug(null);
        setDetailError(null);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setDetailErrorSlug(detailSlug);
        setDetailError("We couldn't load this resource detail page.");
      });

    return () => controller.abort();
  }, [detailSlug]);

  const currentLibraryError =
    libraryErrorKey === libraryRequestKey ? libraryError : null;
  const libraryLoading =
    loadedLibraryKey !== libraryRequestKey && libraryErrorKey !== libraryRequestKey;
  const currentDetailResource =
    detailSlug && loadedDetailSlug === detailSlug ? detailResource : null;
  const currentDetailError =
    detailSlug && detailErrorSlug === detailSlug ? detailError : null;
  const detailLoading = !!detailSlug && !currentDetailResource && !currentDetailError;

  const showFeatured =
    activeCategory === "all" && normalizedQuery.length === 0 && !!featuredResource;

  const visibleResources =
    showFeatured && featuredResource
      ? resources.filter((resource) => resource.id !== featuredResource.id)
      : resources;

  const counts = CATEGORY_ORDER.reduce(
    (acc, category) => {
      acc[category] = resourceMeta?.counts[category] ?? 0;
      return acc;
    },
    {
      all: resourceMeta?.total ?? 0,
    } as Partial<Record<TabCategory, number>>
  );

  if (route.type === "detail" && detailLoading) {
    return (
      <main className="resource-detail resource-detail--empty">
        <div className="resource-detail__shell">
          <ResourceStateNotice
            eyebrow="Loading Resource"
            title="Preparing the detail page"
            description="Fetching the concept overview, related resources, and downloadable asset information."
          />
        </div>
      </main>
    );
  }

  if (route.type === "detail" && currentDetailResource) {
    return (
      <ResourceDetailPage
        resource={currentDetailResource}
        relatedResources={currentDetailResource.relatedResources}
        onBack={() => navigateTo("/resources")}
        onOpenResource={(slug) => navigateTo(`/resources/${slug}`)}
      />
    );
  }

  if (route.type === "detail" && currentDetailError) {
    return (
      <main className="resource-detail resource-detail--empty">
        <div className="resource-detail__shell">
          <ResourceStateNotice
            eyebrow="Unavailable"
            title="This resource could not be loaded"
            description={currentDetailError}
            actionLabel="Back to Library"
            onAction={() => navigateTo("/resources")}
          />
        </div>
      </main>
    );
  }

  if (route.type === "admin") {

    if (!token) {
      return <AdminAuth />;
    }
    return <AdminPanel />;
  }

  if (route.type === "not-found") {
    return (
      <main className="resource-detail resource-detail--empty">
        <div className="resource-detail__shell">
          <ResourceStateNotice
            eyebrow="Page not found"
            title="This resource path does not exist yet."
            description="Return to the Pathfinder Library to continue exploring frameworks, playbooks, and tools."
            actionLabel="Back to Library"
            onAction={() => navigateTo("/resources")}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="resource-shell">
      <ResourceHero onSearch={setSearchQuery} />

      <section className="resource-summary">
        <div className="resource-summary__eyebrow">Why This Library Exists</div>
        <div className="resource-summary__content">
          <p>
            Pathfinder helps early-stage founders replace noisy momentum with a
            more deliberate path to growth. This resource page brings together
            the company&apos;s core ideas, practical tools, and strategic
            thinking in one simplified place.
          </p>
          <p>
            The focus is clear: help founders align their direction, act with
            intention, and advance with stronger market understanding.
          </p>
        </div>
      </section>

      <section className="resource-pillars">
        <div className="resource-pillars__header">
          <p className="resource-pillars__eyebrow">Pathfinder In Three Moves</p>
          <h2>Align. Act. Advance.</h2>
          <p>
            These three ideas capture what Pathfinder does for early-stage
            founders and what this resource page is built to support.
          </p>
        </div>

        <div className="resource-pillars__grid">
          {PATHFINDER_PILLARS.map((pillar) => (
            <article key={pillar.title} className="resource-pillars__card">
              <span className="resource-pillars__accent" />
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      <CategoryTabs
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
        counts={counts}
      />

      <section className="resource-content">
        {currentLibraryError && (
          <ResourceStateNotice
            eyebrow="Library Unavailable"
            title="The resource library could not be loaded"
            description={currentLibraryError}
          />
        )}

        {showFeatured && featuredResource && (
          <div className="resource-featured">
            <FeaturedBanner
              title={featuredResource.title}
              subtitle="Signature Framework"
              description={featuredResource.summary}
              ctaLabel="View Framework Details →"
              ctaUrl={`/resources/${featuredResource.slug}`}
              onCtaClick={() => navigateTo(`/resources/${featuredResource.slug}`)}
              category="Framework"
              resourceType={featuredResource.resourceType}
              stats={[
                { value: "3", label: "Core Phases" },
                { value: "8", label: "Curated Resources" },
                { value: "0→1", label: "Founder Focus" },
              ]}
            />
          </div>
        )}

        <div className="resource-toolbar">
          <div>
            <p className="resource-toolbar__label">Curated Resource Set</p>
            <h2 className="resource-toolbar__title">
              {libraryLoading
                ? "Loading resources..."
                : `${visibleResources.length} resource${visibleResources.length === 1 ? "" : "s"
                } for `}{" "}
              {activeCategory === "all"
                ? "founders"
                : activeCategory.replace("_", " ")}
            </h2>
            <p className="resource-toolbar__subtitle">
              Strategy frameworks, practical tools, and founder guidance shaped
              around Pathfinder&apos;s early-stage point of view.
            </p>
          </div>
          {normalizedQuery && (
            <p className="resource-toolbar__search">
              Search: <span>&quot;{searchQuery}&quot;</span>
            </p>
          )}
        </div>

        {!currentLibraryError && libraryLoading ? (
          <ResourceStateNotice
            eyebrow="Loading Library"
            title="Fetching Pathfinder resources"
            description="Pulling the latest frameworks, playbooks, research pieces, and downloadable tools from the backend."
          />
        ) : !currentLibraryError && visibleResources.length > 0 ? (
          <div className="resource-grid">
            {visibleResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                id={resource.id}
                title={resource.title}
                description={resource.description}
                category={resource.category}
                resourceType={resource.resourceType}
                fileUrl={resource.detailUrl ?? `/resources/${resource.slug}`}
                slug={resource.slug}
                thumbnail={resource.thumbnailUrl ?? undefined}
                isFeatured={resource.isFeatured}
                tags={resource.tags}
                readTime={resource.readTime}
                actionLabel="View Details"
                onAction={() => navigateTo(`/resources/${resource.slug}`)}
              />
            ))}
          </div>
        ) : !currentLibraryError ? (
          <ResourceStateNotice
            eyebrow="No matching path found"
            title="Try a broader keyword or switch back to all resources."
            description="Pathfinder's content is centered on founder alignment, market clarity, strategic sequencing, and practical 0→1 execution."
          />
        ) : null}

        {!currentLibraryError && resourceMeta && (
          <div className="resource-footer-note">
            <p className="resource-footer-note__title">
              Built around Pathfinder&apos;s founder-first message
            </p>
            <p>
              This page now pulls live content from Django: {resourceMeta.total} published
              resources across {Object.values(resourceMeta.counts).filter(Boolean).length} active
              categories.
            </p>
          </div>
        )}

        {/* ADMIN BUTTON */}
        <div style={{ display: "flex", justifyContent: "center", margin: "40px 0" }}>
          <button
            onClick={() => navigateTo("/admin")}
            style={{
              backgroundColor: "#C8F135",
              color: "#1A1A2E",
              border: "none",
              padding: "12px 26px",
              borderRadius: "10px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#A8D420")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#C8F135")
            }
          >
            Admin Access
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
