
import { useState } from "react";
import CategoryTabs, {
  type ResourceCategory as TabCategory,
} from "./components/CatergoryTab";
import FeaturedBanner from "./components/FeaturedBanner";
import ResourceCard, {
  type ResourceCategory as CardCategory,
  type ResourceType,
} from "./components/ResourceCard";
import ResourceHero from "./components/ResourceHero";

interface ResourceItem {
  id: number;
  title: string;
  description: string;
  category: CardCategory;
  resourceType: ResourceType;
  fileUrl: string;
  isFeatured?: boolean;
  tags: string[];
  readTime: string;
}

const RESOURCE_DATA: ResourceItem[] = [
  {
    id: 1,
    title: "The Pathfinder Road(Map)",
    description:
      "A founder-first guide to move from scattered motion to structured momentum through Ideate, Innovate, and Elevate.",
    category: "framework",
    resourceType: "pdf",
    fileUrl: "https://www.pathfinder.build/",
    isFeatured: true,
    tags: ["0→1", "Strategy", "RoadMap"],
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "The Obelisk System: Structure the Advantage",
    description:
      "A practical breakdown of how Pathfinder helps founders align choices, define purpose, and build a stronger strategic spine.",
    category: "framework",
    resourceType: "article",
    fileUrl: "https://www.pathfinder.build/",
    tags: ["Obelisk", "Advantage", "Clarity"],
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "0→1 Founder Alignment Playbook",
    description:
      "A simple operating playbook for founders who need a sharper narrative, clearer priorities, and a more coherent next move.",
    category: "playbook",
    resourceType: "pdf",
    fileUrl: "https://www.pathfinder.build/",
    tags: ["Founder", "Alignment", "Execution"],
    readTime: "10 min read",
  },
  {
    id: 4,
    title: "Signal Before Scale Market Map",
    description:
      "A market-mapping template to help early-stage teams see whitespace, understand competition, and focus on the right opportunity.",
    category: "market_map",
    resourceType: "template",
    fileUrl: "https://www.pathfinder.build/",
    tags: ["Market Map", "Positioning", "Opportunity"],
    readTime: "Template",
  },
  {
    id: 5,
    title: "The Blind Spot in Early-Stage Growth",
    description:
      "A short read on why founders often chase capital and customers before fixing the strategic gaps underneath both.",
    category: "blog",
    resourceType: "article",
    fileUrl: "https://www.pathfinder.build/",
    tags: ["Orbit", "Blind Spot", "Growth"],
    readTime: "4 min read",
  },
  {
    id: 6,
    title: "Founder Weekly Review Template",
    description:
      "A lightweight reflection template to track decisions, traction signals, and where your startup is creating real progress.",
    category: "tool",
    resourceType: "template",
    fileUrl: "https://www.pathfinder.build/",
    tags: ["Template", "Review", "Traction"],
    readTime: "Template",
  },
];

const CATEGORY_ORDER: CardCategory[] = [
  "framework",
  "playbook",
  "market_map",
  "case_study",
  "tool",
  "blog",
];

const PATHFINDER_PILLARS = [
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

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<TabCategory>("all");

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredResources = RESOURCE_DATA.filter((resource) => {
    const matchesCategory =
      activeCategory === "all" || resource.category === activeCategory;
    const matchesSearch =
      normalizedQuery.length === 0 ||
      resource.title.toLowerCase().includes(normalizedQuery) ||
      resource.description.toLowerCase().includes(normalizedQuery) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

    return matchesCategory && matchesSearch;
  });

  const featuredResource = RESOURCE_DATA.find((resource) => resource.isFeatured);
  const showFeatured =
    activeCategory === "all" && normalizedQuery.length === 0 && !!featuredResource;

  const visibleResources =
    showFeatured && featuredResource
      ? filteredResources.filter((resource) => resource.id !== featuredResource.id)
      : filteredResources;

  const counts = CATEGORY_ORDER.reduce(
    (acc, category) => {
      acc[category] = RESOURCE_DATA.filter(
        (resource) => resource.category === category
      ).length;
      return acc;
    },
    { all: RESOURCE_DATA.length } as Partial<Record<TabCategory, number>>
  );

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
        {showFeatured && featuredResource && (
          <div className="resource-featured">
            <FeaturedBanner
              title={featuredResource.title}
              subtitle="Signature Framework"
              description={featuredResource.description}
              ctaLabel="Explore the RoadMap →"
              ctaUrl={featuredResource.fileUrl}
              category="Framework"
              resourceType={featuredResource.resourceType}
              stats={[
                { value: "3", label: "Core Phases" },
                { value: "6", label: "Curated Resources" },
                { value: "0→1", label: "Founder Focus" },
              ]}
            />
          </div>
        )}

        <div className="resource-toolbar">
          <div>
            <p className="resource-toolbar__label">Curated Resource Set</p>
            <h2 className="resource-toolbar__title">
              {visibleResources.length} resource
              {visibleResources.length === 1 ? "" : "s"} for{" "}
              {activeCategory === "all" ? "founders" : activeCategory.replace("_", " ")}
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

        {visibleResources.length > 0 ? (
          <div className="resource-grid">
            {visibleResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                id={resource.id}
                title={resource.title}
                description={resource.description}
                category={resource.category}
                resourceType={resource.resourceType}
                fileUrl={resource.fileUrl}
                isFeatured={resource.isFeatured}
                tags={resource.tags}
                readTime={resource.readTime}
              />
            ))}
          </div>
        ) : (
          <div className="resource-empty">
            <p className="resource-empty__eyebrow">No matching path found</p>
            <h3>Try a broader keyword or switch back to all resources.</h3>
            <p>
              Pathfinder&apos;s content is centered on founder alignment, market
              clarity, strategic sequencing, and practical 0→1 execution.
            </p>
          </div>
        )}

        <div className="resource-footer-note">
          <p className="resource-footer-note__title">
            Built around Pathfinder&apos;s founder-first message
          </p>
          <p>
            This page stays intentionally focused: one hero, one featured
            framework, one short company story, and a compact library of
            high-signal resources.
          </p>
        </div>
      </section>
    </main>
  );
}

export default App;
