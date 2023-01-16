import Provider, { useMovie } from '@hooks';
import { NavigationContainer } from '@react-navigation/native';
import { HomeStack } from '@router';
import React from 'react';
import { ActivityIndicator, Modal, StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Color } from 'types';
function Main() {
  const { loading } = useMovie();
  return (
    <>
      <SafeAreaProvider>
        <StatusBar animated translucent showHideTransition="fade" hidden />
        <NavigationContainer>
          <HomeStack />
        </NavigationContainer>
      </SafeAreaProvider>
      <Modal animated animationType="slide" visible={loading} transparent>
        <View style={{ backgroundColor: Color.hitam1, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Color.blue1} />
        </View>
      </Modal>
    </>
  );
}

export default function App() {
  return (
    <Provider>
      <Main />
    </Provider>
  );
}


// import * as React from 'react';
// import { Button, View } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         onPress={() => navigation.navigate('Notifications')}
//         title="Go to notifications"
//       />
//     </View>
//   );
// }

// function NotificationsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button onPress={() => navigation.goBack()} title="Go back home" />
//     </View>
//   );
// }

// const Drawer = createDrawerNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen name="Home" component={HomeScreen} />
//         <Drawer.Screen name="Notifications" component={NotificationsScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }
