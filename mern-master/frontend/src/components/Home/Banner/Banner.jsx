import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Banner.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import header1 from '../../../assets/images/Banners/header 1.jpg';
import header2 from '../../../assets/images/Banners/header 2.jpg';
import header3 from '../../../assets/images/Banners/header 3.jpg';
import header4 from '../../../assets/images/Banners/header 4.jpg';
import header5 from '../../../assets/images/Banners/header 5.jpg';
import header6 from '../../../assets/images/Banners/header 6.jpg';
import header7 from '../../../assets/images/Banners/header 7.jpg';
import header8 from '../../../assets/images/Banners/header 8.jpg';
import header9 from '../../../assets/images/Banners/header 9.jpg';

 

export const PreviousBtn = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIosIcon style={{ fontSize: 10 }}/>
    </div>
  )
}

export const NextBtn = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIosIcon style={{ fontSize: 10 }}/>
    </div>
  )
}

const Banner = () => {

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
  };

  const banners = [header1, header2, header3, header4, header5, header6, header7, header8,header9];

  return (
    <>
      <section className="h-44 sm:h-72 w-full rounded-sm shadow relative overflow-hidden border-2 border-primary-pink">
        <Slider {...settings}>
          {banners.map((el, i) => (
            <img draggable="false" className="h-44 sm:h-72 w-full object-cover" src={el} alt="banner" key={i} />
          ))}
        </Slider>
      </section>
    </>
  );
};

export default Banner;
