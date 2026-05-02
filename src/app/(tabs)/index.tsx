

import { useGroceryStore } from '@/store/grocery-store'
import { Show, useUser } from '@clerk/expo'
import { useClerk } from '@clerk/expo'
import { Link } from 'expo-router'
import { Text, View, Pressable, StyleSheet, ScrollView, FlatList } from 'react-native'
import TabScreenBackground from '@/components/list/TabScreenBackground'
import { ListHeroCard } from '@/components/list/ListHeroCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PendingItemCard } from '@/components/list/PendingItemCard'
import { CompletedItems } from '@/components/list/completedItems'

export default function ListScreen() {
  const { items } = useGroceryStore()
  const pendingItems = items.filter((item) => !item.purchased)

  return (

    <SafeAreaView className='flex-1'>

      <FlatList className='flex-1 bg-background'
        data={pendingItems}
        keyExtractor={item => item.id}
        renderItem={({item})=> <PendingItemCard item={item}/>}
        contentContainerStyle={{padding:20, gap:14}}
        contentInsetAdjustmentBehavior='automatic'

        ListHeaderComponent={
          <View style={{gap:14}}>
              <TabScreenBackground/>
              <ListHeroCard/>

              <View className='flex-row items-center justify-between px-1'>
                <Text className='text-sm font-semibold uppercase tracking-[1px] text-muted-foreground'>Shopping items</Text>
                <Text className='test-sm text-muted-foreground'>{pendingItems.length} active</Text>
              </View>
          </View>
        }
        ListFooterComponent={CompletedItems}
      />
    </SafeAreaView>
  )
}

