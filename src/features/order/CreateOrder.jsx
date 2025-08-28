import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  getTotalCartPrice,
  getTotalCartQuantity,
} from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../users/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority === true ? (totalCartPrice * 20) / 100 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const cart = useSelector((state) => state.cart.cart);
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-4/5 sm:w-2/4   px-5 py-6 md:px-8 md:py-8 border-2 border-gray-200 shadow-sm rounded-md">
        <h2 className=" font-semibold mb-2 text-center text-xl">
          Ready to order? Let's go!
        </h2>
        {/* <button onClick={() => dispatch(fetchAddress())}>Get a postion</button> */}
        <Form method="POST">
          <div className="flex flex-col">
            <label>First Name</label>
            <input
              type="text"
              name="customer"
              defaultValue={username}
              className="border border-gray-200 rounded outline-none px-2 py-1 mb-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label>Phone number</label>
            <input
              type="tel"
              name="phone"
              className="border border-gray-200 rounded outline-none px-2 py-1 mb-2"
              required
            />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label>Address</label>

            <div className="relative">
              <input
                type="text"
                name="address"
                className="w-full border border-gray-200 rounded outline-none px-2 py-1 mb-2"
                placeholder="Enter your address"
                disabled={isLoadingAddress}
                defaultValue={address}
                required
              />

              {!address && (
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => dispatch(fetchAddress())}
                >
                  📍
                </span>
              )}
            </div>
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1 mb-2 ">
            <input
              className=" accent-yellow-400 h-4 w-4 mr-1"
              type="checkbox"
              name="priority"
              id="priority"
              value={withPriority}
              onChange={(e) => setWithPriority(e.target.checked)}
            />
            <label htmlFor="priority" className="">
              Want to yo give your order priority?
            </label>
          </div>

          <div>
            <input type="hidden" name="cart" value={JSON.stringify(cart)} />
            <input
              type="hidden"
              name="position"
              value={
                position.longitude && position.latitude
                  ? `${position.latitude},${position.longitude}`
                  : ""
              }
            />
            <Button disabled={isSubmitting || isLoadingAddress} type="primary">
              {isSubmitting
                ? "Placing order .... "
                : `Order now for ${formatCurrency(totalPrice)}`}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const date = Object.fromEntries(formData);
  
  const order = {
    ...date,
    cart: JSON.parse(date.cart),
    priority: date.priority === "true",
  };
  const errors = {};
  if (!isValidPhone(order.phone)) errors.phone = "please enter a right number";
  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
