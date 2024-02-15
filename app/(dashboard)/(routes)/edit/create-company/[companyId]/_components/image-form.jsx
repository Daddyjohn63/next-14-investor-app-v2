'use client';

import * as z from 'zod';
import axios from 'axios';
import { Pencil, PlusCircle, ImageIcon } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FileUpload } from '@/components/file-upload';

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: 'Image is required'
  })
});

export const Imageform = ({ initialData, companyId }) => {
  const [isEditing, setIsEditing] = useState(false);
  //at this stage we have no image url when we first create a company.
  //however, once an image is loaded we will have an image url called imageUrl
  console.log('[from ImageForm]', initialData, companyId);

  const toggleEdit = () => setIsEditing(current => !current);

  const router = useRouter();

  const onSubmit = async values => {
    try {
      await axios.patch(`/api/companies/${companyId}`, values);
      toast.success('Image updated');
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error('Error updating image:', error.response?.data || error.message);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Company image / logo
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image / logo
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image / logo
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image alt="Upload" fill className="object-cover rounded-md" src={initialData.imageUrl} />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="companyImage"
            //onSubmit, we are passing the url we receive to our onSubmit function where axios takes it and through our api saves it to the database.
            onChange={url => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">16:9 aspect ratio recommended</div>
        </div>
      )}
    </div>
  );
};
