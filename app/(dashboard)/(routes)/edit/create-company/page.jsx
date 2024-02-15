// import { Button } from '@/components/ui/button';
// import Link from 'next/link';

'use client';

import * as Z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import toast from 'react-hot-toast';

const formSchema = Z.object({
  companyname: Z.string().min(1, {
    message: 'Company Name is Required'
  })
});

const createCompanyPage = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyname: ''
    }
  });
  //extract the state from the form
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async values => {
    try {
      const response = await axios.post('/api/companies', values);
      router.push(`/edit/create-company/${response.data.id}`);
      toast.success('Course created');
    } catch {
      toast.error('Sorry, but something went wrong');
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Name your course</h1>
        <p className="text-sm text-slate-600">Name of company? Don&apos;t worry, you can change this later.</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
            <FormField
              control={form.control}
              name="companyname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company name</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder="Company name" {...field} />
                  </FormControl>
                  <FormDescription>Please add the companies name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>

    // <div>
    //   <Link href="/edit/create-company">
    //     <Button className="p-6">New Company</Button>
    //   </Link>
    // </div>
  );
};
export default createCompanyPage;
