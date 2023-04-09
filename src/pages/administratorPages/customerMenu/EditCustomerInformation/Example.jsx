import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Example() {
  const navigate = useNavigate();
  const [formEditProfileCustomer, setFormEditProfileCustomer] = useState({
    customerName: '',
    contact: {
      phoneNumber: '',
      email: '',
    },
    birthDate: '',
    profilePicture: {},
  });
  const [formAddressCustomer, setFormAddressCustomer] = useState({
    region: {
      subDistrict: '',
      urbanVillage: '',
      hamlet: '',
      neighbourhood: '',
    },
    buildingDetails: {
      buildingType: '',
      buildingName_Or_Number: '',
    },
    addressDetails: '',
    buildingPhoto: {},
    mainAddress: false,
  });

  return <></>;
}

export default Example;
