import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';



const categories = [
    "Home Decor",
    "Jewellery",
    "Pottery",
    "Bags",
    "Marble/Stone Carving",
    "Footwear",
    "Bangles",
    // "Metalwork",
    "Others"
]

const MinCategory = () => {
   
    return (
        <section className="hidden sm:block bg-white w-full px-2 sm:px-12 overflow-hidden border-b mt-14">
            <div className="flex items-center justify-between p-0.5">
                {categories.map((el, i) => (
                    <Link to={`/products?category=${el}`}  key={i}  exact className="text-sm p-2 text-gray-800 font-medium hover:text-primary-blue flex items-center gap-0.5 group">{el} <span className="text-gray-400 group-hover:text-primary-blue"><ExpandMoreIcon sx={{ fontSize: "16px" }} /></span></Link>
                ))}
            </div>
        </section>
    );
};                   


export default MinCategory;
