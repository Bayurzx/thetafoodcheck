'use client'
import MainPage from '@/components/main-page';
import { useTheme } from '@/app/providers/theme'; 

const Home = () => {
  const { theme } = useTheme();

  return (
    <>
      <div className="w-full max-w-3xl px-4 py-8 ">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <MainPage />
        </div>
      </div>
    </>
  );
}

export default Home;