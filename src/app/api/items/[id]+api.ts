import { deleteGroceryItem , setGroceryItempurchased, updateGroceryItemQuantity} from "@/lib/server/db-action";

export async function DELETE(request: Request, {id}:{id:string}){
    try {
        await deleteGroceryItem(id)
        return Response.json({okay:true})
    } catch (error) {
        const message = error instanceof Error ? error.message:"Failed to delete item",
        return Response.json({error:message}, {status:500})
    }
}

export async function PATCH(request:Request, {id}:{id:string}){
    try{
        const body = await request.json()
 
    const item=body.quantity
    ? await updateGroceryItemQuantity(id, body.quantity)
    : await setGroceryItempurchased(id, body.purchased ?? true)

    if(!item) return Response.json({error:"item not found."},{status:404})
        return Response.json({item})
    } catch(error){
        const message = error instanceof Error ? error.message :'failed to update item';
        return Response.json({error:message}, {status:500})
    }
}