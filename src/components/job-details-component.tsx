import { Job } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import JobDetailsMetadata from "./job-details-metadata";
import MarkdownReader from "./markdown-reader";

type TJobDetailsComponentProps = {
  job: Job;
};
const JobDetailsComponent = ({
  job: {
    title,
    applicationUrl,
    companyLogoUrl,
    companyName,
    description,
    salary,
    location,
    locationType,
    type,
    createdAt,
  },
}: TJobDetailsComponentProps) => {
  return (
    <section className="w-full grow space-y-5">
      <div className="flex items-center gap-3">
        {companyLogoUrl && (
          <Image
            src={companyLogoUrl}
            alt="company-logo"
            width={100}
            height={100}
            className="rounded-xl"
          />
        )}
        <div>
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="font-semibold">
              {applicationUrl ? (
                <Link
                  className="text-green-400 hover:underline"
                  href={new URL(applicationUrl).origin}
                >
                  {companyName}
                </Link>
              ) : (
                <span>{companyName}</span>
              )}
            </p>
          </div>
          <JobDetailsMetadata
            createdAt={createdAt}
            location={location}
            locationType={locationType}
            salary={salary}
            type={type}
          />
        </div>
      </div>
      {/*Markdown will render here */}
      <div>
        {description && (
          <MarkdownReader>
            {description}
          </MarkdownReader>
        )}
      </div>
    </section>
  );
};

export default JobDetailsComponent;
