import { Button,  FlatList, Text, View  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect, useCallback, useMemo } from 'react';
import FlatListChild from '../components/FlatListChild';


const cacheData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        const user = await AsyncStorage.setItem("user1", jsonValue)
    } catch(error) {
        console.log("Error", error);
        
    }
}

function Screen1() {

    const [ users, setUsers ] = useState([])
    const [ index, setIndex ]  = useState([]) 

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("user1")
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (error) {
            console.log("Error reading data:", error);
            return "This is a default null value"
            
        }
    }
                
const cacheUserFunction = useCallback(() => {
        useEffect(() => {
        fetch('https://dummyjson.com/users')
        .then(res => res.json())
        .then(data => {
            setUsers(data.users);
        });
    }, [])
}, [])

const expensiveCalculation = useMemo(() => {
    return (5 * 100 * 1000 * 500 * 50000) * 50000
}, []);

cacheUserFunction()


    const navigation = useNavigation();

    return (
        <>
        <Button
            title="Go to Detail"
            onPress={() => {
                cacheData(users[1]);
                navigation.navigate('Detail', {
                    firstName: users[1].firstName,
                    lastName: users[1].lastName,
                    email: users[1].email,
                });
                
            }}/>

            <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
                <View style = {{ marginBottom : 20, marginTop : 10, marginStart : 10 }}>
                <Text>First Name: {item.firstName} </Text>
                <Text>Last Name: {item.lastName} </Text>
                <Text>Email: {item.email} </Text>

               <FlatListChild
               firstName={item.firstName}
               lastName={item.lastName}
               email={item.email}
               />

               <Text style = {{ marginTop: 15, marginBottom: 3 }}>This is the cached data</Text>
               <Text>{getData()}</Text>
                </View>
                
            )}/>
            
        
        </>
    );
    
}




export default Screen1;
