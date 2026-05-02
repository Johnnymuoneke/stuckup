import { GroceryItem, useGroceryStore } from "@/store/grocery-store";
import { Pressable, Text, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons"

const priortyPillingBg = {
    low: 'bg-priority-low',
    medium: "bg-priority-medium",
    high: "bg-priority-high"
}

const priorityPillingText = {
    low: 'text-priority-low-foreground',
    medium: 'text-priority-medium-foreground',
    high: "text-priority-high-foreground"
};
export function PendingItemCard({ item }: { item: GroceryItem }) {
    const { removeItem, updateQuantity, togglepurchased, loadItems } = useGroceryStore()


    return (
        <View className="rounded-3xl border-border bg-card p-4">
            <View className="flex-row items-start gap-3">
                <Pressable className="mt-1 size-6 items-center justify-center rounded-full border-2 border-border bg-card"
                    onPress={() => togglepurchased(item.id)} >
                </Pressable>

                <View className="flex-1">
                    <View className="flex-row text-center justify-between gap-2">
                        <Text className="flex-1 text-lg font-semibold text-card-foreground">{item.name}</Text>
                        <View className={`rounded-full px-3 py-1 ${priortyPillingBg[item.priority]}`}>
                            <Text className={`text-xs font-bold uppercase ${priorityPillingText[item.priority]}`}>{item.priority}</Text>
                        </View>
                    </View>

                    <View className="mt-2 flex-row items-center gap-2">
                        <View className="rounded-full bg-secondary-foreground px-3 py-1">
                            <Text className="text-xs font-semibold text-secondary">{item.category}</Text>
                        </View>
                    </View>

                    <View className="mt-3 flex-row items-center gap-2">
                        <Pressable onPress={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="size-8 items-center justify-center rounded-xl border border-input bg-muted">
                            <FontAwesome6 name="minus" size={12} color="#3b5a4a" />
                        </Pressable>

                        <Text className="min-w-9 text-center text-base font-semibold text-foreground">{item.quantity}</Text>

                        <Pressable onPress={() => updateQuantity(item.id, Math.max(1, item.quantity + 1))}
                        className="size-8 items-center justify-center rounded-xl border border-input bg-muted">
                            <FontAwesome6 name="plus" size={12} color="#3b5a4a" />
                        </Pressable>
                    </View>

                </View>

                <Pressable className="h-8 w-8 items-center rounded-full bg-destructive justify-center"
                onPress={()=>removeItem(item.id)}
                >
                    <FontAwesome6 name="trash" size={13} color="#d45f58"/>
                </Pressable>

            </View>
        </View>
    )
}