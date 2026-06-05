import { Text, View } from 'react-native'


type InfoProps = {
    firstName : string,
    lastName: string,
    email: string
}
function Screen2({ route }) {

    const { firstName, lastName, email } = route.params
    return (
    <View style = {{ marginTop: 10, marginStart: 10 }}>
        <Text>FirstName: {firstName}</Text>
        <Text>LastName: {lastName}</Text>
        <Text>Email: {email}</Text>
    </View>
        )
}





export default Screen2;