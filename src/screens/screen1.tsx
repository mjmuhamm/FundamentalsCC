import { Button,  FlatList, Text, View  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import FlatListChild from '../components/FlatListChild';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    const [ state, setState ] = useState(10)

    let ref = useRef(10)


    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("@user1")
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
        console.log("user function ran");
        
    }, [])
}, [users])

const expensiveCalculation = useMemo(() => {
    return (5 * 100 * 1000 * 500 * 50000) * 50000
}, []);

const userFilter = useMemo(() => {
    return users.filter(it => it.age < "29") 
}, [users]);

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
            
            <Button
            title={`Update State: ${state}`}
            onPress={() => {
                setState(state+1)
                ref.current = ref.current + 1
            }}/>
            <Text>This is a ref: {ref.current}</Text>
            <Text>This is the length of the users under age 29: {userFilter.length}</Text>
            <Text>This is the expensive calculation {expensiveCalculation}</Text>

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
