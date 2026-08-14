import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  Stack,
  useTheme,
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? '#111827' : '#1f2937',
        color: 'white',
        mt: 'auto',
        pt: { xs: 6, md: 8 },
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* About */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              DIU Lost & Found
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Helping our DIU community reunite with lost items and support each other.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link
                onClick={() => navigate("/lost")}
                sx={{
                  cursor: "pointer",
                  color: "inherit",
                  opacity: 0.8,
                  "&:hover": { opacity: 1 },
                }}
              >
                Lost Items
              </Link>
              <Link
                onClick={() => navigate("/found")}
                sx={{
                  cursor: "pointer",
                  color: "inherit",
                  opacity: 0.8,
                  "&:hover": { opacity: 1 },
                }}
              >
                Found Items
              </Link>
              <Link
                onClick={() => navigate("/report")}
                sx={{
                  cursor: "pointer",
                  color: "inherit",
                  opacity: 0.8,
                  "&:hover": { opacity: 1 },
                }}
              >
                Report Item
              </Link>
            </Stack>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Support
            </Typography>
            <Stack spacing={1}>
              <Link
                onClick={() => navigate("/contact")}
                sx={{
                  cursor: "pointer",
                  color: "inherit",
                  opacity: 0.8,
                  "&:hover": { opacity: 1 },
                }}
              >
                Contact Us
              </Link>
              <Link
                href="mailto:support@diu.edu.bd"
                sx={{
                  cursor: "pointer",
                  color: "inherit",
                  opacity: 0.8,
                  "&:hover": { opacity: 1 },
                }}
              >
                Email Support
              </Link>
            </Stack>
          </Grid>

          {/* Social */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={2}>
              <Link href="#" color="inherit" sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}>
                <FacebookIcon />
              </Link>
              <Link href="#" color="inherit" sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}>
                <TwitterIcon />
              </Link>
              <Link href="#" color="inherit" sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}>
                <LinkedInIcon />
              </Link>
              <Link href="mailto:support@diu.edu.bd" color="inherit" sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}>
                <EmailIcon />
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)", mb: 3 }} />

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            &copy; 2024 DIU Lost & Found. All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.6, display: "block", mt: 1 }}>
            Made with ❤️ for Daffodil International University
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
