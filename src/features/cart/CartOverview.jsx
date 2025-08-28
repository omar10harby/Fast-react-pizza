import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalQuantity=useSelector(getTotalCartQuantity)
  const totalPrice=useSelector(getTotalCartPrice)

  if(!totalQuantity)return null
  return (
    <div className="flex justify-between items-center bg-stone-800 text-stone-200 text-sm md:text-base uppercase py-4 px-4 sm:px-6 sm:py-6">
      <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6   ">
        <span>{totalQuantity}</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to={'/cart'}>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
