import React, { useEffect, useState } from 'react';
import { Rating } from "@material-tailwind/react";
import { MdPhotoCamera } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import FileSelect from './FileSelect';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ReviewForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const client = axios.create({
    baseURL: "https://localhost:7144/api/Product/" + id
  });

  const addClient = axios.create({
    baseURL: "https://localhost:7144/api/Review"
  })

  const DefaultRating = () => {
    return <Rating value={4} />;
  };

  const [product, setProduct] = useState();

  const [reviewData, setReviewData] = useState({
    SellerRating: "",
    DeliverRating: "",
    ProductRating: "",
    Comment: "",
    ReviewImageUrl: "",
  })

  useEffect(() => {
    client.get().then((response) => {
      console.log(response);
      setProduct(response.data)
    })
  }, [])

  const handleAddReview = async () => {
    addClient.post('', reviewData).then((res) => {
      if (res.status === 200) {
        console.log("Success!", res);
        navigate('/buyers/my-reviews')
      } 
    })
  }

  return (
    <>
      <div>
        {product ? <div className='bg-white px-8 py-5 rounded-lg my-2 pb-1'>
          <div className='mb-5'>
            <h1 className='my-2'>{product && product.productType}</h1>
            <p>Purchase date {product && product.dateCreated.split("T")[0]}</p>
          </div>
          <div className='flex w-full gap-4 items-end'>
            <img src="https://tse1.mm.bing.net/th?id=OIP.bprm9Awwe2tzYwo80PtKIwHaE6&pid=Api&P=0&h=220"
              alt="" className='w-[160px] h-[120px]' />

            <div className='w-full px-3'>
              <h1 className='font-semibold text-gray-800 text-lg my-3'>{product && product.productTitle} - {product && product.availableStock}Kg</h1>
              <p className='text-blue-gray-500'>
                {product.productDescription}
              </p>
            </div>
          </div>

          <div className='flex gap-20 my-8'>
            <h1>Product rating</h1>
            <div className='pr-4'>
              <Rating value={4} onChange={(value) => {
                setReviewData((prev) => ({ ...prev, ProductRating: value }))
              }} />
            </div>
          </div>

        </div> : "Loading..."}
      </div>

      <div className='bg-white  rounded-lg py-5  '>
        <div className='flex gap-20  px-8'>
          <h1>Seller Service</h1>
          <Rating value={4} onChange={(value) => {
            setReviewData((prev) => ({ ...prev, SellerRating: value }))
          }} />
        </div>
        <div className='flex gap-16 px-8 pt-3'>
          <h1>Delivery Service</h1>
          <Rating value={4} onChange={(value) => {
            setReviewData((prev) => ({ ...prev, DeliverRating: value }))
          }} />
        </div>
      </div>
      <div className='bg-white rounded-lg my-2 py-5 '>
        <h1 className='px-8'>Add Photos</h1>
        <FileSelect />
      </div>

      <div className='bg-[#ffff] rounded-lg'>
        <div className='flex mx-6 py-5 pt-5 '>
          <div>
            <h1>Add Written Review</h1>
          </div>
          <div className='ml-auto opacity-60'>
            <h1>0/500</h1>
          </div>
        </div>
        <div className='text-center ' >
          <input type='text' placeholder='How’s the Quality of the product?' className='w-[600px] h-12 bg-[#F7FFF1] rounded-lg text-center' onChange={(e) => {
            setReviewData((prev) => ({...prev, Comment: e.target.value}))
          }}></input>
        </div>
        <div className='pt-5'>

        </div>
      </div>

      <div className='bg-white text-center  my-2 rounded-lg pt-6 pb-4'>
        <div>
          <button type='submit' className='bg-[#44BD32] px-28 rounded-lg h-9 text-white' onClick={(e) => {
            e.preventDefault();
            handleAddReview()
          }}>Submit</button>
        </div>
      </div>
    </>
  );
}
