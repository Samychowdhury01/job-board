import JobFilterSidebar from "@/components/job-filter-sidebar";
import JobResult from "@/components/job-result";
import { TJobFilterValues } from "@/validation/validation";

type TPageProps ={
  searchParams: Promise<{
    query?: string
    type?: string
    location?: string
    remote?: string
  }>
}

export default async function HomePage({searchParams}: TPageProps ) {
 const  {query, type,location, remote } = await searchParams
  const filterValues: TJobFilterValues = {
    query,
    type,
    location,
    remote : remote === 'true'
  }
  return (
    <main className="mx-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1 className="h1">
          Developer Jobs
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
