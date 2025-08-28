import { formatCurrency } from "../../utils/helpers";
import Button from '../../ui/Button'
import { useDispatch, useSelector } from "react-redux";
import { addItem, getQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity=useSelector(getQuantityById(id))
  const isInCart=currentQuantity>0  
  const dispatch=useDispatch()
  function handleAddToCart(){
    const newItem={
      pizzaId:id,
      name,
      unitPrice:Number(unitPrice),
      quantity:1,
      totalPrice:unitPrice*1
    }
    dispatch(addItem(newItem))
  }
  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} className={`w-24 ${soldOut? ' opacity-75 grayscale':''}`} />
      <div className="flex flex-col flex-grow">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-stone-500 italic capitalize">{ingredients.join(", ")}</p>
        <div className="mt-auto flex  items-center justify-between ">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> 
          : 
          <p className=" text-sm text-stone-500 font-medium" >Sold out</p>}
          <div className="flex items-center gap-3 md:gap-8">
             
          {!soldOut && isInCart && <UpdateItemQuantity pizaaId={id} currentQuantity={currentQuantity}/> }
          {isInCart &&
              <DeleteItem pizzaId={id}/>}
            {!soldOut && !isInCart && <Button type={'small'} onClick={handleAddToCart}>Add to cart</Button>}
          </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
