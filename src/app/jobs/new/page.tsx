import { Metadata } from "next";
import CreateJobForm from "./_components/create-job-form";


export const metadata: Metadata = {
    title: "Post a new job"
}

const CreateJobPage = () => {
    return (
        <CreateJobForm/>
    );
};

export default CreateJobPage;