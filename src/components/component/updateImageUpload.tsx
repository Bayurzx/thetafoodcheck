import Image from 'next/image';
import React, { useRef } from 'react';

interface ImageUploadProps {
  photo: string;
  setPhoto: (photo: string) => void;
  isEditing: boolean;
}

const UpdateImageUpload: React.FC<ImageUploadProps> = ({ photo, setPhoto, isEditing }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Image
        src={photo || '/default-profile.png'}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover"
      />
      {isEditing && (
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <button
            type="button"
            className="mt-2 px-3 py-2 bg-gray-200 dark:bg-gray-700 text-sm rounded-md"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Photo
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateImageUpload;
