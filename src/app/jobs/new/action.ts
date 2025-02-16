"use server";

import { generateSlug } from "@/utils/generate-slug";
import { createJobSchema } from "@/validation/validation";
import { nanoid } from "nanoid";
import { put } from "@vercel/blob";
import path from "path";
import { prisma } from "@/lib/prisma";

export const createJobPosting = async (formData: FormData) => {
  const values = Object.fromEntries(formData.entries());
  const {
    title,
    description,
    type,
    salary,
    location,
    companyName,
    companyLogo,
    locationType,
    applicationEmail,
    applicationUrl,
  } = createJobSchema.parse(values);
  const slug = `${generateSlug(title)}-${nanoid(10)}`;

  let companyLogoUrl: string | undefined = undefined;

  if (companyLogo) {
    const blob = await put(
      `company_logos/${slug}${path.extname(companyLogo.name)}`,
      companyLogo,
      {
        access: "public",
        addRandomSuffix: false,
      },
    );

    companyLogoUrl = blob.url;
  }
  const result = await prisma.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      companyName: companyName.trim(),
      companyLogoUrl,
      description: description?.trim(),
      salary: parseInt(salary),
      location,
      locationType,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
    },
  });
  return result
};
