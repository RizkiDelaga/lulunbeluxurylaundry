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
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  useTheme,
} from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import axios from 'axios';
import LoadDecisions from '../../../../components/LoadDecisions/LoadDecisions';

function RegisterNewAdministrator() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formRegisterNewAdministrator, setFormRegisterNewAdministrator] = useState({
    administratorName: '',
    contact: {
      phoneNumber: '',
      email: '',
    },
    role: null,
    profilePicture: { img: null, fileName: null },
  });

  const [openLoadDecision, setOpenLoadDecision] = useState({
    isLoad: false,
    message: '',
    statusType: '',
  });

  React.useEffect(() => {
    document.title = 'Registrasi Administrator Baru';
  }, []);

  const handleRegisterNewAdmin = async () => {
    const formData = new FormData();
    formData.append('role', formRegisterNewAdministrator.role);
    formData.append('nama', formRegisterNewAdministrator.administratorName);
    formData.append('noTelp', formRegisterNewAdministrator.contact.phoneNumber);
    formData.append('email', formRegisterNewAdministrator.contact.email);
    formData.append('profilePic', formRegisterNewAdministrator.profilePicture.img);
    formData.append('status', 'Aktif');

    setOpenLoadDecision({ ...openLoadDecision, isLoad: true });

    try {
      const res = await axios({
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
        },
        url: `${process.env.REACT_APP_API_KEY}/admin`,
        data: formData,
      });

      if (res.status === 201) {
        setOpenLoadDecision({
          ...openLoadDecision.isLoad,
          message: 'Registrasi Admin Berhasil!',
          statusType: 'success',
        });
      }
    } catch (error) {
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
            title: 'Registrasi Administrator Baru',
          }}
        />
        <LoadDecisions setOpenLoad={setOpenLoadDecision} openLoad={openLoadDecision} redirect={'/Dashboard'} />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16" sx={{ flexDirection: 'column' }}>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Registrasi Administrator Baru</h2>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegisterNewAdmin();
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
                      required
                      type="text"
                      label="Nama Administrator"
                      value={formRegisterNewAdministrator.administratorName}
                      onChange={(e) => {
                        setFormRegisterNewAdministrator({
                          ...formRegisterNewAdministrator,
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
                          placeholder="628xxxxxxxxxxx"
                          value={formRegisterNewAdministrator.contact.phoneNumber}
                          onChange={(e) => {
                            setFormRegisterNewAdministrator({
                              ...formRegisterNewAdministrator,
                              contact: { ...formRegisterNewAdministrator.contact, phoneNumber: e.target.value },
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
                          value={formRegisterNewAdministrator.contact.email}
                          onChange={(e) => {
                            setFormRegisterNewAdministrator({
                              ...formRegisterNewAdministrator,
                              contact: { ...formRegisterNewAdministrator.contact, email: e.target.value },
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
                        value={formRegisterNewAdministrator.role}
                        label="Role"
                        onChange={(e) => {
                          setFormRegisterNewAdministrator({
                            ...formRegisterNewAdministrator,
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
                              setFormRegisterNewAdministrator({
                                ...formRegisterNewAdministrator,
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
                        {formRegisterNewAdministrator.profilePicture.img ? (
                          <img
                            id="output"
                            src={
                              formRegisterNewAdministrator.profilePicture.img
                                ? URL.createObjectURL(formRegisterNewAdministrator.profilePicture.img)
                                : ''
                            }
                            width={70}
                            alt="Preview"
                          />
                        ) : null}
                      </Grid>
                      <Grid item xs sx={{ display: 'flex', flexDirection: 'column' }}>
                        {formRegisterNewAdministrator.profilePicture.fileName ? (
                          <Chip
                            label={formRegisterNewAdministrator.profilePicture.fileName}
                            onDelete={() =>
                              setFormRegisterNewAdministrator({ ...formRegisterNewAdministrator, profilePicture: {} })
                            }
                            sx={{ maxWidth: '250px' }}
                          />
                        ) : null}
                        <span style={{ fontSize: '12px' }}>*Max size file 5MB</span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Button variant="contained" size="large" type="submit" sx={{ width: '100%', fontWeight: 'bold' }}>
                  Registrasi Administrator
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default RegisterNewAdministrator;
