"use client";
import { approveSubmission, deleteJob } from "@/app/admin/action";
import FormSubmitButton from "@/components/form-submit-button";
import { Job } from "@prisma/client";
import React from "react";
import { useFormState } from "react-dom";

const AdminSidebar = ({ job }: { job: Job }) => {
  return (
    <aside className="flex w-[200px] flex-none flex-row gap-2 md:flex-col md:items-stretch">
      {job?.approved ? (
        <span className="text-center font-semibold text-green-500">
          Approved
        </span>
      ) : (
        <ApproveSubmissionButton jobId={job.id} />
      )}
      <DeleteJobButton jobId={job.id} />
    </aside>
  );
};

export default AdminSidebar;

type TButtonProps = { jobId: number };

export const ApproveSubmissionButton = ({ jobId }: TButtonProps) => {
  const [formState, formAction] = useFormState(approveSubmission, undefined);
  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} />
      <FormSubmitButton className="bg-green-500 hover:bg-green-600">
        Approved
      </FormSubmitButton>
      {formState?.error && <p className="text-red-500">{formState.error}</p>}
    </form>
  );
};
export const DeleteJobButton = ({ jobId }: TButtonProps) => {
  const [formState, formAction] = useFormState(deleteJob, undefined);
  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} />
      <FormSubmitButton className="bg-red-500 hover:bg-red-600">
        Delete
      </FormSubmitButton>
      {formState?.error && <p className="text-red-500">{formState.error}</p>}
    </form>
  );
};
