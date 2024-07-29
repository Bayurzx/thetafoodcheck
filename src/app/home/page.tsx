'use client'
import MainPage from '@/components/main-page';
import Sidebar from '@/components/sidebar'
import OAuthLogin from '@/components/oauth-login'
import FormProfile from '@/components/form-profile'
import NotificationContainer from '@/components/notifications-container';
import { notifySuccess, notifyError } from '@/lib/utils/notifications';
import { useTheme } from '@/app/providers/theme'; // Assuming you have a theme provider
import { truncateTo256 } from '@/lib/fx/conversion';


let ypp = {
  "warnings": [
    "Contains sucrose, which may affect blood sugar levels. Monitor your blood sugar closely if you have diabetes.",
    "This product may contain allergens. Check the ingredients for nuts or other allergens you're sensitive to."
  ],
  "advice": [
    "If you experience any adverse reactions after consumption, discontinue use and consult a healthcare professional.",
    "Consider your total sugar intake for the day and how this product may fit into your diet."
  ],
  "suggestions": [
    "Drink plenty of water alongside sugary beverages to stay hydrated.",
    "Explore low-sugar or sugar-free alternatives if you're concerned about sugar intake."
  ],
  "recommendations": [
    "Consume this product within 2 days after opening to maintain freshness and safety.",
    "Store in a cool and dry place to preserve the quality of the ingredients.",
    "Consider adding a vitamin D supplement to address your deficiency."
  ],
  "food_facts": [
    "Contains vitamins A, B1, B2, B3, B5, B6, and C which are beneficial for overall health.",
    "Calcium content may support bone health.",
    "Best served chilled for optimal taste and refreshment."
  ]
}

const Home = () => {
  const { theme } = useTheme();

  return (
    <div className="w-full max-w-2xl px-4 py-8 ">
      {/* <Sidebar />
        <MainPage /> 
        <OAuthLogin /> */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Hello! This is a theme-responsive page.
        </p>
        <button onClick={() => notifySuccess('This is a success message!')}>Show Success</button>
        <button onClick={() => notifyError(`Error: ${truncateTo256(ypp)}`)}>Show Error</button>
        <NotificationContainer theme={theme} />

        {/* <FormProfile /> */}
      </div>

    </div>
  );
}

export default Home;