import { useEffect, useRef, useState } from "react";
import { jobs } from "./data";
import { Job } from "./types";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";

export function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<boolean>(false);
  const filterRef = useRef<HTMLDivElement>(null);

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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

    return selectedFilters.every((filter) =>
      jobDetails.includes(filter.toLowerCase())
    );
  };

  const filteredJobs = jobs.filter(filterJobs);

  const allFilters = Array.from(
    new Set([
      ...jobs.map((job) => job.role),
      ...jobs.map((job) => job.level),
      ...jobs.flatMap((job) => job.languages),
      ...jobs.flatMap((job) => job.tools),
    ])
  );

  return (
    <div>
      <div className="h-32 bg-colorDesaturatedDarkCyan bg-center bg-teste relative">
        <div className="max-w-[1440px] w-full bg-white flex items-center gap-4 p-4 rounded-md absolute left-1/2 -translate-x-1/2 top-full -translate-y-1/2 shadow-xl shadow-colorDesaturatedDarkCyan">
          <div className="flex-1">
            <div className="relative" ref={filterRef}>
              <input
                value={selectedFilters.join(", ")}
                className="w-full h-fit border border-colorDesaturatedDarkCyan outline-none p-2 relative"
                placeholder="Filter by role, level, languages, or tools"
                onClick={openFilter}
              />

              {activeFilter ? (
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-colorDesaturatedDarkCyan"
                  onClick={closeFilter}
                >
                  <MdFilterAltOff className="size-5" />
                </button>
              ) : (
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-colorDesaturatedDarkCyan"
                  onClick={openFilter}
                >
                  <MdFilterAlt className="size-5" />
                </button>
              )}
            </div>

            {activeFilter && (
              <div
                className="absolute right-20 bg-white shadow-xl shadow-colorDesaturatedDarkCya"
                ref={filterRef}
              >
                <div className="flex flex-wrap w-96 p-4">
                  {allFilters
                    .filter((f) =>
                      f.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((filter, index) => (
                      <div
                        key={index}
                        className="cursor-pointer py-1 px-2 rounded-sm hover:bg-colorDesaturatedDarkCyan hover:text-colorLightGrayishCyanFT"
                        onClick={() => addFilter(filter)}
                      >
                        {filter}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {selectedFilters.map((filter, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 bg-colorLightGrayishCyanB rounded-md"
              >
                <span className="text-colorDesaturatedDarkCyan">{filter}</span>
                <button
                  className="text-colorDesaturatedDarkCyan hover:text-colorVeryDarkGrayishCyan"
                  onClick={() => removeFilter(filter)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={clearFilters}
            className="text-[15px] text-colorVeryDarkGrayishCyan hover:text-colorDesaturatedDarkCyan hover:underline"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto py-20 bg-colorLightGrayishCyanB">
        <div className="flex flex-col gap-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className={`${
                job.featured && "border-l-4 border-colorDesaturatedDarkCyan"
              } flex items-center gap-4 p-8 rounded-md bg-white`}
            >
              <img
                className="size-16"
                src={job.logo.src}
                alt={`${job.company} logo`}
              />

              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <h2 className="text-[15px] font-bold text-colorDesaturatedDarkCyan">
                    {job.company}
                  </h2>

                  <div className="flex gap-1.5">
                    {job.new && (
                      <div className="text-xs uppercase text-colorLightGrayishCyanFT bg-colorDesaturatedDarkCyan rounded-full px-1.5 pt-1">
                        new!
                      </div>
                    )}

                    {job.featured && (
                      <div className="text-xs uppercase text-colorLightGrayishCyanFT bg-colorVeryDarkGrayishCyan rounded-full px-1.5 pt-1">
                        featured
                      </div>
                    )}
                  </div>
                </div>

                <p className="font-bold cursor-pointer text-colorVeryDarkGrayishCyan hover:text-colorDesaturatedDarkCyan">
                  {job.position}
                </p>

                <div className="flex items-center gap-3 text-[15px] text-colorDarkGrayishCyan">
                  <span>{job.postedAt}</span>
                  <span className="size-0.5 rounded-full bg-colorDarkGrayishCyan"></span>
                  <span>{job.contract}</span>
                  <span className="size-0.5 rounded-full bg-colorDarkGrayishCyan"></span>
                  <span>{job.location}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center py-1 px-2 font-bold rounded-sm text-colorDesaturatedDarkCyan cursor-pointer bg-colorLightGrayishCyanB hover:bg-colorDesaturatedDarkCyan hover:text-colorLightGrayishCyanFT">
                  {job.role}
                </div>

                <div className="flex items-center py-1 px-2 font-bold rounded-sm text-colorDesaturatedDarkCyan cursor-pointer bg-colorLightGrayishCyanB hover:bg-colorDesaturatedDarkCyan hover:text-colorLightGrayishCyanFT">
                  {job.level}
                </div>

                {job.languages.map((language, index) => (
                  <div
                    key={index}
                    className="flex items-center py-1 px-2 font-bold rounded-sm text-colorDesaturatedDarkCyan cursor-pointer bg-colorLightGrayishCyanB hover:bg-colorDesaturatedDarkCyan hover:text-colorLightGrayishCyanFT"
                  >
                    {language}
                  </div>
                ))}

                {job.tools.map((tool, index) => (
                  <div
                    key={index}
                    className="flex items-center py-1 px-2 font-bold rounded-sm text-colorDesaturatedDarkCyan cursor-pointer bg-colorLightGrayishCyanB hover:bg-colorDesaturatedDarkCyan hover:text-colorLightGrayishCyanFT"
                  >
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
