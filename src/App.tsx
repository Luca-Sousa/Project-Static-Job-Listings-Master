import { jobs } from "./data";

export function App() {
  return (
    <div className="">
      <div className="h-32 bg-colorDesaturatedDarkCyan bg-center bg-teste"></div>

      <div className="max-w-[1440px] mx-auto py-20 bg-colorLightGrayishCyanB">
        <div className="flex flex-col gap-4">
          {jobs.map((job) => (
            <div key={job.id} className="flex  items-center gap-4 p-8 bg-white">
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

                <p className="font-bold text-colorVeryDarkGrayishCyan">
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
                <div className="py-1 px-2 font-bold rounded-sm text-colorDesaturatedDarkCyan bg-colorLightGrayishCyanB">
                  {job.role}
                </div>

                <div className="py-1 px-2 font-bold rounded-sm text-colorDesaturatedDarkCyan bg-colorLightGrayishCyanB">
                  {job.level}
                </div>

                {job.languages.map((language, index) => (
                  <div
                    key={index}
                    className="py-1 px-2 font-bold rounded-sm text-colorDesaturatedDarkCyan bg-colorLightGrayishCyanB"
                  >
                    {language}
                  </div>
                ))}

                {job.tools.map((tool, index) => (
                  <div
                    key={index}
                    className="py-1 px-2 font-bold rounded-sm text-colorDesaturatedDarkCyan bg-colorLightGrayishCyanB"
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
