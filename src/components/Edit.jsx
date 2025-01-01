import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

 export const Edit = () => {

    const [authors, setAuthors] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState(0);

    const navigate = useNavigate()

    const {id} = useParams()

    //funcion que actualiza un documento (libro)
    const updateBook = async (e) =>{
        e.preventDefault()

        const productDoc = doc(db,"products",id)
        const data = {
            authors: authors,
            description: description,
            stock:stock
        }
        await updateDoc(productDoc, data)

       
        navigate("/")

    }

    //funcion que trae el documento por id

    const getProductById = async (id) =>{

        const productDocRef = doc(db, "products", id);
        const productDoc = await getDoc(productDocRef);
    
        // console.log(productDoc)
        if(productDoc.exists()){
            setAuthors(productDoc.data().authors)
            setDescription(productDoc.data().description)
            setStock(productDoc.data().stock)


        }else{
            console.log("The book does not exist")
        }
        

    }

    useEffect(()=>{
        getProductById(id)
    },[])

    return (

        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Edit Book</h1>
                    <form onSubmit={updateBook}>
                        <div className="mb-3"> 
                            <label className="form-label">Description</label>
                            <input type="text" className='form-control' 
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)} />
                        </div>

                        <div className="mb-3"> 
                            <label className="form-label">Authors</label>
                            <input type="text" className='form-control' 
                            value={authors}
                            onChange={(e)=>setAuthors(e.target.value)} />
                        </div>

                        <div className="mb-3"> 
                            <label className="form-label">Stock</label>
                            <input type="text" className='form-control' 
                            value={stock}
                            onChange={(e)=>setStock(e.target.value)} />
                        </div>

                        <button type="submit" className='btn btn-primary'>Update</button>


                    </form>
                </div>
            </div>
        </div>


    )
}