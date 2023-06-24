import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import {
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
import LoadDecisions from '../../../../components/LoadDecisions/LoadDecisions';
import axios from 'axios';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

function EditAdministrators() {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formEditAdministrator, setFormEditAdministrator] = useState({
    administratorName: '',
    contact: {
      phoneNumber: '',
      email: '',
    },
    role: null,
    profilePicture: { img: null, fileName: null },
    accountStatus: '',
  });

  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Edit Administrator';
    handleGetDetailAdmin();
  }, []);

  const handleGetDetailAdmin = async () => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/admin/${id}`,
      });

      setFormEditAdministrator({
        administratorName: res.data.data.nama,
        contact: {
          phoneNumber: res.data.data.noTelp,
          email: res.data.data.email,
        },
        role: res.data.data.role,
        profilePicture: { img: null, fileName: res.data.data.profilePic },
        accountStatus: res.data.data.status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditAdmin = async () => {
    const formData = new FormData();
    formData.append('role', formEditAdministrator.role);
    formData.append('nama', formEditAdministrator.administratorName);
    formData.append('noTelp', formEditAdministrator.contact.phoneNumber);
    formData.append('email', formEditAdministrator.contact.email || '');
    formData.append('profilePic', formEditAdministrator.profilePicture.img || null);
    formData.append('status', formEditAdministrator.accountStatus);

    setOpenLoadDecision({ ...openLoadDecision, isLoad: true });

    try {
      const res = await axios({
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/admin/${id}`,
        data: formData,
      });

      if (res.status === 200) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Edit Admin Berhasil!',
          statusType: 'success',
        });
      }
    } catch (error) {
      console.log(error);
      setOpenLoadDecision({
        ...openLoadDecision.isLoad,
        message: error.response.data.message,
        statusType: 'error',
      });
    }
  };

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Dashboard"
          currentPage={{
            title: 'Edit Administrator',
          }}
        />
        <LoadDecisions setOpenLoad={setOpenLoadDecision} openLoad={openLoadDecision} redirect={'/Dashboard'} />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16" sx={{ flexDirection: 'column' }}>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Edit Administrator</h2>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditAdmin();
              }}
            >
              <Box className="gap-16">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={2.6} lg={1.9} sx={{ display: 'flex', alignItems: 'center' }}>
                    <span>Nama Administrator</span>
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
                      disabled={true}
                      type="text"
                      label="Nama Administrator"
                      value={formEditAdministrator.administratorName}
                      onChange={(e) => {
                        setFormEditAdministrator({
                          ...formEditAdministrator,
                          administratorName: e.target.value,
                        });
                      }}
                      autoComplete="off"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={2.6} lg={1.9} sx={{ display: 'flex', alignItems: 'center' }}>
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
                          value={formEditAdministrator.contact.phoneNumber}
                          onChange={(e) => {
                            setFormEditAdministrator({
                              ...formEditAdministrator,
                              contact: { ...formEditAdministrator.contact, phoneNumber: e.target.value },
                            });
                          }}
                          autoComplete="off"
                          onWheel={(e) => e.target.blur()}
                          sx={{ width: '100%' }}
                        />
                      </Grid>
                      <Grid item xs={12} sm>
                        <TextField
                          type="email"
                          label="Email"
                          value={formEditAdministrator.contact.email}
                          onChange={(e) => {
                            setFormEditAdministrator({
                              ...formEditAdministrator,
                              contact: { ...formEditAdministrator.contact, email: e.target.value },
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
                  <Grid item xs={12} sm={12} md={2.6} lg={1.9} sx={{ display: 'flex', alignItems: 'center' }}>
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
                        value={formEditAdministrator.role || ''}
                        label="Role"
                        onChange={(e) => {
                          setFormEditAdministrator({
                            ...formEditAdministrator,
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

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={2.6} lg={1.9}>
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
                              setFormEditAdministrator({
                                ...formEditAdministrator,
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
                        {formEditAdministrator.profilePicture.img || formEditAdministrator.profilePicture.fileName ? (
                          <img
                            id="output"
                            src={
                              formEditAdministrator.profilePicture.img
                                ? URL.createObjectURL(formEditAdministrator.profilePicture.img)
                                : formEditAdministrator.profilePicture.fileName
                            }
                            width={70}
                            alt="Preview"
                          />
                        ) : null}
                      </Grid>
                      <Grid item xs>
                        {formEditAdministrator.profilePicture.fileName ? (
                          <Chip
                            label={formEditAdministrator.profilePicture.fileName}
                            onDelete={() => setFormEditAdministrator({ ...formEditAdministrator, profilePicture: {} })}
                            sx={{ maxWidth: '250px' }}
                          />
                        ) : null}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Button variant="contained" size="large" type="submit" sx={{ width: '100%', fontWeight: 'bold' }}>
                  Edit Administrator
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default EditAdministrators;
