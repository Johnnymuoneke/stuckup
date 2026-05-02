import { useGroceryStore } from "@/store/grocery-store";
import { Pressable, Text, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons"

export function CompletedItems() {
    const { removeItem, togglepurchased, items } = useGroceryStore();
    const completedItem = items.filter((item) => item.purchased);
    if (!completedItem) return null;



    return (
        <View className="mt-3 rounded-3xl border-border border bg-secondary p-4">
            <Text className="text-sm font-semibold uppercase tracking-[1px] text-secondary-foreground">
                Completed items</Text>
            {completedItem.map(item => (
                <View key={item.id} className="mt-3 flex-row items-center justify-between rounded-2xl border border-border bg-card px-3 py-2">
                    <View className="flex-row items-center gap-2">
                        <Pressable onPress={async ()=>{
                            await togglepurchased(item.id)
                        }}
                            className="h-6 w-6 items-center justify-center rounded-full bg-success"
                        >
                            <FontAwesome6 name="check" size={12} color="#ffffff" />
                        </Pressable>

                        <Text className="text-base text-muted-foreground line-through">{item.name}</Text>
                    </View>

                    <Pressable onPress={async()=>{
                        await removeItem(item.id)
                    }}
                    className="h-8 w-8 items-center justify-center rounded-full bg-destructive">
                        <FontAwesome6 name="trash" size={12} color="#d45f58"/>
                    </Pressable>
                </View>
            ))}
        </View>
    )
}
