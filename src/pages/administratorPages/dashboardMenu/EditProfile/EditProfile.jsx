import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  useTheme,
} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import axios from 'axios';

function EditProfile() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formEditProfile, setFormEditProfile] = useState({
    administratorName: '',
    contact: {
      phoneNumber: '',
      email: '',
    },
    role: '',
    profilePicture: { img: null, fileName: null },
    status: '',
  });

  React.useEffect(() => {
    document.title = 'Edit Profile';
    handleGetMyProfile();
  }, []);

  const handleGetMyProfile = async () => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/admin/my/profile',
      });
      console.log('Response GET');
      console.log(res);
      setFormEditProfile({
        administratorName: res.data.data.nama,
        contact: {
          phoneNumber: res.data.data.noTelp,
          email: res.data.data.email,
        },
        role: res.data.data.role,
        profilePicture: { img: null, fileName: res.data.data.profilePic },
        status: res.data.data.status,
      });
    } catch (error) {
      // if (error.response.status === 404) {
      // }
      console.log(error);
    }
  };

  const handleUpdateMyProfile = async () => {
    const formData = new FormData();
    formData.append('role', formEditProfile.role);
    formData.append('nama', formEditProfile.administratorName);
    formData.append('noTelp', formEditProfile.contact.phoneNumber);
    formData.append('email', formEditProfile.contact.email);
    formData.append('profilePic', formEditProfile.profilePicture.img);
    formData.append('status', formEditProfile.status);

    try {
      const res = await axios({
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/admin',
        data: formData,
      });
      console.log('Response Update');
      console.log(res);
      handleGetMyProfile();
    } catch (error) {
      // if (error.response.status === 404) {
      // }
      console.log(error);
    }
  };

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Dashboard"
          currentPage={{
            title: 'Edit Profil',
          }}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Edit Profil</h2>
            </div>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2} lg={1.4} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Nama Lengkap</span>
              </Grid>

              <Grid
                item
                xs
                lg
                sx={{
                  display: 'flex',
                  [theme.breakpoints.down('md')]: {
                    paddingTop: '8px !important',
                  },
                }}
              >
                <TextField
                  required
                  label="Nama"
                  value={formEditProfile.administratorName}
                  onChange={(e) => {
                    setFormEditProfile({ ...formEditProfile, administratorName: e.target.value });
                  }}
                  autoComplete="off"
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2} lg={1.4} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Kontak</span>
              </Grid>
              <Grid
                item
                xs
                lg
                sx={{
                  display: 'flex',
                  [theme.breakpoints.down('md')]: {
                    paddingTop: '8px !important',
                  },
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm>
                    <TextField
                      type="number"
                      label="Nomer Telepon"
                      value={formEditProfile.contact.phoneNumber}
                      onChange={(e) => {
                        setFormEditProfile({
                          ...formEditProfile,
                          contact: { ...formEditProfile.contact, phoneNumber: e.target.value },
                        });
                      }}
                      autoComplete="off"
                      onWheel={(e) => e.target.blur()}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm>
                    <TextField
                      required
                      label="Email"
                      value={formEditProfile.contact.email}
                      onChange={(e) => {
                        setFormEditProfile({
                          ...formEditProfile,
                          contact: { ...formEditProfile.contact, email: e.target.value },
                        });
                      }}
                      autoComplete="off"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2} lg={1.4} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Role</span>
              </Grid>

              <Grid
                item
                xs
                lg
                sx={{
                  display: 'flex',
                  [theme.breakpoints.down('md')]: {
                    paddingTop: '8px !important',
                  },
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="select-role-label">Role *</InputLabel>
                  <Select
                    required
                    labelId="select-role-label"
                    id="select-role"
                    value={formEditProfile.role}
                    label="Role"
                    onChange={(e) => {
                      setFormEditProfile({
                        ...formEditProfile,
                        role: e.target.value,
                      });
                    }}
                  >
                    {['Basic', 'Master'].map((item) => {
                      return (
                        <MenuItem value={item} sx={{ py: '16px' }}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                {formEditProfile.role}
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2} lg={1.4}>
                <span>Foto Profil</span>
              </Grid>

              <Grid
                item
                xs
                lg
                sx={{
                  display: 'flex',
                  [theme.breakpoints.down('md')]: {
                    paddingTop: '8px !important',
                  },
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs="auto">
                    <Button
                      variant="contained"
                      size="small"
                      component="label"
                      startIcon={<InsertPhotoIcon />}
                      sx={{ height: 'fit-content' }}
                    >
                      Pilih Foto
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          console.log(e.target.files);
                          setFormEditProfile({
                            ...formEditProfile,
                            profilePicture: {
                              img: e.target.files[0],
                              fileName: !e.target.files[0] ? null : e.target.files[0].name,
                            },
                          });
                          console.log(formEditProfile.profilePicture.img);
                        }}
                        hidden
                      />
                    </Button>
                  </Grid>
                  <Grid item xs="auto">
                    {formEditProfile.profilePicture.img ? (
                      <img
                        id="output"
                        src={
                          formEditProfile.profilePicture.img
                            ? URL.createObjectURL(formEditProfile.profilePicture.img)
                            : ''
                        }
                        width={70}
                        alt="Preview"
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs>
                    {formEditProfile.profilePicture.fileName ? (
                      <Chip
                        label={formEditProfile.profilePicture.fileName}
                        onDelete={() => setFormEditProfile({ ...formEditProfile, profilePicture: {} })}
                        sx={{ maxWidth: '250px' }}
                      />
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              size="large"
              style={{ width: '100%', fontWeight: 'bold' }}
              onClick={() => handleUpdateMyProfile()}
            >
              Edit Profil
            </Button>

            {formEditProfile.administratorName}
            <br />
            {formEditProfile.contact.phoneNumber}
            <br />
            {formEditProfile.contact.email}
            <br />
            {formEditProfile.role}
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default EditProfile;
