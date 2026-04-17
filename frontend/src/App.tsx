import { useEffect, useState } from "react";

import CategoryTabs, {
  type ResourceCategory as TabCategory,
} from "./components/CatergoryTab";

import ResourceHero from "./components/ResourceHero";
import ResourceStateNotice from "./components/ResourceStateNotice";
import ResourceCarousel from "./components/ResourceCarousel";
import Navbar from "./components/Navbar";

import AdminPanel from "./components/admin/AdminPanel";
import AdminAuth from "./components/AdminAuth";

import ResourceDetail from "./components/ResourceDetail";
import { getResourcesWithJWT } from "./api/resourceAdminApi";



function getRouteType(pathname: string) {

  const cleanedPath =
    pathname.replace(/\/+$/, "") || "/";

  if (
    cleanedPath === "/" ||
    cleanedPath === "/resources"
  ) {
    return { type: "library" as const };
  }

  if (cleanedPath.startsWith("/resources/")) {
    return {
      type: "detail" as const,
      slug:
        cleanedPath.split("/resources/")[1],
    };
  }

  if (cleanedPath === "/admin") {
    return { type: "admin" as const };
  }

  return { type: "not-found" as const };
}


function App() {

  const [resources, setResources] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [searchQuery] = useState("");

  const [activeCategory, setActiveCategory] =
    useState<TabCategory>("all");

  const [currentPath, setCurrentPath] =
    useState(() => window.location.pathname);


  /*
  HANDLE ROUTING
  */

  useEffect(() => {

    const handlePopState = () =>
      setCurrentPath(window.location.pathname);

    window.addEventListener("popstate", handlePopState);

    return () =>
      window.removeEventListener("popstate", handlePopState);

  }, []);



  const navigateTo = (path: string) => {

    if (window.location.pathname !== path) {

      window.history.pushState({}, "", path);

      setCurrentPath(path);

    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };



  const route =
    getRouteType(currentPath);



  /*
  FETCH ALL RESOURCES FROM BACKEND
  */

  useEffect(() => {

    const fetchData = async () => {

      try {

        setLoading(true);

        const data =
          await getResourcesWithJWT();

        setResources(data);

      }
      catch (err) {

        console.error(err);

        setError(
          "Unable to load resources"
        );

      }
      finally {

        setLoading(false);

      }

    };

    fetchData();

  }, []);



  /*
  FILTER
  */

  const normalizedQuery =
    searchQuery.toLowerCase();



  const filteredResources =
    resources.filter((r) => {

      const matchSearch =
        r.title
          ?.toLowerCase()
          .includes(normalizedQuery);

      const matchCategory =
        activeCategory === "all" ||
        r.category === activeCategory;

      return matchSearch && matchCategory;

    });



  /*
  ADMIN PAGE
  */

  if (route.type === "admin") {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      return <AdminAuth />;
    }
    return <AdminPanel onBack={() => navigateTo("/")} />;
  }

  /*
  NOT FOUND
  */

  if (route.type === "not-found") {

    return (

      <ResourceStateNotice
        eyebrow="Not Found"
        title="Page not found"
        description="Invalid route"
      />

    );

  }

  if (route.type === "detail") {

    const resource =
      resources.find(
        r => r.slug === route.slug
      );
  
    if (!resource) {
  
      return (
        <ResourceStateNotice
          eyebrow="Not Found" 
          title="Resource not found"
          description="Invalid resource"
        />
      );
  
    }
  
    return (
      <ResourceDetail
        resource={resource}
        onBack={() =>
          navigateTo("/resources")
        }
      />
    );
  }



  /*
  MAIN PAGE
  */

  return (
    <div className="resource-shell">
      <Navbar onAdminClick={() => navigateTo("/admin")} onNavigate={navigateTo} />

      <main>
        <ResourceHero />

        <CategoryTabs
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
          counts={{ all: resources.length }}
        />

        <section className="resource-content">
          {loading && (
            <ResourceStateNotice
              eyebrow="Loading"
              title="Loading..."
              description="Fetching resources from backend"
            />
          )}

          {error && (
            <ResourceStateNotice
              eyebrow="Error"
              title="Error"
              description={error}
            />
          )}

          {!loading && filteredResources.length > 0 && (
            <ResourceCarousel
              resources={filteredResources.map((r) => ({
                id: r.id,
                title: r.title,
                description: r.description,
                category: r.category,
                resourceType: r.resource_type,
                slug: r.slug,
                thumbnail: r.thumbnail_url,
                tags: r.tags,
                readTime: r.read_time,
                onAction: () => navigateTo(`/resources/${r.slug}`),
              }))}
            />
          )}

          {!loading && filteredResources.length === 0 && (
            <ResourceStateNotice
              eyebrow="No results"
              title="No resources"
              description="No matching results"
            />
          )}
        </section>
      </main>
    </div>
  );

}



export default App;