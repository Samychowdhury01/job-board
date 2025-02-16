"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createJobSchema, TCreateJobValues } from "@/validation/validation";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomInputField, CustomSelectField } from "./custom-input-fields";
import { jobTypes, locationTypes } from "@/lib/job-types";
import { Loader, X } from "lucide-react";
import CitySelect from "./location-search-input";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RichTextEditor from "./rich-text-editor";
import { draftToMarkdown } from "markdown-draft-js";
import { createJobPosting } from "../action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateJobForm: React.FC = () => {
  const router = useRouter()
  const form = useForm<TCreateJobValues>({
    resolver: zodResolver(createJobSchema),
  });

  //   destructure the form object
  const {
    handleSubmit,
    watch,
    control,
    formState: { isSubmitting },
    setValue,
    setFocus,
    trigger,
    reset
  } = form;
  // form submit handler
  const onSubmit = async (values: TCreateJobValues) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    try {
      const response = await createJobPosting(formData);

      if (response?.id) {
        toast.success("Job posted successfully");
        reset()
        router.push('/job-submitted')
      } else {
        toast.error("Failed to post job");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.log("Error occurred", err);
    }
  };

  const onError = (errors: any) => {
    console.log("Validation errors:", errors);
  };
  return (
    <main className="m-auto my-10 max-w-3xl space-y-10">
      {/* headline and sub-headline container */}
      <div className="space-y-5 text-center">
        <h1 className="h1">Find your perfect candidate</h1>
        <p className="text-muted-foreground">
          Get your job posting seen by thousands of job seekers
        </p>
      </div>
      <div className="space-y-6 rounded-lg border p-4">
        {/* form heading */}
        <div>
          <h2 className="font-semibold">Job Details</h2>
          <p className="text-muted-foreground">
            Provide a job description and details
          </p>
        </div>
        {/* form */}
        <Form {...form}>
          <form
            className="space-y-5"
            noValidate
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <CustomInputField
              form={form}
              label="Job Title"
              name="title"
              type="text"
              placeholder="e.g. Frontend Developer"
            />

            <CustomSelectField
              form={form}
              label="Job Type"
              name="type"
              options={jobTypes}
            />
            <CustomInputField
              form={form}
              label="Company"
              name="companyName"
              type="text"
              placeholder="e.g. Apple"
            />
            <CustomInputField
              form={form}
              label="Company Logo"
              name="companyLogo"
              type="file"
            />

            <CustomSelectField
              form={form}
              label="Location"
              name="locationType"
              options={locationTypes}
            />
            {/* location search  */}
            <FormField
              control={control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Office location</FormLabel>
                  <FormControl>
                    <CitySelect
                      onLocationSelected={field.onChange}
                      ref={field.ref}
                    />
                  </FormControl>
                  {watch("location") && (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setValue("location", "", { shouldValidate: true });
                        }}
                      >
                        <X size={20} />
                      </button>
                      <span className="text-sm">{watch("location")}</span>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* apply method */}
            <div className="space-y-5">
              <Label htmlFor="applicationEmail">How to Apply</Label>
              <div className="flex justify-between">
                <FormField
                  control={control}
                  name="applicationEmail"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <div className="flex items-center">
                          <Input
                            id="applicationEmail"
                            placeholder="Email"
                            type="email"
                            {...field}
                          />
                          <span className="mx-2">or</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="applicationUrl"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Input
                          placeholder="Website"
                          type="url"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            trigger("applicationEmail");
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="description">Job Description</Label>
                  <FormControl>
                    <RichTextEditor
                      onChange={(daft) => field.onChange(draftToMarkdown(daft))}
                      ref={field.ref}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <CustomInputField
              form={form}
              label="Salary"
              name="salary"
              type="number"
              placeholder="e.g. 120"
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-1">
                  <span className="block">Submitting</span>
                  <Loader size={16} className="animate-spin" />
                </span>
              ) : (
                "Post Job"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default CreateJobForm;
