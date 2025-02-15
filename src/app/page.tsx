import JobFilterSidebar from "@/components/job-filter-sidebar";
import JobResult from "@/components/job-result";
import { TJobFilterValues } from "@/validation/validation";
import { Metadata } from "next";

type TPageProps = {
  searchParams: Promise<{
    query?: string
    type?: string
    location?: string
    remote?: string
  }>
}

const getTitle = ({query, type, location, remote}: TJobFilterValues) => {
  const titlePrefix = query 
    ? `Search results for "${query}"`
    : type
    ? `All ${type} Jobs`
    : remote
    ? `Available Remote jobs`
    : 'All jobs'

  const titleSuffix = location ? ` in ${location}` : ''
  return `${titlePrefix}${titleSuffix}`
}

export async function generateMetadata(
  { searchParams }: TPageProps
): Promise<Metadata> {
  const params = await searchParams;
  const filterValues: TJobFilterValues = {
    query: params.query,
    type: params.type,
    location: params.location,
    remote: params.remote === 'true'
  };

  const title = getTitle(filterValues);

  return {
    title: `${title} | Flow Jobs`,
    description: `Find your dream developer job. ${title} on our job board.`,
  };
}

export default async function HomePage({searchParams}: TPageProps) {
  const {query, type, location, remote} = await searchParams;
  const filterValues: TJobFilterValues = {
    query,
    type,
    location,
    remote: remote === 'true'
  };

  return (
    <main className="mx-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1 className="h1">
          {getTitle(filterValues)}
        </h1>
        <p className="text-muted-foreground">Find your dream job here!</p>
      </div>
      <section className="flex flex-col md:flex-row gap-4">
        <JobFilterSidebar defaultValues={filterValues}/>
        <JobResult filterValues={filterValues}/>
      </section>
    </main>
  );
}