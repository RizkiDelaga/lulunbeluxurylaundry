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
import LoadDecisions from '../../../../components/LoadDecisions/LoadDecisions';

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
  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
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
        url: `${process.env.REACT_APP_API_KEY}/admin/my/profile`,
      });
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
      localStorage.setItem('admin_profile_account', JSON.stringify(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateMyProfile = async () => {
    const formData = new FormData();
    formData.append('role', formEditProfile.role);
    formData.append('nama', formEditProfile.administratorName);
    formData.append('noTelp', formEditProfile.contact.phoneNumber);
    formData.append('email', formEditProfile.contact.email || '');
    formData.append('profilePic', formEditProfile.profilePicture.img);
    formData.append('status', formEditProfile.status);
    setOpenLoadDecision({ ...openLoadDecision, isLoad: true });

    try {
      const res = await axios({
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/admin`,
        data: formData,
      });
      handleGetMyProfile();
      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Edit Profil Berhasil!',
          statusType: 'success',
        });
      }
    } catch (error) {
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });
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
        <LoadDecisions setOpenLoad={setOpenLoadDecision} openLoad={openLoadDecision} />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateMyProfile();
            }}
          >
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
                    label="Nama"
                    value={formEditProfile.administratorName}
                    onChange={(e) => {
                      setFormEditProfile({ ...formEditProfile, administratorName: e.target.value });
                    }}
                    autoComplete="off"
                    disabled="true"
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
                        required
                        type="number"
                        label="Nomer Telepon"
                        placeholder="628xxxxxxxxxxx"
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

              {formEditProfile.role !== 'Master' ? null : (
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
                  </Grid>
                </Grid>
              )}

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
                            setFormEditProfile({
                              ...formEditProfile,
                              profilePicture: {
                                img: e.target.files[0],
                                fileName: !e.target.files[0] ? null : e.target.files[0].name,
                              },
                            });
                          }}
                          hidden
                        />
                      </Button>
                    </Grid>
                    <Grid item xs="auto">
                      {formEditProfile.profilePicture.img || formEditProfile.profilePicture.fileName ? (
                        <img
                          id="output"
                          src={
                            formEditProfile.profilePicture.img
                              ? URL.createObjectURL(formEditProfile.profilePicture.img)
                              : formEditProfile.profilePicture.fileName
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

              <Button variant="contained" size="large" type="submit" sx={{ width: '100%', fontWeight: 'bold' }}>
                Edit Profil
              </Button>
            </Box>
          </form>
        </Paper>
      </div>
    </>
  );
}

export default EditProfile;
