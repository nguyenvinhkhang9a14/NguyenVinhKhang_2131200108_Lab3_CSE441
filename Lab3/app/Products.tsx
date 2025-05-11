import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Định nghĩa interface cho đối tượng product đầy đủ hơn
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

const Products = () => {
  const [data, setData] = useState<Product[]>([]);
  const filePath = 'https://dummyjson.com/products/';

  useEffect(() => {
    fetch(filePath)
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
  }, []);

    const handleDetailPress = (productId: number) => {
     router.push({
      pathname: '/ProductDetail',
      params: { productId: productId.toString() }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 ,  backgroundColor: 'white',}}>
      <Text style={{ fontSize: 24, padding: 16 }}>Danh sách sản phẩm</Text>
      <FlatList
        scrollEnabled={true}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <View style={{ 
            padding: 16, 
            borderBottomWidth: 1, 
            borderBottomColor: '#eee',
            flexDirection: 'row', // Sắp xếp theo hàng ngang
            alignItems: 'flex-start',
            marginBottom: 10,
           backgroundColor:'#f9f9f9',
            width:'90%',
             alignSelf: 'center'
            
          }}>
            {/* Cột 1: Hình ảnh */}
            <Image 
              style={{ width: 80, height: 80, marginBottom:160 }}
              source={{ uri: item.images[0] }} 
            />
            
            {/* Cột 2: Thông tin sản phẩm */}
            <View style={{ 
              flex: 1, 
              marginLeft: 12,
              justifyContent: 'center'
            }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                Title: {item.title}
              </Text>
              <Text style={{ marginTop: 4, color: '#666' }} numberOfLines={2}>
                Description: {item.description}
              </Text>
              <Text style={{ marginTop: 4, color: '#666' }}>
                Price: ${item.price}
              </Text>
              <Text style={{ color: '#00a2e8', fontWeight: 'bold', marginTop: 4 }}>
                Discount: {item.discountPercentage}% off
              </Text>
              <Text style={{ marginTop: 4, color: '#666' }}>
                Rating: {item.rating}
              </Text>
              <Text style={{ marginTop: 4, color: '#666' }}>
                Stock: {item.stock}
              </Text>
              <Text style={{ marginTop: 4, color: '#666' }}>
                Brand: {item.brand}
              </Text>
              <Text style={{ marginTop: 4, color: '#666' }}>
                Category: {item.category}
              </Text>
              
              {/* Thêm View để chứa 3 nút nằm ngang */}
              <View style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'flex-start'
              }}>
                <TouchableOpacity style={{
                  backgroundColor: '#00b4d8',
                  padding: 8,
                  borderRadius: 4,
                  marginRight: 6,
                  width: 60,
                  alignItems: 'center'
                }}
                onPress={() => handleDetailPress(item.id)}
                >
                  <Text style={{ color: 'white', fontSize: 12 }}>DETAIL</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={{
                  backgroundColor: '#00b4d8',
                  padding: 8,
                  borderRadius: 4,
                  marginRight: 6,
                  width: 60,
                  alignItems: 'center'
                }}>
                  <Text style={{ color: 'white', fontSize: 12 }}>ADD</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={{
                  backgroundColor: '#00b4d8',
                  padding: 8,
                  borderRadius: 4,
                  width: 60,
                  alignItems: 'center'
                }}>
                  <Text style={{ color: 'white', fontSize: 12 }}>DELETE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Products;