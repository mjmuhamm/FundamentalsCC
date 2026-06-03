import { Text, View } from "react-native";



const FlatListChild = ({ firstName, lastName, email }) => {
    return (
        <View style = {{marginTop: 20} }>
            <Text style = {{ marginBottom: 10}}>This is a deeply nested component</Text>
            <Text>{firstName}</Text>
            <Text>{lastName}</Text>
            <Text>{email}</Text>
        </View>
        
    )
}

export default FlatListChild; 