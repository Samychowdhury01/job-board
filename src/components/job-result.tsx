import React from "react";
import JobListItem from "./job-list-item";
import { prisma } from "@/lib/prisma";
import { Job, Prisma } from "@prisma/client";
import { TJobFilterValues } from "@/validation/validation";

type TJobResultProps = {
  filterValues: TJobFilterValues;
};

const JobResult = async ({
  filterValues: { query, remote, location, type },
}: TJobResultProps) => {
  // creating the search string
  const searchString = query
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          {
            title: {
              search: searchString,
            },
          },
          {
            companyName: {
              search: searchString,
            },
          },
          {
            type: {
              search: searchString,
            },
          },
          {
            location: {
              search: searchString,
            },
          },
          {
            locationType: {
              search: searchString,
            },
          },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      {
        approved: true,
      },
    ],
  };

  const jobs = await prisma.job.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="grow space-y-5">
      {jobs?.map((job: Job) => <JobListItem key={job.id} job={job} />)}
      {
        jobs.length === 0 && (
            <p className="m-auto text-center">No Jobs Found. try adjusting your search filters</p>
        )
      }
    </div>
  );
};

export default JobResult;
