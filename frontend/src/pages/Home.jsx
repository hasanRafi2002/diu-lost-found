import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
  TextField,
  Paper,
  Chip,
  Skeleton,
  useTheme,
  Stack,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { listItems } from "../services/itemService";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentItems();
  }, []);

  async function loadRecentItems() {
    try {
      const response = await listItems({ page: 1, page_size: 6 });
      setRecentItems(response.items || []);
    } catch (err) {
      console.error("Error loading items:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/lost?search=${encodeURIComponent(searchTerm)}`);
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Hero Banner */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: "white",
          py: { xs: 8, md: 12 },
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                sx={{
                  mb: 2,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  fontWeight: 700,
                }}
              >
                DIU Lost & Found
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.95,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  fontWeight: 400,
                }}
              >
                Help your DIU community find lost items and reunite belongings with their owners
              </Typography>

              {/* Search Bar */}
              <Box
                component="form"
                onSubmit={handleSearch}
                sx={{
                  display: "flex",
                  gap: 1,
                  mb: 3,
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Search lost or found items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                      borderRadius: 1,
                      color: "black",
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "white",
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    px: 3,
                    "&:hover": {
                      backgroundColor: "#f3f4f6",
                    },
                  }}
                >
                  Search
                </Button>
              </Box>

              <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    color: "white",
                    "&:hover": { backgroundColor: theme.palette.secondary.dark },
                  }}
                  onClick={() => navigate("/report")}
                >
                  📍 Report Lost Item
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                  onClick={() => navigate("/report")}
                >
                  ✅ Report Found Item
                </Button>
              </Box>
            </Grid>

            {/* Emoji Section */}
            <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
              <Box sx={{ fontSize: { xs: "80px", md: "120px" } }}>🔍</Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Quick Actions */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={3}>
          {[
            { icon: "📍", title: "Report Lost Item", desc: "Tell the community about something you lost" },
            { icon: "✅", title: "Report Found Item", desc: "Help return something you found" },
            { icon: "🔔", title: "Browse Items", desc: "See all lost & found items" },
          ].map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 4,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-8px)",
                  },
                }}
                onClick={() => navigate(i === 0 || i === 1 ? "/report" : "/lost")}
              >
                <Box sx={{ fontSize: "48px", mb: 2 }}>{item.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works */}
      <Box sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#f9fafb', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ textAlign: "center", mb: 6, fontWeight: 700 }}>
            How It Works
          </Typography>

          <Grid container spacing={4}>
            {[
              { icon: "⚡", title: "Report Quickly", desc: "Post details about lost/found items in seconds with photos" },
              { icon: "👥", title: "Get Community Help", desc: "Community members verify and claim items" },
              { icon: "✓", title: "Verify & Reunite", desc: "Approve claims and reunite with owners" },
            ].map((feature, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card sx={{ p: 3, textAlign: "center", height: "100%" }}>
                  <Box sx={{ fontSize: "48px", mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {feature.desc}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Recent Items */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, flex: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            Recent Reports
          </Typography>
          <Button color="primary" onClick={() => navigate("/lost")}>
            View All →
          </Button>
        </Box>

        {loading ? (
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card>
                  <Skeleton variant="rectangular" height={200} />
                  <CardContent>
                    <Skeleton width="80%" />
                    <Skeleton width="100%" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : recentItems.length > 0 ? (
          <Grid container spacing={3}>
            {recentItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.3s",
                    "&:hover": {
                      boxShadow: 6,
                      transform: "translateY(-4px)",
                    },
                  }}
                  onClick={() => navigate(`/items/${item.id}`)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image_url || "https://via.placeholder.com/400x200?text=No+Image"}
                    alt={item.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
                      <Chip
                        label={item.item_type}
                        size="small"
                        color={item.item_type === "LOST" ? "error" : "info"}
                        variant="outlined"
                      />
                      <Chip label={item.status} size="small" variant="outlined" />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <Typography color="textSecondary">
              No items reported yet. Be the first to help the community!
            </Typography>
          </Paper>
        )}
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
