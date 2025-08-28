import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './ui/Home'
import Menu , {menuLoader} from './features/menu/Menu'
import Cart from './features/cart/Cart'
import CreateOrder,{action as createOrderAction} from './features/order/CreateOrder'
import Order, { orderLoader } from './features/order/Order'
import { action as updateOrderAction } from "./features/order/UpdateOrder"
import AppLayOut from "./ui/AppLayOut"
import Error from './ui/Error'
const router= createBrowserRouter([
  {
    element:<AppLayOut/>,
    errorElement:<Error/>,
    children:[
        {
    path:'/',
    element:<Home/>
  },
  {
    path:'/menu',
    element:<Menu/>,
    loader: menuLoader,
    errorElement:<Error/>,

  },
  {
    path:'/cart',
    element:<Cart/>
  },
  {
    path:'/order/new',
    element:<CreateOrder/>,
    action:createOrderAction
  }
  ,
  {
    path:'/order/:orderId',
    element:<Order/>,
    loader:orderLoader,
    errorElement:<Error/>,
    action:updateOrderAction
  }

    ]
  }

])
function App() {
const x=23
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
