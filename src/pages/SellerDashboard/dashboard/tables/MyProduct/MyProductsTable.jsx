import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios"
import { PencilIcon, UserPlusIcon, } from "@heroicons/react/24/solid";
import { HiTrash } from "react-icons/hi2";
import moment from 'moment';
import Swal from 'sweetalert2'
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const TABLE_HEAD = ["Product", "Product Number", "Date Created", "Unit Price", "Stock", "Minimum Order", "", ""];


const MyProductsTable = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const[productNum , setProductNum]=useState(0);
  const[itemToDelete,setItemToDelete]=useState(0);
  const  PopupHandler = () =>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#44bd32",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteConfirmHandler();
        console.log("deleted");
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }else{
        setItemToDelete(0);
        console.log("Canceled " + itemToDelete);
      }
    });
  }
  
  function deleteConfirmHandler(){
    axios.delete(`https://localhost:44376/api/Product/${itemToDelete}`)
    .then((response)=>{         
        setProducts(response.data);
        setItemToDelete(0);
    })
  }
  function showConfirmPopupHandler(id){
    setItemToDelete(id);
    console.log(itemToDelete);
     if(itemToDelete != 0){
        PopupHandler();
     }
  }
  
  useEffect(() => {
    axios.get("https://localhost:44376/api/product")
      .then((response) => {
        setProducts((data) => {
          return response.data;
        });
      });
  }, []);

  return (
    <div>

      {/* Header card */}
      <Card className="h-full w-full mt-4">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                My Products
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all products
              </Typography>
            </div>

            {/* Add button */}
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button className="flex items-center gap-3" size="md" color='green'
                onClick={() => navigate('/dashboard/add-products')}
              >
                Add products
              </Button>
            </div>
          </div>

        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const dateTimeString = p.dateCreated;
                const date = moment(dateTimeString).format("YYYY-MM-DD")
                return (
                  <tr key={p.productID}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex items-center gap-3">
                        <Avatar src={"https://syntecblobstorage.blob.core.windows.net/products/" + p.productImageUrl} alt={p.productTitle} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {p.productTitle}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {p.productDescription}
                          </Typography>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {"PO-" + 1000 + p.productID}
                        </Typography>
                      </div>
                    </td>

                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>

                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {p.unitPrice}
                      </Typography>
                    </td>

                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {p.availableStock}
                      </Typography>
                    </td>

                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {p.minimumQuantity}
                      </Typography>
                    </td>

                    {/* edit button column */}
                    <td className="p-4 border-b border-blue-gray-50">
                      <Tooltip content="Edit Product">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4"
                           />
                        </IconButton>
                      </Tooltip>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Tooltip content="Delete Product">
                        <IconButton variant="text" color='red'>
                          <HiTrash className="h-4 w-4" 
                           onClick={()=>{showConfirmPopupHandler(p.productID);}}
                          />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

    </div>
  )
}

export default MyProductsTable