import 'react-native-gesture-handler';
import * as React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/components/MainStack';
import store from './store';
import CreateSpaceOwnerProfile from './src/screens/SpaceOwner/CreateSpaceOwnerProfile';
import MyListings from './src/screens/SpaceOwner/MyListings';
import AddListingLocation from './src/screens/SpaceOwner/AddListingLocation';
import AddListingSpaceDetails from './src/screens/SpaceOwner/AddListingSpaceDetails';
import CustomSchedule from './src/screens/SpaceOwner/CustomSchedule';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <MainStack /> */}
        {/* <CreateSpaceOwnerProfile /> */}
        {/* <MyListings /> */}
        {/* <AddListingLocation /> */}
        <AddListingSpaceDetails />
        {/* <CustomSchedule /> */}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
