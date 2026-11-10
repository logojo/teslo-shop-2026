import { DeliverAddress } from '@/app/components/sale/DeliverAddress'
import { Address } from '@/app/interfaces';
import { currencyFormat } from '@/app/utils';
import PayPalCheckout from './PayPalCheckout';
import { Order } from '@/generated/prisma/client';
import { OrderPaid } from './OrderPaid';


interface Props {
 order: Order
 deliverInfo: Address;
 totalProducts: number;
 subtotal: number;
 iva: number;
 total: number
}
export const DeliverInfo = ({ order, deliverInfo, totalProducts, subtotal, iva, total } : Props) => {
 
  return (
    <div>
         
        <DeliverAddress deliverInfo={deliverInfo} />
            
        <div className="w-full h-0.5 rounded bg-gray-100 my-10" />
    
        <div className="grid grid-cols-2">
            <span>No. Productos</span>
            <span className="text-right">{totalProducts} {totalProducts > 1 ? 'artículos' :  'artículo'}</span>

            <span>Subtotal</span>
            <span className="text-right">{ currencyFormat( subtotal ) }</span>

            <span>Impuestos (16%)</span>
            <span className="text-right">{ currencyFormat( iva ) }</span>

            <span className="text-2xl mt-5">Total</span>
            <span className="text-right mt-5 text-2xl"> {currencyFormat( total ) }</span>
        </div>
    
        <div className="mt-5 mb-2">
            {
                !order.isPaid
                ? <PayPalCheckout orderId={order.id}/>
                : <OrderPaid />
            }
           
        </div>
                  
        </div>
  )
}