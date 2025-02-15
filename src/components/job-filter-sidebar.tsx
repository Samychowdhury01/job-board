import { prisma } from "@/lib/prisma";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import { jobTypes, locationTypes } from "@/lib/job-types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "./ui/button";
import { jobFilterSchema, TJobFilterValues } from "@/validation/validation";
import { redirect } from "next/navigation";
import { ClientSideFilter } from "./client-side-filter";



async function filterJobs(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());
  const parsedResult = jobFilterSchema.parse(values);
  const { query, type, location, remote } = parsedResult;
  const searchParams = new URLSearchParams({
    ...(query && { query: query.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });
  redirect(`/?${searchParams.toString()}`);
}

type TJobFilterSidebarProps = {
  defaultValues : TJobFilterValues
}

const JobFilterSidebar : React.FC<TJobFilterSidebarProps> = async ({defaultValues}) => {
  const distinctLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean)
    )) as string[];

  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
      {/* <ClientSideFilter> */}
        <form action={filterJobs}>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="query">Search</Label>
              <Input id="query" name="query" placeholder="Title, Company, etc." defaultValue={defaultValues.query} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="type">Type</Label>
              <Select id="type" name="type" defaultValue={defaultValues.type || ''}>
                <option value="">All Types</option>
                {jobTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="location">Location</Label>
              <Select id="location" name="location" defaultValue={defaultValues.location || ''}>
                <option value="">All Locations</option>
                {distinctLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex gap-2">
              <Checkbox id="remote" name="remote"  defaultChecked={defaultValues.remote}/>
              <label htmlFor="remote" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Remote Jobs
              </label>
            </div>
            <Button type="submit" className="w-full">
              Filter Jobs
            </Button>
          </div>
        </form>
      {/* </ClientSideFilter> */}
    </aside>
  );
};

export default JobFilterSidebar;