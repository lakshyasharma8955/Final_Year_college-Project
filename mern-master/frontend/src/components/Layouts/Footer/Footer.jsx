import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const footerLinks = [
  {
    title: "about",
    links: [
      {
        name: "Contact Us",
        redirect: "https://info@aryacollege.in",
      },
      {
        name: "About Us",
        redirect: "https://info@aryacollege.in",
      }
    ]
  },
  {
    title: "help",
    links: [
      {
        name: "Payments",
        redirect: "https://info@aryacollege.in",
      },
      {
        name: "Shipping",
        redirect: "https://info@aryacollege.in",
      },
      {
        name: "Cancellation & Returns",
        redirect: "https://info@aryacollege.in",
      }
    ]
  },
  {
    title: "policy",
    links: [
      {
        name: "Return Policy",
        redirect: "https://info@aryacollege.in",
      },
      {
        name: "Security",
        redirect: "https://info@aryacollege.in",
      },
      {
        name: "Privacy",
        redirect: "https://info@aryacollege.in",
      },
    ]
  },
  {
    title: "social",
    links: [
      {
        name: "Facebook",
        redirect: "https://info@aryacollege.in",
      },
      {
        name: "Twitter",
        redirect: "https://info@aryacollege.in",
      },
      {
        name: "YouTube",
        redirect: "https://info@aryacollege.in",
      }
    ]
  }
]

const Footer = () => {

  const location = useLocation();
  const [adminRoute, setAdminRoute] = useState(false);

  useEffect(() => {
    setAdminRoute(location.pathname.split("/", 2).includes("admin"))
  }, [location]);

  return (
    <>
      {!adminRoute && (
        <>
          <footer className="mt-20 w-full py-1 sm:py-4 px-4 sm:px-12 bg-primary-darkBlue text-white text-xs border-b border-gray-600 flex flex-col sm:flex-row overflow-hidden">
            <div className="w-full sm:w-7/12 flex flex-col sm:flex-row">
              {footerLinks.map((el, i) => (
                <div className="w-full sm:w-1/5 flex flex-col gap-2 my-3 sm:my-6 ml-5" key={i}>
                  <h2 className="text-primary-grey mb-2 uppercase">{el.title}</h2>
                  {el.links.map((item, i) => (
                    <a href={item.redirect} target="_blank" rel="noreferrer" className="hover:underline" key={i}>{item.name}</a>
                  ))}
                </div>
              ))}
            </div>
            <div className="border-gray-600 h-36 w-1 border-l mr-5 mt-6 hidden sm:block"></div>
            <div className="w-full sm:w-5/12 my-6 mx-5 sm:mx-0 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between">
              <div className="w-full sm:w-1/2">
                <h2 className="text-primary-grey">Mail Us:</h2>
                <p className="mt-2 leading-5">
                info@aryacollege.in <br/>
                nishantkumarsharma121@gmail.com <br/>
                lakshya.sharma9928@gmail.com
                </p>
              </div>
              <div className="w-full sm:w-1/2">
                <h2 className="text-primary-grey">Address:</h2>
                <p className="mt-2 leading-5">
                  SP-42, Arya 1st Old Campus Rd, <br/> 
                  RIICO Industrial Area, Kukas, Rajasthan 302028 <br/>
                  Arya College of Engineering & IT,  <br/>
                  Telephone No: <a className="text-primary-blue" href="tel:18002662000">18002662000</a>
                </p>
              </div>
            </div>
          </footer>
        </>
      )}
    </>
  )
};

export default Footer;






