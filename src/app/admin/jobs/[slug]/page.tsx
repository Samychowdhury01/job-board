import JobDetailsComponent from "@/components/job-details-component";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import AdminSidebar from "./_components/admin-sidebar";

type TJobDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const AdminJobsPage = async ({ params }: TJobDetailsPageProps) => {
  const reSolvedParams = await params;
  const slug = reSolvedParams?.slug;
  const job = await prisma.job.findUnique({
    where: {
      slug,
    },
  });
  if (!job) notFound();
  return (
    <main className="m-auto my-10 max-w-5xl flex flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobDetailsComponent job={job} />
      <AdminSidebar job={job} />
    </main>
  );
};

export default AdminJobsPage;
