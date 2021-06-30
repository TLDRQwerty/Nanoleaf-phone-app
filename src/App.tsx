/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   Text,
   View,
 } from 'react-native';

 import tw from './tailwind'

 const App = () => {
   return (
     <SafeAreaView> 
       <StatusBar/>
       <ScrollView contentInsetAdjustmentBehavior="automatic">
         <View>
         <Text style={tw`text-pink-400`}>Hello world</Text>
         </View>
       </ScrollView>
     </SafeAreaView>
   );
 };

 export default App;
