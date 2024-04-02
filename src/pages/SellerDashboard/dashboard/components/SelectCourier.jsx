import React, { useState } from 'react'
import Swal from 'sweetalert2';
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,   
  } from "@material-tailwind/react";
import { CourierList } from './couriers/CourierList';
import { SearchBar } from './SearchBar';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

function SelectCourier() {
  const [search, setSearch] = useState();
  const [data, setData] = useState([]);
 const {id} = useParams()
 useEffect(() => {
  axios.get(`https://localhost:7144/api/Order/farmer/details/${id}`)
      .then((response) => {
          setData(response.data[0]);
          console.log(response.data[0])
      })
      .catch((error) => {
          console.error('Error fetching appointments:', error);
      });


}, []); 
  return (
    <>
  <div className='grid grid-cols-2 gap-4'>
  <div className="col-span-1 flex">
    <Card className="mt-6 w-full border border-gray-200 rounded-lg overflow-hidden flex-1">
      <CardBody className="p-6">
        <Typography variant="h5" color="blue-gray" className="mb-4 font-bold text-xl">
          Order Details
        </Typography>

        <div className="mb-4">
          <div className="flex items-center mb-3">
            <p className="text-gray-600 mr-2">Order Item:</p>
            <p className="text-lg font-semibold">{data.productTitle}</p>
          </div>

          <div className="flex items-center mb-3">
            <p className="text-gray-600 mr-2">Quantity:</p>
            <p className="text-lg font-semibold">{data.totalQuantity}</p>
          </div>

          <div className="flex items-center mb-3">
            <p className="text-gray-600 mr-2">Sub Total:</p>
            <p className="text-lg font-semibold">{data.totalPrice}</p>
          </div>

          {/* <div className="flex items-center">
            <p className="text-gray-600 mr-2">Delivery Fee:</p>
            <p className="text-lg font-semibold">Rs.350.00</p>
          </div> */}
        </div>
      </CardBody>
    </Card>
  </div>

  <div className="col-span-1 flex">
    <Card className="mt-6 w-full border border-gray-200 rounded-lg overflow-hidden flex-1">
      <CardBody className="p-6">
        <Typography variant="h5" color="blue-gray" className="mb-2 font-bold text-xl">
          Customer Details
        </Typography>

        <div className="mb-4">
          <Typography className="font-bold mb-2">
            Customer Name:
          </Typography>
          <p>{data.customerFName +"  "+data.customerLName}</p>
         </div>

        <div className="mb-4">
          <Typography className="font-bold mb-2">
            Delivery Address:
          </Typography>
          <address className="text-gray-700">
           <p>{data.customerAddL1}</p>
           <p>{data.customerAddL2}</p>
           <p>{data.customerAddL3}</p>
          </address>
        </div>
      </CardBody>
    </Card>
  </div>
</div>

<div className='mt-10'>
  <SearchBar setSearch={setSearch}/>
</div>
<div class="mt-10 overflow-y-auto max-h-screen">
  <CourierList search={search} orderId={data.orderID}/>
</div>



  </> 
    
    
  )
}

export default SelectCourier
