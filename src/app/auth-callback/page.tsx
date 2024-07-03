"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";
import React, { Suspense, useEffect, Dispatch, SetStateAction } from "react";
import { useToast } from "@/components/ui/use-toast";

type SearchParamsComponentProps = {
  onSearchParamsLoaded: Dispatch<SetStateAction<string | null>>;
};

const SearchParamsComponent: React.FC<SearchParamsComponentProps> = ({ onSearchParamsLoaded }) => {
  const searchParams = useSearchParams();
  useEffect(() => {
    onSearchParamsLoaded(searchParams.get("origin"));
  }, [searchParams, onSearchParamsLoaded]);

  return null;
};

const Page: React.FC = () => {
  const router = useRouter();
  const { data, isLoading, isError, error } = trpc.authCallback.useQuery();
  const { toast } = useToast();
  const [origin, setOrigin] = React.useState<string | null>(null);

  useEffect(() => {
    if (data?.success) {
      router.push(origin ? `/${origin}` : "/dashboard");
    } else if (isError && error.data?.code === "UNAUTHORIZED") {
      router.push("/");
      toast({
        title: "You are unauthorized!",
        description: "Please try again later!",
        variant: "destructive",
      });
    }
  }, [data, isError, error, origin, router]);

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin text-zinc-800" />}>
          <SearchParamsComponent onSearchParamsLoaded={setOrigin} />
        </Suspense>
        {isLoading ? (
          <>
            <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
            <h3 className="font-semibold text-xl">Setting up your account...</h3>
            <p>You will be redirected automatically.</p>
          </>
        ) : (
          <h3 className="font-semibold text-xl">
            {data?.success ? "Success!" : "Failed to set up your account"}
          </h3>
        )}
      </div>
    </div>
  );
};

export default Page;
