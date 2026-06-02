import { Button,  FlatList, Text, View  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';



function Screen1() {

    const [ users, setUsers ] = useState([])

                
    useEffect(() => {
        fetch('https://dummyjson.com/users')
        .then(res => res.json())
        .then(data => {
            setUsers(data.users);
        });
    }, [])

    const navigation = useNavigation();

    return (
        <>
        <Button
            title="Go to Detail"
            onPress={() => {
                navigation.navigate('Detail');
            }}/>

            <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
                <View style = {{ marginBottom : 20, marginTop : 10, marginStart : 10 }}>
                <Text>First Name: {item.firstName} </Text>
                <Text>Last Name: {item.lastName} </Text>
                <Text>Email: {item.email} </Text>
                </View>
            )}/>
        
        </>
    );
    
}

export default Screen1;
