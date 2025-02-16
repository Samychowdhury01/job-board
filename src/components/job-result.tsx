import React from "react";
import JobListItem from "./job-list-item";
import { prisma } from "@/lib/prisma";
import { Job, Prisma } from "@prisma/client";
import { TJobFilterValues } from "@/validation/validation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type TJobResultProps = {
  filterValues: TJobFilterValues;
  page?: number;
};

const JobResult = async ({ filterValues, page = 1 }: TJobResultProps) => {
  const { query, remote, location, type } = filterValues;

  const jobsPerPage = 6;
  const skip = (page - 1) * jobsPerPage;
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

  const jobsPromise = prisma.job.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    take: jobsPerPage,
    skip,
  });

  const countPromise = prisma.job.count({ where });

  const [jobs, count] = await Promise.all([jobsPromise, countPromise]);

  return (
    <div className="grow space-y-5">
      {jobs?.map((job: Job) => (
        <Link href={`/jobs/${job.slug}`} key={job.id} className="block">
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No Jobs Found. try adjusting your search filters
        </p>
      )}
      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPage={Math.ceil(count / jobsPerPage)}
          filterValues={filterValues}
        />
      )}
    </div>
  );
};

export default JobResult;

type TPaginationProps = {
  currentPage: number;
  totalPage: number;
  filterValues: TJobFilterValues;
};

const Pagination = ({
  currentPage,
  totalPage,
  filterValues: { location, query, remote, type },
}: TPaginationProps) => {
  const generatePageLink = (page: number) => {
    const searchParams = new URLSearchParams({
      ...(query && { query: query.trim() }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
      page: page.toString(),
    });
    return `/?${searchParams.toString()}`;
  };
  return (
    <div className="flex justify-between">
    <Link
      href={generatePageLink(currentPage - 1)}
      className={cn(
        "flex items-center gap-2 font-semibold",
        currentPage <= 1 && "invisible",
      )}
    >
      <ArrowLeft size={16} />
      Previous page
    </Link>
    <span className="font-semibold">
      Page {currentPage} of {totalPage}
    </span>
    <Link
      href={generatePageLink(currentPage + 1)}
      className={cn(
        "flex items-center gap-2 font-semibold",
        currentPage >= totalPage && "invisible",
      )}
    >
      Next page
      <ArrowRight size={16} />
    </Link>
  </div>
  )
};
