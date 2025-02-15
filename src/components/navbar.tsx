import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.png";
import { Button } from "./ui/button";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
const Navbar = () => {
  return (
    <header className="shadow-sm">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} alt="logo" height={40} width={40} />
          <span className="text-xl font-bold tracking-tight">Flow Jobs</span>
        </Link>

        <Button asChild>
          <Link href="/jobs/new">
            Post a job
            <ArrowUpRight size={16} className="ml-1" />
          </Link>
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
