'use client';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Combobox } from '@/components/ui/combobox';

const formSchema = z.object({
  sectorId: z.string().min(1)
});

export const Sectorform = ({ initialData, companyId, options }) => {
  // Define useForm here where initialData is accessible
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sectorId: initialData?.sectorId || ''
    }
  });

  //console.log('[FORMDATA]', form);

  const { isSubmitting, isValid } = form.formState;

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing(current => !current);

  const router = useRouter();

  const onSubmit = async values => {
    //console.log('Form values being sent to API:', values);
    try {
      await axios.patch(`/api/companies/${companyId}`, values); //sends sectorId to the db
      toast.success('Sector updated');
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error('Error updating sector:', error.response?.data || error.message);
      toast.error('Something went wrong');
    }
  };

  const selectedOption = options.find(option => option.value === initialData.sectorId);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Sector
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit sector
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn('text-sm mt-2', !initialData.sectorId && 'text-slate-500 italic')}>
          {selectedOption?.label || 'No sector'}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-43">
            <FormField
              control={form.control}
              name="sectorId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox options={options} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2 mt-3">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
