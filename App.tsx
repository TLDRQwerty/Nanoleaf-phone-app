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
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';

 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';

 import tw from './lib/tailwind'

 const App = () => {
   return (
     <SafeAreaView> 
       <StatusBar/>
       <ScrollView contentInsetAdjustmentBehavior="automatic">
         <Header />
         <View>
         <Text style={tw`text-pink-400`}>Hello world</Text>
         </View>
       </ScrollView>
     </SafeAreaView>
   );
 };

 export default App;
