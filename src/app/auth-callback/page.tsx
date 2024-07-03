'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { trpc } from '../_trpc/client';
import { Loader2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');

  const { data, isLoading, isError, error } = trpc.authCallback.useQuery();
const {toast} = useToast();
  useEffect(() => {
    if (data?.success) {
      router.push(origin ? `/${origin}` : '/dashboard');
    } else if (isError && error.data?.code === 'UNAUTHORIZED') {
      router.push('/');
      toast({
        title : "You are unauthorized !",
        description : "Please try again later !",
        variant :"destructive"
      })
    }
  }, [data, isError, error, origin, router]);

  return (
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        {isLoading ? (
          <>
            <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
            <h3 className='font-semibold text-xl'>
              Setting up your account...
            </h3>
            <p>You will be redirected automatically.</p>
          </>
        ) : (
          <h3 className='font-semibold text-xl'>
            {data?.success ? 'Success!' : 'Failed to set up your account'}
          </h3>
        )}
      </div>
    </div>
  );
};

export default Page;
