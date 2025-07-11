import { ErrorOutline as ErrorIcon } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #dbe3d5, #b2cbbf)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}>
        <Container
          maxWidth="sm"
          sx={{
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            px: 4,
            py: 6,
            textAlign: "center",
          }}>
          <ErrorIcon sx={{ fontSize: "5rem", color: "#2e7d32", mb: 1 }} />
          <Typography variant="h2" fontWeight="bold" color="#2e7d32">
            404
          </Typography>
          <Typography variant="h5" color="#333" gutterBottom>
            Oops! Page Not Found
          </Typography>
          <Typography variant="body1" sx={{ color: "#555", mb: 3 }}>
            The page you’re looking for doesn’t exist or has been moved.
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            sx={{
              backgroundColor: "#2e7d32",
              color: "#fff",
              px: 4,
              py: 1,
              borderRadius: "8px",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#27692c",
              },
            }}>
            Go back to Home
          </Button>
        </Container>
      </motion.div>
    </Box>
  );
};

export default NotFound;
