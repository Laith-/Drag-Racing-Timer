import { KeyboardAvoidingView, ScrollView } from "react-native";

const DismissKeyboard = ({ backgroundColor = "#F5F4FF", children }) => {
    return <KeyboardAvoidingView behavior="height" style={{ flex: 1, paddingHorizontal: 10, backgroundColor: "black" }}>
        {children}
        
    </KeyboardAvoidingView>
}

export default DismissKeyboard;