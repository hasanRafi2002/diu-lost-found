import { Box, Container, Typography, Stack, Link, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Facebook as FacebookIcon, Twitter as TwitterIcon, LinkedIn as LinkedInIcon, Email as EmailIcon } from "@mui/icons-material";

export default function Footer() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? '#0f172a' : '#1f2937',
        color: 'white',
        mt: 'auto',
        pt: { xs: 6, md: 8 },
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          sx={{ mb: 4 }}
        >
          {/* About */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              🔍 DIU Lost & Found
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Helping our DIU community reunite with lost items and support each other.
            </Typography>
          </Box>

          {/* Quick Links */}
          <Box>
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
                  textDecoration: 'none',
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
                  textDecoration: 'none',
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
                  textDecoration: 'none',
                }}
              >
                Report Item
              </Link>
            </Stack>
          </Box>

          {/* Support */}
          <Box>
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
                  textDecoration: 'none',
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
                  textDecoration: 'none',
                }}
              >
                Email Support
              </Link>
            </Stack>
          </Box>

          {/* Social */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={2}>
              <Link href="#" color="inherit" sx={{ opacity: 0.8, "&:hover": { opacity: 1 }, display: 'flex' }}>
                <FacebookIcon />
              </Link>
              <Link href="#" color="inherit" sx={{ opacity: 0.8, "&:hover": { opacity: 1 }, display: 'flex' }}>
                <TwitterIcon />
              </Link>
              <Link href="#" color="inherit" sx={{ opacity: 0.8, "&:hover": { opacity: 1 }, display: 'flex' }}>
                <LinkedInIcon />
              </Link>
              <Link href="mailto:support@diu.edu.bd" color="inherit" sx={{ opacity: 0.8, "&:hover": { opacity: 1 }, display: 'flex' }}>
                <EmailIcon />
              </Link>
            </Stack>
          </Box>
        </Stack>

        <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.2)", pt: 3, textAlign: "center" }}>
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
