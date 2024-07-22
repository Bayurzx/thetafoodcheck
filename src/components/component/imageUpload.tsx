import { ChangeEvent, useState } from 'react';
import { HiUserCircle } from 'react-icons/hi';

interface ImageUploadProps {
  photo: string;
  setPhoto: (photo: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ photo, setPhoto }) => {
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setPhoto(base64 as string);
    }
  };

  const convertToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="col-span-full mt-3 mb-3">
      <label htmlFor="photo" className="block text-md font-medium leading-6 text-gray-900 dark:text-gray-300">
        Photo
      </label>
      <div className="mt-2 flex items-center gap-x-3">
        {photo ? (
          <img src={photo} alt="User Avatar" className="h-12 w-12 rounded-full" />
        ) : (
          <HiUserCircle aria-hidden="true" className="h-12 w-12 text-gray-300 dark:text-gray-400" />
        )}
        <label
          htmlFor="photo-upload"
          className="rounded-md bg-white dark:bg-gray-800 px-2.5 py-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
        >
          Change
        </label>
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
    </div>
  );
}

export default ImageUpload;
