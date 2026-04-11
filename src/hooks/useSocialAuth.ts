import { useSSO } from "@clerk/expo";
import { useState } from "react";
import { Alert } from "react-native";

const useSocialAuth = () => {
    const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null)
    const { startSSOFlow } = useSSO();

    const handleSocialAuth = async (strategy: 'oauth_google' |
        'oauth_github' | 'oauth_apple') => {

            if(loadingStrategy)return;
        setLoadingStrategy(strategy)
    
    try {
         const {createdSessionId, setActive}= await startSSOFlow({strategy})

         if(!createdSessionId || !setActive){
            Alert.alert("sign-in incomplete", "sign-in did not complete. please try again.");
            return
         }

         await setActive({session:createdSessionId})
    } catch (error) {
        console.log('error in social auth:',error);
        Alert.alert('error', "failed to sign in. Pleasse try again.");
    }finally{
        setLoadingStrategy(null)
    }
}
return{handleSocialAuth, loadingStrategy}
}

export default useSocialAuth;