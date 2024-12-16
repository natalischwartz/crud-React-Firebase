import { useState,useEffect } from "react";
// import {Link} from 'react-router-dom;'
import {collection,getDocs,deleteDoc,doc} from 'firebase/firestore';
import {db} from '../firebaseConfig/firebase.js'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { Link } from "react-router-dom";


const mySwal = withReactContent(Swal);

export const Show = () =>{

    //1.configurar los hooks

    const [products, setProducts] = useState([]);

    //2.referenciamos a la db de firestore

    const productsCollection  = collection(db,"products");

    //3.funcion para mostrar todos los docs

    const getProducts = async() =>{
        const data = await getDocs(productsCollection)
        // console.log(data.docs);
        setProducts(
            data.docs.map((doc)=>({...doc.data(),id:doc.id}))
        )
       
    }
    // console.log(products);

    //4.funcion para eliminar un doc

    const deleteProduct = async (id) =>{

    const productDoc = doc(db, "products",id)
    await deleteDoc (productDoc)

    getProducts();

    }
   
    //5.funcion para la confirmacion de sweet alert
     const confirmDelete = (id) =>{
        Swal.fire({
            title: "Estas seguro?",
            text: "No podes revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, quiero borrarlo!"
          }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(id);
              Swal.fire({
                title: "Borrado!",
                text: "Borraste un producto",
                icon: "success"
              });
            }
          });
     }

     //6.useEffect
     useEffect(()=>{
        getProducts();
     },[])




    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="d-grid gap-2">
                        <Link to="/create" className="btn btn-primary mt-2 mb-2">CREAR</Link>
                    </div>
                    <table className="table table-dark table-hover" >
                        <thead>
                            <tr>
                                <th>Authors</th>
                                <th>Description</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product)=>{
                                return(<tr key={product.id}>
                                    <td>{product.authors}</td>
                                    <td>{product.description}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        <Link to={`/edit/${product.id}`} className="btn btn-light">
                                            <i className="fa-solid fa-pencil"></i>
                                        </Link>
                                        <button onClick={()=>{confirmDelete(product.id)}} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                  </tr>);
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      
        
        
        </>
    )
} 