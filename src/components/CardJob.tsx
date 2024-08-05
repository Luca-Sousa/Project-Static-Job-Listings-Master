import { Job } from "../types";

interface CardJobProps {
  job: Job;
}

export function CardJob({ job }: CardJobProps) {
  return (
    <div
      key={job.id}
      className={`${
        job.featured && "border-l-4 border-colorDesaturatedDarkCyan"
      } flex items-center gap-4 p-8 rounded-md bg-white lg:flex-col lg:items-start lg:relative`}
    >
      <img
        className="size-16 lg:absolute lg:top-0 lg:-translate-y-1/2 lg:size-12"
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

      <div className="hidden w-full h-px bg-gray-200 lg:block"></div>

      <div className="flex gap-4 lg:flex-wrap">
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
  );
}
