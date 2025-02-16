"use client";

import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AdminNavbar = () => {
  const { user, signOut } = useClerk();
  const router = useRouter();

  return (
    <div className="px-3 ">
      <div className="m-auto flex h-24 max-w-5xl items-center justify-between gap-2">
        <Link href="/admin" className="font-semibold underline">
          Admin Dashboard
        </Link>
        <div className="flex flex-col items-end gap-2">
        <p className="font-semibold text-sm">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
          <Button
            onClick={async () => {
              await signOut();
              router.push("/");
            }}
            variant="destructive"
          >
            Logout
            <LogOut size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
