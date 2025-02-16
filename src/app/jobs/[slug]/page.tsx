import JobDetailsComponent from "@/components/job-details-component";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { ArrowUpRight } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

type TJobDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// fetch data from prisma
const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: {
      slug,
    },
  });
  if (!job) notFound();

  return job;
});



export async function generateMetadata({
  params,
}: TJobDetailsPageProps): Promise<Metadata> {
  const reSolvedParams = await params;
  const slug = reSolvedParams?.slug;
  const job = await getJob(slug);

  return {
    title: job?.title,
  };
}

const JobDetailsPage = async ({ params }: TJobDetailsPageProps) => {
  const reSolvedParams = await params;
  const slug = reSolvedParams?.slug;
  const job = await getJob(slug);
  const { applicationEmail, applicationUrl } = job;
  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;
  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center md:flex-row md:items-start gap-5 space-y-10 px-3">
      <JobDetailsComponent job={job} />
      <aside>
        <Button asChild>
          <a href={applicationLink as string} className="w-40 md:w-fit flex items-center gap-1">
            <span className="block">Apply Now</span>
            <ArrowUpRight/>
          </a>
          
        </Button>
      </aside>
    </main>
  );
};

export default JobDetailsPage;
