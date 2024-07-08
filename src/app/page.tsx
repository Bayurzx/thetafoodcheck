import MainPage from '@/components/main-page';
import Sidebar from '@/components/sidebar'
import { NavbarV0 } from '@/components/component/navbarV0';

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <NavbarV0 />
      <div className="flex flex-grow">
        <Sidebar />
        <MainPage />
      </div>
    </div>
  );
}
