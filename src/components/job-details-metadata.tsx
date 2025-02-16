import React from "react";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import { formatMoney, relativeDate } from "@/lib/utils";

type TPageProps = {
  type: string;
  locationType: string;
  location: string | null;
  salary: number;
  createdAt: Date;
};

const JobDetailsMetadata = ({
  type,
  locationType,
  location,
  salary,
  createdAt,
}: TPageProps) => {
  return (
    <div className="text-muted-foreground">
      <p className="flex items-center gap-1.5 sm:hidden">
        <Briefcase size={16} className="shrink-0" />
        {type}
      </p>
      <p className="flex items-center gap-1.5">
        <MapPin size={16} className="shrink-0" />
        {locationType}
      </p>
      <p className="flex items-center gap-1.5">
        <Globe2 size={16} className="shrink-0" />
        {location || "worldwide"}
      </p>
      <p className="flex items-center gap-1.5">
        <Banknote size={16} className="shrink-0" />
        {formatMoney(salary)}
      </p>
      <p className="flex items-center gap-1.5 sm:hidden">
        <Clock size={16} className="shrink-0" />
        {relativeDate(createdAt)}
      </p>
    </div>
  );
};

export default JobDetailsMetadata;
