import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SecurityIcon from '@mui/icons-material/Security';
import SmsIcon from '@mui/icons-material/Sms';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import HelpIcon from '@mui/icons-material/Help';

const BottomNav = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/url-checker');
        break;
      case 2:
        navigate('/sms-checker');
        break;
      case 3:
        navigate('/phone-checker');
        break;
      case 4:
        navigate('/password-checker');
        break;
      case 5:
        navigate('/education');
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} showLabels>
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="URL Checker" icon={<SecurityIcon />} />
      <BottomNavigationAction label="SMS Checker" icon={<SmsIcon />} />
      <BottomNavigationAction label="Phone Checker" icon={<PhoneIcon />} />
      <BottomNavigationAction label="Password" icon={<LockIcon />} />
      <BottomNavigationAction label="Education" icon={<HelpIcon />} />
    </BottomNavigation>
  );
};

export default BottomNav;
