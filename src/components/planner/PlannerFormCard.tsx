import { GroceryCategory, GroceryPriority, useGroceryStore } from "@/store/grocery-store";
import { useState } from "react"
import { Alert, Pressable, Text, TextInput, View } from "react-native"
import {FontAwesome6} from "@expo/vector-icons"
import { Icon } from "expo-router";


const categories: GroceryCategory[] = ["Produce", "Dairy", "Bakery", "pantry", "snacks"];
const priorities: GroceryPriority[] = ["low", "high", "medium"]

const categoryIcons={
    Produce:"leaf",
    Dairy:"cow",
    Bakery:"bread-slice",
    pantry:"box-open",
    snacks:"cookie-bite"
}

const PlannerFormCard = () => {
const {error, addItem}= useGroceryStore()

    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('1')
    const [category, setCategory] = useState<GroceryCategory>("Produce")
    const [priority, setPriority] = useState<GroceryPriority>("medium")

    const canCreate = name.trim().length>0
   const handleQuantityChange = (value: string) => {
    setQuantity(value.replace(/[^0-9]/g, ""))
}

    const createItem = async ()=>{
        await addItem({
            name:name.trim(),
            category,
            priority,
            quantity: Number(quantity)
        })
Alert.alert("success:", "item created")

        setName("")
        setQuantity("1")
        setCategory("Produce")
        setPriority("medium")
    }
   
    return (
        <View className="rounded-3xl border border-border bg-card p-4">
          <Text className="text-sm font-semibold text-foreground">Item name</Text>

          <View className="mt-2 flex-row items-center rounded-2xl border border-border bg-muted px-4 ">
            <FontAwesome6 name="bag-shopping" size={13} color="#5b7567"/>

            <TextInput value={name} className="ml-3 text-base text-foreground"
            onChangeText={setName}
            placeholder="Ex: Blueberries"
            placeholderTextColor="#8aa397"

            />

            {/* quantity */}
          </View>
          <Text className="text-sm font-semibold text-foreground">Item name</Text>

          <View className="mt-2 flex-row items-center rounded-2xl border border-border bg-muted px-4 ">
            <FontAwesome6 name="bag-shopping" size={13} color="#5b7567"/>


            <TextInput
                value={quantity}
                onChangeText={handleQuantityChange}
                keyboardType="number-pad"
                placeholder="1"
                placeholderTextColor="#8aa397"
                className="ml-3 flex-1 text-base text-foreground"
            />

          </View>
            {/* quantity */}
            <Text className="mt-4 text-sm font-semibold text-foreground">Category</Text>
            <View className="mt-2 flex-row flex-wrap gap-2">
                {categories.map((option)=>{
                    const active= option ===category
                    return(
                        <Pressable key={option} className={`flex-row items-center rounded-full px-4 py-2 ${
                            active ? "bg-primary": "bg-secondary"
                        }`}
                        onPress={()=>setCategory(option)}>

                            <FontAwesome6 name={categoryIcons[option]}
                            size={12}
                            color={active?"#fff" : "#486856"}/>

                            <Text className={`ml-2 text-sm font-semibold ${
                                active ? "text-primary-foreground" : "text-secondary-foreground"
                            }`}>
                                {option}
                            </Text>
                        
                        </Pressable>
                    )
                })}

            </View>

            <Text className="mt-4 text-sm font-semibold text-foreground">Priority</Text>
            <View className="mt-2 flex-row gap-2">
                {priorities.map((option)=>{
                    const active= option===priority
                    const icon = option ==="high" ? "bolt" : option==="medium" ? "compass" : "seedling"
                    return(
                        <Pressable  className={`flex-1 flex-row items-center justify-center gap-2 rounded-2xl py-2 ${active ?"bg-primary" : "bg-secondary"}`}
                        key={option}
                        onPress={()=> setPriority(option)}>
                            <FontAwesome6 name={icon} size={12} color={active ? "#ffffff" : "#486856"}/>
                            <Text className={`mt-1 text-sm font-semibold capitalize tracking-[0.1] ${
                                active ? "text-primary-foreground" : "text-secondary-foreground"
                            }`}>
                                {option}
                            </Text>
                        </Pressable>
                    )
                })}
                
            </View>

            <Pressable className={`mt-5 flex-row items-center justify-center rounded-full py-3 ${
                canCreate ? "bg-primary" : "bg-muted"
            }`}
            onPress={createItem}
            disabled={!canCreate}>
                <FontAwesome6 name="plus" size={14} color={canCreate ? "#ffffff" :"#7a9386"}/>
                <Text className={`ml-2 text-base font-semibold ${canCreate ? "text-primary-foreground" : "text-muted-foreground"}`}>Add to Grocery List</Text>
            </Pressable>

            {
                true?(
                    <View className="mt-3 border  border-destructive bg-destructive px-3 rounded-2xl py-2">
                        <Text className="text-sm text-white text-center uppercase">{"error"}</Text>
                    </View>
                ):null
            }
        </View>
    )
}

export default PlannerFormCard