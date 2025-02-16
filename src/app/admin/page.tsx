import JobListItem from "@/components/job-list-item";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import { unstable_noStore as noStore } from 'next/cache';

const AdminPage = async () => {
  noStore()
  const unapprovedJobs = await prisma.job.findMany({
    where: {
      approved: false,
    },
  });
  return (
    <main className="mx-auto my-10 max-w-5xl space-y-10 px-3">
      <h1 className="h1">Admin Dashboard</h1>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Unapproved jobs:</h2>
        {unapprovedJobs.map((job) => (
          <Link key={job.id} href={`/admin/jobs/${job.slug}`} className="block">
            <JobListItem job={job} />
          </Link>
        ))}
        {unapprovedJobs?.length === 0 && (
          <p className="text-muted-foreground">No unapproved jobs</p>
        )}
      </section>
    </main>
  );
};

export default AdminPage;
