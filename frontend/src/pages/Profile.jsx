import { useState } from "react";
import {
  Box,
  Container,
  Card,
  Grid,
  Avatar,
  Typography,
  Button,
  TextField,
  Tabs,
  Tab,
  Paper,
  useTheme,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  PhotoCamera as PhotoCameraIcon,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

export default function Profile() {
  const { user } = useAuth();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    full_name: user?.full_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    department: user?.department || "",
    student_id: user?.student_id || "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    try {
      // TODO: Connect to backend
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update profile");
    }
  }

  return (
    <>
      <Box sx={{ minHeight: "80vh", py: { xs: 4, md: 8 } }}>
        <Container maxWidth="md">
          {/* Profile Header */}
          <Card sx={{ p: { xs: 3, md: 4 }, mb: 4 }}>
            <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start", mb: 3 }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  fontSize: "3rem",
                }}
              >
                {user?.full_name?.charAt(0).toUpperCase()}
              </Avatar>

              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {user?.full_name}
                </Typography>
                <Typography color="textSecondary" sx={{ mb: 2 }}>
                  {user?.email}
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<PhotoCameraIcon />}
                    size="small"
                  >
                    Change Photo
                  </Button>

                  {!isEditing && (
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      size="small"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </Card>

          {/* Tabs */}
          <Paper sx={{ mb: 3 }}>
            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
              <Tab label="Personal Info" />
              <Tab label="Account Settings" />
              <Tab label="My Activity" />
            </Tabs>
          </Paper>

          {/* Tab Content */}
          {tabValue === 0 && (
            <Card sx={{ p: { xs: 3, md: 4 } }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="full_name"
                    value={profileData.full_name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={profileData.email}
                    disabled
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Student ID"
                    name="student_id"
                    value={profileData.student_id}
                    disabled
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Department"
                    name="department"
                    value={profileData.department}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Grid>

                {isEditing && (
                  <Grid item xs={12} sx={{ display: "flex", gap: 2, mt: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={handleSave}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<CancelIcon />}
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Card>
          )}

          {tabValue === 1 && (
            <Card sx={{ p: { xs: 3, md: 4 } }}>
              <Button variant="outlined" color="error">
                Change Password
              </Button>
            </Card>
          )}

          {tabValue === 2 && (
            <Card sx={{ p: { xs: 3, md: 4 } }}>
              <Typography>Coming soon...</Typography>
            </Card>
          )}
        </Container>
      </Box>

      <Footer />
    </>
  );
}
