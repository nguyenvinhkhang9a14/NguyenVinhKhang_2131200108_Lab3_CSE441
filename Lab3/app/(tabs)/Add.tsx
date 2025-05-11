import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  KeyboardTypeOptions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "../(hiden)/AddStyles";

function AddFrame() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [rating, setRating] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState('');

  const handleSubmit = () => {
    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        description: description,
        price: price,
        discountPercentage: discountPercentage,
        rating: rating,
        stock: stock,
        brand: brand,
        category: category,
        images: images,
      }),
    })
      .then((res) => res.json())
      .then(console.log)
      .catch(error => {
        console.error('Error adding product:', error);
      });
    Alert.alert("Add sucessful!");
  };

  const renderTextInput = (label: string, value: string, setValue: (text: string) => void, placeholder: string, keyboardType: KeyboardTypeOptions = 'default') => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        keyboardType={keyboardType}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Add a Product</Text>
          </View>
          
          {renderTextInput('Title', title, setTitle, 'Enter title')}
          {renderTextInput('Description', description, setDescription, 'Enter description')}
          {renderTextInput('Price', price, setPrice, 'Enter price', 'decimal-pad')}
          {renderTextInput('Discount Percentage', discountPercentage, setDiscountPercentage, 'Enter discount percentage', 'decimal-pad')}
          {renderTextInput('Rating', rating, setRating, 'Enter rating', 'decimal-pad')}
          {renderTextInput('Stock', stock, setStock, 'Enter stock', 'number-pad')}
          {renderTextInput('Brand', brand, setBrand, 'Enter brand')}
          {renderTextInput('Category', category, setCategory, 'Enter category')}
          {renderTextInput('Images', images, setImages, 'Enter images URL(s)')}
          
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>SUBMIT</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Detail</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default AddFrame;