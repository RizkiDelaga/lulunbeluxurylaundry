import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  useTheme,
} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

function RegisterNewAdministrator() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formRegisterNewAdministrator, setFormRegisterNewAdministrator] = useState({
    administratorName: '',
    contact: {
      phoneNumber: '',
      email: '',
    },
    role: '',
    password: '',
    confirmPassword: '',
    profilePicture: {},
  });
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });

  React.useEffect(() => {
    document.title = 'Registrasi Administrator Baru';
  }, []);

  return (
    <>
      <div className="gap-24" style={{ marginBottom: '24px' }}>
        <PageStructureAndDirectButton
          defaultMenu="Dashboard"
          currentPage={{
            title: 'Registrasi Administrator Baru',
          }}
        />

        {/* Main Content */}
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Box className="gap-16">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ marginTop: '8px', marginBottom: '8px' }}>Registrasi Administrator Baru</h2>
            </div>
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
                  label="Nama Administrator"
                  value={formRegisterNewAdministrator.administratorName}
                  onChange={(e) => {
                    setFormRegisterNewAdministrator({
                      ...formRegisterNewAdministrator,
                      administratorName: e.target.value,
                    });
                  }}
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
                      value={formRegisterNewAdministrator.contact.phoneNumber}
                      onChange={(e) => {
                        setFormRegisterNewAdministrator({
                          ...formRegisterNewAdministrator,
                          contact: { ...formRegisterNewAdministrator.contact, phoneNumber: e.target.value },
                        });
                      }}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm>
                    <TextField
                      required
                      label="Email"
                      value={formRegisterNewAdministrator.contact.email}
                      onChange={(e) => {
                        setFormRegisterNewAdministrator({
                          ...formRegisterNewAdministrator,
                          contact: { ...formRegisterNewAdministrator.contact, email: e.target.value },
                        });
                      }}
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
                <TextField required label="Nama Administator" sx={{ width: '100%' }} />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.6} lg={1.9} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Password</span>
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
                <FormControl
                  variant="outlined"
                  onChange={(e) => {
                    setFormRegisterNewAdministrator({ ...formRegisterNewAdministrator, password: e.target.value });
                  }}
                  sx={{ width: '100%' }}
                >
                  <InputLabel htmlFor="input-password">Password *</InputLabel>
                  <OutlinedInput
                    required
                    label="Password"
                    helperText="Some important text"
                    id="input-password"
                    type={showPassword.password ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })}
                          edge="end"
                          color="primary"
                        >
                          {showPassword.password ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.6} lg={1.9} sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Konfirmasi Password</span>
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
                <FormControl
                  variant="outlined"
                  onChange={(e) => {
                    setFormRegisterNewAdministrator({
                      ...formRegisterNewAdministrator,
                      confirmPassword: e.target.value,
                    });
                  }}
                  sx={{ width: '100%' }}
                >
                  <InputLabel htmlFor="confirm-password">Konfirmasi Password *</InputLabel>
                  <OutlinedInput
                    label="Konfirmasi Password"
                    required
                    id="confirm-password"
                    type={showPassword.confirmPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })
                          }
                          edge="end"
                          color="primary"
                        >
                          {showPassword.confirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
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
                          console.log(e.target.files);
                          setFormRegisterNewAdministrator({
                            ...formRegisterNewAdministrator,
                            profilePicture: {
                              img: e.target.files[0],
                              fileName: !e.target.files[0] ? null : e.target.files[0].name,
                            },
                          });
                          console.log(formRegisterNewAdministrator.profilePicture.img);
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
                  <Grid item xs>
                    {formRegisterNewAdministrator.profilePicture.fileName ? (
                      <Chip
                        label={formRegisterNewAdministrator.profilePicture.fileName}
                        onDelete={() =>
                          setFormRegisterNewAdministrator({ ...formRegisterNewAdministrator, profilePicture: {} })
                        }
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
              onClick={() => navigate('/Dashboard')}
            >
              Registrasi Administrator
            </Button>

            {formRegisterNewAdministrator.administratorName}
            <br />
            {formRegisterNewAdministrator.contact.phoneNumber}
            <br />
            {formRegisterNewAdministrator.contact.email}
            <br />
            {formRegisterNewAdministrator.role}
            <br />
            {formRegisterNewAdministrator.password}
            <br />
            {formRegisterNewAdministrator.confirmPassword}
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default RegisterNewAdministrator;
