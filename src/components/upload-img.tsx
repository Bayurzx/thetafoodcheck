import { useState, ChangeEvent, FormEvent, useRef } from 'react';
import Image from 'next/image'
import { MarkdownInputObject } from '@/types'
import { useHealthData } from '@/app/providers/userDataContext';
import NotificationContainer from '@/components/notifications-container';
import { notifySuccess, notifyError, notifyLoading, updateLoading } from '@/lib/utils/notifications';
import { useTheme } from '@/app/providers/theme'; // Assuming you have a theme provider
import { truncateTo256 } from '@/lib/fx/conversion';
import MarkdownPage from './markdown-page';
import { fakeAnalysis } from '@/lib/utils/faker';




const UploadImg = () => {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [isDrag, setIsDrag] = useState(false);
    // const [healthData, setHealthData] = useState<UserHealthData | null>(null);
    const [analysis, setAnalysis] = useState<MarkdownInputObject | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropAreaRef = useRef<HTMLDivElement>(null);
    const { healthData } = useHealthData()
    const { theme } = useTheme();



    const handleImgSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const confirmed = window.confirm("Do you really want to submit?");

        if (confirmed) {
            const file = fileInputRef.current?.files?.[0];

            if (!file || !healthData) {
                console.log("file or healthData is missing!");
                notifyError("File or Health Data is missing!")

                return;
            }


            if (file) {
                const formData = new FormData();
                formData.append('image', file);
                formData.append('health_data', JSON.stringify(healthData));

                try {
                    const fetchAiApiId = notifyLoading("Please wait... Analyzing Image...");
                    const response = await fetch('/api/ai', {
                        method: 'POST',
                        body: formData,
                    });

                    if (response.ok) {
                        console.log('Image uploaded successfully!');
                        notifySuccess("Image uploaded successfully!")

                        // console.log('response', response)
                        // Reset the image preview after successful upload
                        const result = await response.json();
                        setAnalysis(JSON.parse(result.analysis));

                        setImageUrl('');

                        console.log('Form submitted!');
                        updateLoading(fetchAiApiId, "Form submitted!", 'success');


                    } else {
                        console.error('Failed to upload image.');
                        updateLoading(fetchAiApiId, "Failed to upload image.", 'error');

                    }
                } catch (error) {
                    console.error('Error uploading image:', error);
                    notifyError(`Failed to upload image: ${truncateTo256(error)}`)

                    setAnalysis(null);

                }
            } else {
                alert("No file yet!")
            }

        } else {
            console.log('Submission cancelled');
        }

    };


    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDrag(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDrag(false);
    };

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImageUrl(reader.result as string);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDrag(false);


        const file = e.dataTransfer.files?.[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImageUrl(reader.result as string);
        };

        if (file) {
            reader.readAsDataURL(file);

            // Set the file in the file input ref
            if (fileInputRef.current) {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                fileInputRef.current.files = dataTransfer.files;
            }
        }
    };

// change to analysis
    if (fakeAnalysis) {
        return (
            <>
                <NotificationContainer theme={theme} />

                <div>
                <MarkdownPage data={fakeAnalysis} />
                </div>
            </>
        )
    }



    return (
        <>
            <NotificationContainer theme={theme} />

            <form onSubmit={handleImgSubmit} className="max-w-md mx-auto p-4 bg-gray-800 rounded-lg shadow-md">
                <div className="mb-4">
                    <p className="text-lg font-bold text-center mb-2 text-white">Upload Your Image</p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        ref={fileInputRef}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    />
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        ref={dropAreaRef}
                        className={`border-2 border-dashed p-4 text-center cursor-pointer mt-4 ${isDrag ? 'border-blue-500' : 'border-gray-300'} bg-gray-700 text-white`}
                    >
                        <label htmlFor="file-upload">Drag & drop or click to select an image (less than 10mb)</label>
                        {imageUrl ? (
                            <div className="flex justify-center mt-4">
                                <Image src={imageUrl} alt="Uploaded image" width={200} height={200} className="object-contain" />
                            </div>
                        ) : (
                            <div className="flex justify-center mt-4">
                                <label htmlFor="file-upload">
                                    {isDrag ? (
                                        <Image src={'/cloud-eating.gif'} alt="Drag image" width={200} height={200} className="object-contain" unoptimized />
                                    ) : (
                                        <Image src={'/feed-cloud.png'} alt="Default image" width={200} height={200} className="object-contain" />
                                    )}
                                </label>
                            </div>
                        )}
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                    Submit
                </button>
            </form>


            {healthData && (
                <div className='max-w-sm'>
                    <h3>Health Data:</h3>
                    <pre>{JSON.stringify(healthData, () => { healthData.photo = "" }, 2)}</pre>
                </div>
            )}

        </>
    );
}

export default UploadImg;