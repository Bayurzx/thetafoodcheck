import MainPage from '@/components/main-page';
import Sidebar from '@/components/sidebar'
import OAuthLogin from '@/components/oauth-login'
import FormProfile from '@/components/form-profile'



const Form = () => {

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-start ">
      <div className="w-full max-w-2xl">
        {/* <Sidebar />
        <MainPage /> 
        <OAuthLogin /> */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Hello! This is a theme-responsive page.
          </p>
          <FormProfile />
        </div>

      </div>
    </div>
  );
}

export default Form;