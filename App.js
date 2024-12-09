import MainContainer from './navigation/MainContainer';
// import LoginScreen from './screens/AccountScreen/screens/LoginScreen';


import { useEffect, useState } from 'react';
import { initDB } from './util/Database';
import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();
export default function App() {
  // state to keep track of whether we're in DB init stage so we can display the splash screen during that time.
  const [dbInitialized, setDbInitialized] = useState(false);

  // SQLite initialization whenever the app is launched.
  useEffect(() => {
    async function init() {
      try {
        await initDB();
        setDbInitialized(true); // Database initialized successfully.
      } catch (err) {
        console.log(err);
      }
    }

    init();
  }, []);

  // show the splash screen until we complete DB initialization.
  if (!dbInitialized) {
    return null; // return null to display the splash screen.
  } else {
    // hide the splash screen.
    SplashScreen.hideAsync();
  }

  return <MainContainer />;
}
