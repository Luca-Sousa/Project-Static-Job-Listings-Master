import { useEffect, useRef, useState } from "react";
import { jobs } from "./data";
import { Job } from "./types";
import { Search } from "./components/Search";
import { CardJob } from "./components/CardJob";

export function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<boolean>(false);
  const [allFilters, setAllFilters] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAllFilters(
      Array.from(
        new Set([
          ...jobs.map((job) => job.role),
          ...jobs.map((job) => job.level),
          ...jobs.flatMap((job) => job.languages),
          ...jobs.flatMap((job) => job.tools),
        ])
      )
    );
  }, []);

  useEffect(() => {
    setSearchTerm(selectedFilters.join(", "));
  }, [selectedFilters]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        closeFilter();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterRef]);

  const openFilter = () => {
    setActiveFilter(true);
  };

  const closeFilter = () => {
    setActiveFilter(false);
  };

  const handleSearchChange = (event: React.FormEvent<HTMLDivElement>) => {
    setSearchTerm(event.currentTarget.textContent || "");
  };

  const addFilter = (filter: string) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters((prevFilters) => [...prevFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.filter((f) => f !== filter)
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  const filterJobs = (job: Job) => {
    if (selectedFilters.length === 0) return true;

    const jobDetails = [
      job.role.toLowerCase(),
      job.level.toLowerCase(),
      ...job.languages.map((language) => language.toLowerCase()),
      ...job.tools.map((tool) => tool.toLowerCase()),
    ];

    return selectedFilters.some((filter) =>
      jobDetails.includes(filter.toLowerCase())
    );
  };

  const filteredJobs = jobs.filter(filterJobs);

  return (
    <div>
      <div className="h-32 bg-colorDesaturatedDarkCyan bg-center bg-bgDesktop relative md:bg-bgMobile">
        <Search
          searchTerm={searchTerm}
          filterRef={filterRef}
          selectedFilters={selectedFilters}
          activeFilter={activeFilter}
          allFilters={allFilters}
          handleSearchChange={handleSearchChange}
          openFilter={openFilter}
          closeFilter={closeFilter}
          removeFilter={removeFilter}
          addFilter={addFilter}
          clearFilters={clearFilters}
        />
      </div>

      <div className="max-w-[1440px] mx-auto py-20 bg-colorLightGrayishCyanB 2xl:max-w-6xl xl:max-w-4xl lg:max-w-2xl md:max-w-lg sm:max-w-md xs:max-w-xs">
        <div className="flex flex-col gap-4 lg:gap-10">
          {filteredJobs.map((job) => (
            <CardJob key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
