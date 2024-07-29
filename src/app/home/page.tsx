'use client'
import MainPage from '@/components/main-page';
import Sidebar from '@/components/sidebar'
import OAuthLogin from '@/components/oauth-login'
import FormProfile from '@/components/form-profile'
import NotificationContainer from '@/components/notifications-container';
import { notifySuccess, notifyError } from '@/lib/utils/notifications';
import { useTheme } from '@/app/providers/theme'; // Assuming you have a theme provider


const Home = () => {
  const { theme } = useTheme();

  return (
    <>
      <NotificationContainer theme={theme} />

      <div className="w-full max-w-3xl px-4 py-8 ">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <MainPage />

        </div>
      </div>
    </>
  );
}

export default Home;