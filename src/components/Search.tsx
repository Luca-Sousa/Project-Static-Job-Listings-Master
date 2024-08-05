import { FaFilterCircleXmark } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

interface SearchProps {
  searchTerm: string;
  filterRef: React.RefObject<HTMLDivElement>;
  selectedFilters: string[];
  activeFilter: boolean;
  allFilters: string[];
  handleSearchChange: (event: React.FormEvent<HTMLInputElement>) => void;
  openFilter: () => void;
  closeFilter: () => void;
  removeFilter: (filter: string) => void;
  addFilter: (filter: string) => void;
  clearFilters: () => void;
}

export function Search({
  searchTerm,
  filterRef,
  selectedFilters,
  handleSearchChange,
  openFilter,
  closeFilter,
  removeFilter,
  activeFilter,
  allFilters,
  addFilter,
  clearFilters,
}: SearchProps) {
  return (
    <div
      className={`${
        searchTerm && "pr-4"
      } max-w-[1440px] w-full bg-white flex items-center gap-4 pl-4 py-1.5 rounded-md absolute left-1/2 -translate-x-1/2 top-full -translate-y-1/2 shadow-xl shadow-colorDesaturatedDarkCyan 2xl:max-w-6xl xl:max-w-4xl lg:max-w-2xl md:max-w-lg sm:max-w-md xs:max-w-xs`}
    >
      <div className="flex-1">
        <div ref={filterRef}>
          <div
            className="w-full flex h-14 overflow-x-auto outline-none p-2 relative cursor-pointer"
            onInput={handleSearchChange}
            onClick={openFilter}
          >
            {selectedFilters.length === 0 ? (
              <span className="text-gray-500">Search...</span>
            ) : (
              <div className="flex flex-wrap gap-4 z-50">
                {selectedFilters.map((filter, index) => (
                  <div
                    key={index}
                    className="h-8 flex items-center bg-colorLightGrayishCyanB rounded-md overflow-hidden"
                  >
                    <span className="text-[15px] py-1 px-2 text-colorDesaturatedDarkCyan">
                      {filter}
                    </span>

                    <button
                      className="flex items-center justify-center w-8 h-full bg-colorDesaturatedDarkCyan text-colorLightGrayishCyanFT hover:bg-colorVeryDarkGrayishCyan"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFilter(filter);
                      }}
                    >
                      <IoClose className="size-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {activeFilter && (
          <div
            className="absolute right-0 top-20 rounded-md bg-white shadow-xl shadow-colorDesaturatedDarkCya py-2 z-50"
            ref={filterRef}
          >
            <div className="pt-1 w-full pr-6 flex justify-end">
              <button
                className="rounded-full size-8 flex items-center justify-center ring-colorDesaturatedDarkCyan hover:ring-2 hover:text-colorDesaturatedDarkCyan"
                onClick={closeFilter}
              >
                <FaFilterCircleXmark className="size-5" />
              </button>
            </div>

            <div className="flex gap-1 flex-wrap w-96 px-4 pt-1">
              {allFilters.map((filter, index) => (
                <div
                  key={index}
                  className={`cursor-pointer py-1 px-2 rounded-sm ${
                    selectedFilters.includes(filter)
                      ? "bg-colorDesaturatedDarkCyan text-colorLightGrayishCyanFT"
                      : "hover:bg-colorDesaturatedDarkCyan hover:text-colorLightGrayishCyanFT"
                  }`}
                  onClick={() => addFilter(filter)}
                >
                  {filter}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {searchTerm && (
        <button
          onClick={clearFilters}
          className="text-[15px] text-colorVeryDarkGrayishCyan hover:text-colorDesaturatedDarkCyan hover:underline hover:scale-110"
        >
          Clear
        </button>
      )}
    </div>
  );
}
