import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View, TextInput, Button, FlatList, Image } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [recipe, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = () =>{
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
      .then(response => {
        if(!response.ok) 
          throw new Error('Error in fetch: ' + response.statusText);
        return response.json();
      })
      .then(data =>  { 
        setRecipes(data.meals);
        setKeyword('');
        setLoading(false);
      })
      .catch(err => console.err(err))
      
  }
  if(loading) {
    return(
    <View style={styles.container}> 
    <ActivityIndicator size="large" color="#00ff00" />
     </View>
    );
  } else {
  return (
    <View style={styles.container}>
      <View style = {{flex:1}}>
        <TextInput placeholder='Type keyword'
        value={keyword}
        onChangeText={text => setKeyword(text)}
     />
     <Button title="Find" onPress={fetchRecipes} />
      </View>
      <View style = {{flex:6}}> 
        <FlatList 
        data={recipe}
        renderItem={
          ({item}) => 
          <View  style={{marginLeft:10, marginBottom:15}}>
            <Text>{item.strMeal}</Text>
            <Image
        style={{ width: 200, height: 200 }}
        source={{ uri: item.strMealThumb }}
      />
          </View>
          }
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    marginTop:150,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
