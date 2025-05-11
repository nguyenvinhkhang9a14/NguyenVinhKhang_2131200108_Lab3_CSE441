import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Product {
    id: number;
    images: string[];
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
}

const ProductSearch = () => {
    const [data, setData] = useState<Product[]>([]);
    const [value, setValue] = useState<string>('');
    const filePath = 'https://dummyjson.com/products';

    const searchProduct = () => {
        if (value !== '') {
            const searchPath = `https://dummyjson.com/products/search?q=${value}`;
            fetch(searchPath)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((d) => {
                    setData(d.products);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    };

const handleDetailPress = (productId: number) => {
     router.push({
      pathname: '/ProductDetail',
      params: { productId: productId.toString() }
    });
}
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {/* Header */}
            <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Search Products</Text>
            </View>

            {/* Search Input */}
            <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
                <TextInput
                    style={{
                        height: 40,
                        borderWidth: 1,
                        borderColor: '#ddd',
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        backgroundColor: '#f5f5f5'
                    }}
                    placeholder="iPhone"
                    value={value}
                    onChangeText={setValue}
                />
            </View>

            {/* Search Button */}
            <TouchableOpacity
                style={{
                    backgroundColor: '#00b4d8',
                    marginHorizontal: 16,
                    padding: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                    marginBottom: 16
                }}
                onPress={searchProduct}
            >
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>SEARCH</Text>
            </TouchableOpacity>

            {/* Product Detail Section */}
            <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Product Detail</Text>
            </View>

            {/* Product List */}
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{
                        marginHorizontal: 16,
                        marginBottom: 16,
                        borderWidth: 1,
                        borderColor: '#ddd',
                        borderRadius: 8,
                        overflow: 'hidden',
                        backgroundColor: 'white'
                    }}>
                        {/* Product Image */}
                        <Image
                            style={{ width: '100%', height: 200, backgroundColor: '#f0f0f0' }}
                            source={{ uri: item.images[0] }}
                            resizeMode="contain"
                        />

                        {/* Product Info */}
                        <View style={{ padding: 16 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
                                Title: {item.title}
                            </Text>
                            <Text style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>
                                Description: {item.description}
                            </Text>
                            <Text style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>
                                Price: ${item.price}
                            </Text>
                            <Text style={{ fontSize: 14, color: '#00a2e8', fontWeight: 'bold', marginBottom: 4 }}>
                                Discount: {item.discountPercentage}% off
                            </Text>
                            <Text style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>
                                Rating: {item.rating} stars
                            </Text>
                            <Text style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>
                                Stock: {item.stock} units
                            </Text>
                            <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
                                Brand: {item.brand}
                            </Text>
                            <Text style={{ fontSize: 14, color: '#666', marginBottom: 16 }}>
                                Category: {item.category}
                            </Text>

                            {/* Product Detail Button */}
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#f8f8f8',
                                    padding: 12,
                                    borderRadius: 8,
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: '#ddd'
                                }}
                                onPress={() => handleDetailPress(item.id)}
                            >
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Product Detail</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

         
            
        </SafeAreaView>
    );
};

export default ProductSearch;