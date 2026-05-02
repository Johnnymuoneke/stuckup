import { useGroceryStore } from "@/store/grocery-store"
import { count } from "drizzle-orm";
import { Text, View } from "react-native"

const categoryColors: Record<string, string> = {
    Produce: '#74c49a',
    Dairy: '#8ec5ff',
    Bakery: '#f3bc84',
    Pantry: '#b69cff',
    Snacks: '#f3a1db'
}

const InsightsCategorySection = () => {
    const { items } = useGroceryStore();
    const total = items.length

    const categories = items.reduce<Record<string, number>>((acc, item) => {
        acc[item.category] = (acc[item.category] ?? 0) + 1
        return acc
    }, {})

    const categoryEntries = Object.entries(categories).sort((a, b) => b[1] - a[1])
    return (
        <View className="rounded-3xl border border-border bg-card p-4">
            <View className="flex-row items-center justify-between ">
                <Text className="text-sm font-semibold text-foreground">Items by category</Text>
                <Text className="text-xs uppercase tracking-[1px] text-muted-foreground">{categoryEntries.length} groups</Text>
            </View>

            {categoryEntries.map(([category, count]) => {
                const widthPercent = total ? Math.max(10, Math.round((count / total) * 100)) : 10;
                return (
                    <View key={category} className="mt-3">
                        <View className="mb-1 flex-row items-center justify-between">
                            <Text className="text-sm font-medium text-foreground">{category}</Text>
                            <Text className="text-sm text-muted-foreground">{count}</Text>
                        </View>
                        <View>
                            <View className="h-2 rounded-full"
                            style={{
                                width:`${widthPercent}%` as `${number}%`,
                                backgroundColor:categoryColors[category]??"#8aa397"
                            }}
                            >
                                
                            </View>
                        </View>
                    </View>

                )
            })}
            
            {categoryEntries.length ===0 ?(
                <View>
                    <Text>Add items to reveal your categort mix</Text>
                </View>
            ):null}
        </View>
    )
}
export default InsightsCategorySection