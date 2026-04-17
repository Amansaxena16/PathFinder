import { useRef, useState, useEffect, useCallback } from "react";
import ResourceCard from "./ResourceCard";
import type { ResourceCardProps } from "./ResourceCard";

type CarouselResource = Omit<ResourceCardProps, "actionLabel" | "onAction"> & {
  onAction: () => void;
};

interface ResourceCarouselProps {
  resources: CarouselResource[];
}

export default function ResourceCarousel({ resources }: ResourceCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  const totalSlides = Math.max(0, resources.length - visibleCount + 1);

  // Derive visible count from container width
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640)       setVisibleCount(1);
      else if (w < 1024) setVisibleCount(2);
      else               setVisibleCount(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scrollTo = useCallback((index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
    setActiveIndex(index);
  }, []);

  // Sync activeIndex on manual scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const card = el.children[0] as HTMLElement;
      if (!card) return;
      const cardWidth = card.offsetWidth + 20; // gap
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(Math.min(idx, totalSlides - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [totalSlides]);

  const prev = () => scrollTo(Math.max(0, activeIndex - 1));
  const next = () => scrollTo(Math.min(totalSlides - 1, activeIndex + 1));

  if (resources.length === 0) return null;

  return (
    <div className="carousel">
      {/* Header row */}
      <div className="carousel__header">
        <div className="carousel__header-left">
          <span className="carousel__count">{resources.length} resources</span>
        </div>
        <div className="carousel__controls">
          <button
            className="carousel__arrow"
            onClick={prev}
            disabled={activeIndex === 0}
            aria-label="Previous"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className="carousel__arrow"
            onClick={next}
            disabled={activeIndex >= totalSlides - 1}
            aria-label="Next"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Track */}
      <div className="carousel__track" ref={trackRef}>
        {resources.map((r) => (
          <div key={r.id} className="carousel__slide">
            <ResourceCard
              {...r}
              actionLabel="View Details"
              onAction={r.onAction}
            />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      {totalSlides > 1 && (
        <div className="carousel__dots">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              className={`carousel__dot ${i === activeIndex ? "carousel__dot--active" : ""}`}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
