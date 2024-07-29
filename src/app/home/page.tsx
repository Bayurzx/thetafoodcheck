'use client'
import MainPage from '@/components/main-page';
import Sidebar from '@/components/sidebar'
import OAuthLogin from '@/components/oauth-login'
import FormProfile from '@/components/form-profile'
import NotificationContainer from '@/components/notifications-container';
import { notifySuccess, notifyError } from '@/lib/utils/notifications';
import { useTheme } from '@/app/providers/theme'; // Assuming you have a theme provider
import { truncateTo256 } from '@/lib/fx/conversion';


const Home = () => {
  const { theme } = useTheme();

  return (
    <>
      <NotificationContainer theme={theme} />

      <div className="w-full max-w-2xl px-4 py-8 ">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Hello! This is a theme-responsive page.
          </p>

        </div>
      </div>
    </>
  );
}

export default Home;