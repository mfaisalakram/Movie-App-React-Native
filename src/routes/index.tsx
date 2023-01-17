import { Booking, Detail, Home } from '@screen';
import React from 'react';
import Animated from 'react-native-reanimated';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './drawer-content';
import Setting from 'screen/Setting';
import Search from 'screen/Search';
import About from 'screen/About/About';
import Privacy from 'screen/Privacy/Privacy';
import PersonDetail from 'screen/PersonDetail/PersonDetail';
import TvShows from 'screen/TvShows/TvShows';
import Theaters from 'screen/Theaters/Theaters';
import Favorites from 'screen/Favorites/Favorites';

const Screen = createSharedElementStackNavigator<StackHome>();

export function springyFadeIn() {
  const transitionSpec = {
    timing: Animated.spring,
    tension: 10,
    useNativeDriver: true,
  };

  return {
    transitionSpec,
    screenInterpolator: ({ position, scene }: any) => {
      const { index } = scene;

      const opacity = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [0, 1],
      });

      return { opacity };
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  },
};

export const HomeStack = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          width: 300,
        },
        headerTintColor: '#000',
        headerShown: false,
      }}
      drawerContent={() => <DrawerContent />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen
        name="Detail"
        component={Detail}
        options={{ headerShown: false, unmountOnBlur: true }}
      />

      <Drawer.Screen name="Setting" component={Setting} options={{ unmountOnBlur: true }} />
      <Drawer.Screen name="Search" component={Search} options={{ unmountOnBlur: true }} />

      <Drawer.Screen name="About" component={About} options={{ unmountOnBlur: true }} />
      <Drawer.Screen name="Privacy" component={Privacy} options={{ unmountOnBlur: true }} />
      <Drawer.Screen name="PersonDetail" component={PersonDetail} options={{ unmountOnBlur: true }} />
      <Drawer.Screen name="TvShows" component={TvShows} options={{ unmountOnBlur: true }} />
      <Drawer.Screen name="Theaters" component={Theaters} options={{ unmountOnBlur: true }} />
      <Drawer.Screen name="Favorites" component={Favorites} options={{ unmountOnBlur: true }} />
    </Drawer.Navigator>
  );
};
