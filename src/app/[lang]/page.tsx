import Home from "@/components/pages/home/Home";
import { Metadata, NextPage } from "next";
import { auth } from "@/services/auth/auth";
import { redirect } from "next/navigation";
import { getDictionary } from "@/actions/lang.action";
import { QueryParams } from "@/types/queryParams.type";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: `${dict.pages.home} - Cloud Storage`,
  };
}

interface PageProps {
  searchParams: QueryParams & {
    view: "row" | "cells";
  };
}

const Page: NextPage<PageProps> = async ({ searchParams }) => {
  const session = await auth();

  if (!session) {
    redirect("welcome");
  }

  return <Home params={searchParams} />;
};

export default Page;
