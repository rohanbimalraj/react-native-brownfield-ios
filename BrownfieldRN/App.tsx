import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import { store, AppDispatch } from './src/store/store';
import { setUser, User } from './src/store/userSlice';

function AppContent(props: User) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setUser({
      name: props.name ?? '',
      email: props.email ?? '',
      role: props.role ?? '',
      token: props.token ?? '',
    }));
  }, []);

  return (
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  );
}

export default function App(props: User) {
  return (
    <Provider store={store}>
      <AppContent {...props} />
    </Provider>
  );
}
