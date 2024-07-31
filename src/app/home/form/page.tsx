import HealthDataForm from "@/components/health-data-form";

const FormPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-start  min-w-80">
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <HealthDataForm />
        </div>

      </div>
    </div>
  );
};

export default FormPage;
