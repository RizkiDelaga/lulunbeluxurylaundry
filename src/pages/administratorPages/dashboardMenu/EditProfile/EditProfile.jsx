import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageStructureAndDirectButton from '../../../../components/PageStructureAndDirectButton/PageStructureAndDirectButton';
import { Autocomplete, Box, Button, Chip, Grid, Paper, TextField, useTheme } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

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
    profilePicture: {},
  });

  React.useEffect(() => {
    document.title = 'Edit Profile';
  }, []);

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
                <Autocomplete
                  required
                  sx={{ width: '100%' }}
                  value={formEditProfile.role}
                  options={['Basic', 'Master']}
                  autoHighlight
                  onChange={(event, value) => {
                    setFormEditProfile({
                      ...formEditProfile,
                      role: value,
                    });
                  }}
                  getOptionLabel={(option) => option}
                  renderOption={(props, option, index) => (
                    <div style={{ paddingTop: '16px', paddingBottom: '16px' }} {...props}>
                      {option}
                    </div>
                  )}
                  renderInput={(params) => <TextField {...params} label="Role *" />}
                />
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
              onClick={() => navigate('/Dashboard')}
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
