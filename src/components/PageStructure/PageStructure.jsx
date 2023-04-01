import React, { Fragment, useState } from 'react';
import './PageStructure.css';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { useNavigate } from 'react-router';

import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import FirstPageOutlinedIcon from '@mui/icons-material/FirstPageOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import TypeSpecimenIcon from '@mui/icons-material/TypeSpecimen';
import InfoIcon from '@mui/icons-material/Info';
import PaymentIcon from '@mui/icons-material/Payment';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ContactsIcon from '@mui/icons-material/Contacts';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import PermDeviceInformationIcon from '@mui/icons-material/PermDeviceInformation';
import DeviceUnknownIcon from '@mui/icons-material/DeviceUnknown';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import QuizIcon from '@mui/icons-material/Quiz';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CollectionsIcon from '@mui/icons-material/Collections';
import HistoryIcon from '@mui/icons-material/History';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

import LogoutIcon from '@mui/icons-material/Logout';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function PageStructure({ defaultMenu, previousPage, currentPage }) {
  const navigate = useNavigate();
  const [structure, setStucture] = useState({
    previousPage: [
      {
        title: '',
        link: '',
      },
    ],
    currentPage: {
      title: '',
      link: '',
    },
  });

  const listMenu = {
    dashboard: {
      title: 'Dashboard',
      link: '/dashboard',
      icon: 'DashboardOutlinedIcon',
    },
    pesanan: {
      title: 'Pesanan',
      link: '/pesanan',
      icon: 'AddToPhotosOutlinedIcon',
    },
  };

  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  return (
    <Fragment>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs maxItems={3} aria-label="breadcrumb">
          <Link
            underline="none"
            color="inherit"
            onClick={() => {
              navigate('/galeri');
            }}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <DashboardOutlinedIcon className="color-primary" />
            {listMenu[defaultMenu].title}
          </Link>

          <Link
            underline="none"
            color="inherit"
            onClick={() => {
              navigate('/galeri');
            }}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <DashboardOutlinedIcon className="color-primary" />
            {listMenu[defaultMenu].title}
          </Link>

          <Typography color="text.primary">{currentPage.title}</Typography>
        </Breadcrumbs>
      </div>

      {/* Test Icon */}
      <DashboardOutlinedIcon />
      <LibraryAddOutlinedIcon />
      <StoreOutlinedIcon />
      <ConfirmationNumberOutlinedIcon />
      <LocalAtmOutlinedIcon />

      <MenuIcon />
      <AccountCircleOutlinedIcon />
      <NotificationsActiveOutlinedIcon />
      <NotificationsNoneOutlinedIcon />

      <ArrowBackIosNewOutlinedIcon />
      <ArrowBackOutlinedIcon />
      <KeyboardDoubleArrowLeftOutlinedIcon />
      <ArrowLeftOutlinedIcon />
      <FirstPageOutlinedIcon />
      <MoreHorizOutlinedIcon />
      <MoreVertOutlinedIcon />
      <MessageOutlinedIcon />
      <EmailOutlinedIcon />
      <SendOutlinedIcon />
      <LocalPrintshopOutlinedIcon />
      <ShareOutlinedIcon />
      <StarOutlineOutlinedIcon />
      <StarHalfOutlinedIcon />
      <StarOutlinedIcon />
      <LocalActivityOutlinedIcon />
      <VisibilityOutlinedIcon />
      <VisibilityOffOutlinedIcon />
      <AccessTimeOutlinedIcon />
      <CalendarMonthOutlinedIcon />
      <ArrowDropDownOutlinedIcon />
      <ArrowForwardIosOutlinedIcon />
      <LocationOnOutlinedIcon />
      <ImageOutlinedIcon />
      <CopyrightOutlinedIcon />
      <ContentCopyOutlinedIcon />
      <FilterAltOutlinedIcon />
      <FilterListOutlinedIcon />
      <SortOutlinedIcon />
      <SearchOutlinedIcon />
      <AddOutlinedIcon />
      <ErrorOutlineOutlinedIcon />
      <ErrorOutlinedIcon />
      <RefreshOutlinedIcon />
      <EditIcon />
      <DeleteForeverIcon />
      <GroupsOutlinedIcon />

      <LocalLaundryServiceIcon />
      <DryCleaningIcon />
      <TypeSpecimenIcon />
      <InfoIcon />
      <PaymentIcon />
      <ContactSupportIcon />
      <ContactsIcon />
      <LightbulbCircleIcon />
      <TipsAndUpdatesIcon />
      <PermDeviceInformationIcon />
      <DeviceUnknownIcon />
      <PsychologyAltIcon />
      <LiveHelpIcon />
      <ReceiptLongIcon />
      <HourglassTopIcon />
      <CheckCircleIcon />
      <CancelIcon />
      <DeliveryDiningIcon />
      <LocalShippingIcon />
      <QuizIcon />
      <QuestionAnswerIcon />
      <CollectionsIcon />
      <HistoryIcon />
      <LoyaltyIcon />

      <LogoutIcon />
      <ExitToAppIcon />
    </Fragment>
  );
}

export default PageStructure;
