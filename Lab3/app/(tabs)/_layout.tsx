import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    
      <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
         <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
        <Tabs.Screen
          name="Add"
          options={{
            title: 'Add Product',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="plus" color={color} />,
          }}
        />
        <Tabs.Screen
          name="ProductDetail"
          options={{
            title: 'Detail',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="money" color={color} />,
          }}
        />
        <Tabs.Screen
          name="Product_Search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="minus" color={color} />,
          }}
        />
      </Tabs>

  );
}
