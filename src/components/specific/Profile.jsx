import { Avatar, Box, Stack, Typography, Grow } from "@mui/material";
import { CalendarMonth as CalendarIcon } from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../../lib/features";

const Profile = ({ user }) => {
  return (
    <Grow in timeout={500}>
      <Box
        sx={{
          p: 4,
          borderRadius: 4,
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
          maxWidth: 420,
          margin: "auto",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}>
        <Stack spacing={3} alignItems="center">
          <Box
            sx={{
              position: "relative",
              "&:hover": {
                transform: "scale(1.03)",
                transition: "transform 0.3s ease",
              },
            }}>
            <Avatar
              src={transformImage(user?.avatar?.url)}
              alt={user?.name}
              sx={{
                width: 150,
                height: 150,
                objectFit: "cover",
                border: "3px solid white",
                boxShadow: "0 0 12px rgba(0,0,0,0.3)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                width: 16,
                height: 16,
                backgroundColor: "#7ed6a4",
                border: "2px solid white",
                borderRadius: "50%",
              }}
            />
          </Box>

          <Typography variant="h5" fontWeight="bold" color="#f5f5f5">
            {user?.name}
          </Typography>
          <Typography variant="body2" color="#c0cbcf">
            @{user?.username}
          </Typography>

          {user?.bio && <ProfileCard heading="Bio" text={user?.bio} />}

          <ProfileCard
            heading="Joined"
            text={moment(user?.createdAt).format("MMMM YYYY")}
            Icon={<CalendarIcon sx={{ color: "#f5f5f5" }} />}
          />
        </Stack>
      </Box>
    </Grow>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction="row"
    alignItems="center"
    spacing={2}
    sx={{
      width: "100%",
      p: 2,
      borderRadius: 2,
      backgroundColor: "rgba(255,255,255,0.025)",
      transition: "all 0.3s",
      "&:hover": {
        backgroundColor: "rgba(255,255,255,0.05)",
      },
    }}>
    {Icon && (
      <Box
        sx={{
          p: 1,
          borderRadius: "50%",
          backgroundColor: "#43655a", // calm forest green
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 40,
          minHeight: 40,
        }}>
        {Icon}
      </Box>
    )}

    <Box>
      <Typography color="#f5f5f5" fontSize="1rem">
        {text}
      </Typography>
      <Typography color="#c0cbcf" fontSize="0.75rem">
        {heading}
      </Typography>
    </Box>
  </Stack>
);

export default Profile;
