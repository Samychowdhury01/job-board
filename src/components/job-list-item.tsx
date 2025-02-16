import { Job } from "@prisma/client";
import Image from "next/image";
import React from "react";
import companyLogoPlaceholder from "@/assets/company-logo-placeholder.png";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import { formatMoney, relativeDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import JobDetailsMetadata from "./job-details-metadata";

type TJobListItemProps = {
  job: Job;
};

const JobListItem: React.FC<TJobListItemProps> = ({
  job: {
    title,
    companyName,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
  },
}) => {
  return (
    <article className="flex gap-3 rounded-lg border p-5 hover:bg-muted/60">
      <Image
        src={companyLogoUrl || companyLogoPlaceholder}
        alt={`${companyName} logo`}
        width={100}
        height={100}
        className="self-center rounded-lg"
      />
      {/* image title and other details */}
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        </div>
       <JobDetailsMetadata
       createdAt={createdAt}
       locationType={locationType}
       salary={salary}
       type={type}
       location={location}
       />
      </div>
      {/*  */}
      <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
        <Badge variant={`outline`} className="rounded text-muted-foreground">
          {type}
        </Badge>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Clock size={16} />
          {relativeDate(createdAt)}
        </span>
      </div>
    </article>
  );
};

export default JobListItem;
