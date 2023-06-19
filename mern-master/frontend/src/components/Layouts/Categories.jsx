// import mobiles from '../../assets/images/Categories/phone.png';
// import fashion from '../../assets/images/Categories/fashion.png';
// import electronics from '../../assets/images/Categories/electronics.png';
// import home from '../../assets/images/Categories/home.png';
// import travel from '../../assets/images/Categories/travel.png';
// import appliances from '../../assets/images/Categories/appliances.png';
// import furniture from '../../assets/images/Categories/furniture.png';
// imstone from '../../assets/images/Categories/beauty.png';
// import grocery from '../../assets/images/Categories/grocery.png';
// import { Link } from 'react-router-dom';

// const catNav = [
//     {
//         name: "Embroidery",
//         icon: mobiles,
//     },
//     {    
//         name: "Jewellery",
//         icon: fashion,
//     },
//     {
//         name: "Pottery",
//         icon: electronics,
//     },
//     {
//         name: "Leather Products",
//         icon: home,
//     },
//     {
//         name: "Marble/Stone Carving",
//         icon: travel,
//     },
//     {
//         name: "Paintings",
//         icon: appliances,
//     },
//     {
//         name: "Bangles",
//         icon: furniture,
//     },
//     {
//         name: "Metalwork",
//         icon: beauty,
//     },
//     {
//         name: "Woodwork",
//         icon: grocery,
//     },
// ]
 
// const Categories = () => {
//     return (
//         <section className="hidden sm:block bg-white mt-10 mb-4 min-w-full px-12 py-1 shadow overflow-hidden">

//             <div className="flex items-center justify-between mt-4">

//                 {catNav.map((item, i) => (
//                     <Link to={`/products?category=${item.name}`} className="flex flex-col gap-1 items-center p-2 group" key={i}>
//                         <div className="h-16 w-16">
//                             <img draggable="false" className="h-full w-full object-contain" src={item.icon} alt={item.name} />
//                         </div>
//                         <span className="text-sm text-gray-800 font-medium group-hover:text-primary-blue">{item.name}</span>
//                     </Link>
//                 ))}

//             </div>
//         </section>
//     );
// };

// export default Categories;







import homedecore from "../../assets/images/Categories/homedecor.png"
import bluepottery from '../../assets/images/Categories/blue pottery.png';
import footwear from '../../assets/images/Categories/circle footwear.png';
import bags from '../../assets/images/Categories/bags.png';
import Jewellery from '../../assets/images/Categories/jewellery1.png';
import Bangles from '../../assets/images/Categories/bangles 2.png';
import others from '../../assets/images/Categories/others.png';
import stone from '../../assets/images/Categories/stone.png';
// import grocery from '../../assets/images/Categories/grocery.png';

import { Link } from 'react-router-dom';

const catNav = [
    {
        name: "Home Decor",
        icon: homedecore,
    },
    {    
        name: "Jewellery",
        icon: Jewellery,
    },
    {
        name: "Pottery",
        icon: bluepottery,
    },
    {
        name: "Bags",
        icon: bags,
    },
    {
        name: "Stone Carving",
        icon: stone,
    },
    {
        name: "Footwear",
        icon: footwear,
    },
    {
        name: "Bangles",
        icon: Bangles,
    },
    // {
    //     name: "Metalwork",
    //     icon: homedecore,
    // },
    {
        name: "Others",
        icon: others,
    },
]
 
const Categories = () => {
    return (
        <section className="hidden sm:block bg-white mt-10 mb-4 min-w-full px-12 py-1 shadow overflow-hidden">
            <div className="flex items-center justify-between mt-4" style={{ flexWrap: 'nowrap' }}>
                {catNav.map((item, i) => (
                    <Link to={`/products?category=${item.name}`} className="flex flex-col gap-1 items-center p-2 group" key={i} style={{ width: 'calc(100% / 9)' }}>
                        <div className="h-16 w-16">
                            <img draggable="false" className="h-full w-full object-contain " src={item.icon} alt={item.name} />
                        </div>
                        <span className="text-sm text-gray-800 font-medium group-hover:text-primary-blue">{item.name}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Categories;
