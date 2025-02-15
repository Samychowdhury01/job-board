import JobListItem from "@/components/job-list-item";
import { prisma } from "@/lib/prisma";
import { Job } from "@prisma/client";

export default async function HomePage() {
  const jobs = await prisma.job.findMany({
    where: {
      approved: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <main className="max-w-5xl mx-auto px-3 my-10 space-y-10">
      <div className="space-y-5">
      {jobs?.map((job: Job) => <JobListItem key={job.id} job={job} />)}
      </div>
    </main>
  );
}
