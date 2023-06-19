// import NotificationsIcon from '@mui/icons-material/Notifications';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import DownloadIcon from '@mui/icons-material/Download';

const SecondaryDropDownMenu = () => {

    const navs = [
        
        {
            title: "Want to Sell?",
            icon: <BusinessCenterIcon sx={{ fontSize: "18px" }} />,
            redirect: "https://docs.google.com/forms/d/e/1FAIpQLSf7rJ662efywA3CT5DlUMvtKQb2dRaf4IVYExXQhXQGebzJvA/viewform?usp=sf_link",
            // redirect: "/",
        },
        {
            title: "Customer Support",
            icon: <LiveHelpIcon sx={{ fontSize: "18px" }} />,
            redirect: "/",
        },
        
    ]

    return (
        <div className="absolute w-60 -right-2 top-9 bg-white shadow-2xl rounded flex-col text-sm">

            {navs.map((item, i) => {

                const { title, icon, redirect } = item;

                return (
                    <a className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50 rounded-t" href={redirect}   target="_blank" key={i}>
                        <span className="text-pink-500">{icon}</span>
                        {title}
                    </a>
                )
            })}

            <div className="absolute right-1/2 -top-2.5">
                <div className="arrow_down"></div>
            </div>
        </div>
    );
};

export default SecondaryDropDownMenu;
