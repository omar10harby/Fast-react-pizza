import React from 'react'
import Button from '../../ui/Button'
import { useDispatch } from 'react-redux'
import { increaseItemQuantity,decreaseItemQuantity } from './cartSlice'
function UpdateItemQuantity({pizaaId,currentQuantity}) {
  const dispatch=useDispatch()
  return (
    <div className='flex items-center gap-2 md:gap-3'>
        <Button type={'small'} onClick={()=>dispatch(decreaseItemQuantity(pizaaId))}>-</Button>
        <span>{currentQuantity}</span>
        <Button type={'small'} onClick={()=>dispatch(increaseItemQuantity(pizaaId))}>+</Button>
    </div>
  )
}

export default UpdateItemQuantity
