'use client'
import ProfileViewTwo from "@/components/profile-view-two";

const FormPage = () => {
  
  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-start min-h-screen min-w-80">
      <div className="w-full max-w-7xl">
        
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          {/* <HealthDataForm /> */}
          <ProfileViewTwo />
          </div>

      </div>
    </div>
  );
};

export default FormPage;
