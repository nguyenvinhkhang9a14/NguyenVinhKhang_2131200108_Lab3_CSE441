import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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

type RootStackParamList = {
    ProductDetail: { productId: number };
};

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

const ProductDetail = () => {
    const [data, setData] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const route = useRoute<ProductDetailRouteProp>();
    const navigation = useNavigation();
    const filePath = `https://dummyjson.com/products/${route.params?.productId || 1}`;

    useEffect(() => {
        fetch(filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((d) => {
                setData(d);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [filePath]);

    const handleDelete = () => {
        Alert.alert(
            'Delete Product',
            'Are you sure you want to delete this product?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        // Handle delete logic here
                        navigation.goBack();
                    },
                },
            ]
        );
    };

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#00b4d8" />
            </SafeAreaView>
        );
    }

    if (!data) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Product not found</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                {/* Header */}
                <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Product Detail</Text>
                </View>

                {/* Product Image */}
                <View style={{ backgroundColor: '#f5f5f5', height: 300, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={{ uri: data.images[0] }}
                        style={{ width: '80%', height: '80%' }}
                        resizeMode="contain"
                    />
                </View>

                {/* Product Info */}
                <View style={{ padding: 16 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
                        Title: {data.title}
                    </Text>

                    <Text style={{ fontSize: 14, color: '#666', marginBottom: 16 }}>
                        Description: {data.description}
                    </Text>

                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>
                            Discount: {data.discountPercentage}%
                        </Text>
                    </View>

                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>
                            Rating: {data.rating} stars
                        </Text>
                    </View>

                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>
                            Stock: {data.stock} units
                        </Text>
                    </View>

                    <View style={{ marginBottom: 16 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>
                            Brand: {data.brand}
                        </Text>
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>
                            Category: {data.category}
                        </Text>
                    </View>

                    {/* Action Buttons */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#6c5ce7',
                                paddingVertical: 12,
                                paddingHorizontal: 30,
                                borderRadius: 6,
                                flex: 0.48
                            }}
                            onPress={handleDelete}
                        >
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                                Delete
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                backgroundColor: '#6c5ce7',
                                paddingVertical: 12,
                                paddingHorizontal: 30,
                                borderRadius: 6,
                                flex: 0.48
                            }}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            
        </SafeAreaView>
    );
};

export default ProductDetail;