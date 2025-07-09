import { Grid, Skeleton, Stack } from "@mui/material";
import { BouncingSkeleton, RoundedSkeleton } from "../styles/StyledComponents";
import { CircularProgress, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
const SkeletonLoader = () => {
  const location = useLocation();
  if (location.pathname === "/login") {
    return <LayoutLoader />;
  }
  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sm={4}
        md={3}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        height={"100%"}>
        {/* <RoundedSkeleton variant="rounded" height={"100vh"} /> */}
        {Array.from({ length: 10 }).map((_, i) => (
          <ChatListSkeleton key={i} />
        ))}
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        lg={6}
        height="100%"
        sx={{
          backgroundImage:
            "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/96e750b6-3aea-4888-983a-d8f0a10ca98d/di04w97-65e15894-7da7-4bd2-be97-0d757006cb9f.png/v1/fill/w_540%2Ch_981%2Cq_80%2Cstrp/signal_wallpaper_light__whatsapp_style__by_damirap_di04w97-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTgxIiwicGF0aCI6IlwvZlwvOTZlNzUwYjYtM2FlYS00ODg4LTk4M2EtZDhmMGExMGNhOThkXC9kaTA0dzk3LTY1ZTE1ODk0LTdkYTctNGJkMi1iZTk3LTBkNzU3MDA2Y2I5Zi5wbmciLCJ3aWR0aCI6Ijw9NTQwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.3MDLFYyOSTXtV4BXx56WkqVB_Ic3S5CaqXbnAmoS91c')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "transparent",
          padding: "0.6rem",
        }}>
        <Stack
          spacing={"0.5rem"}
          height={"100%"}
          sx={{
            justifyContent: "flex-end",
          }}>
          {Array.from({ length: 10 }).map((_, index) => (
            <RoundedSkeleton
              key={index}
              variant="text"
              width={"40%"}
              animation="wave"
              sx={{
                fontSize: index % 4 == 0 ? "3.5rem" : "2rem",
                alignSelf: index % 4 == 0 ? "flex-start" : "flex-end",
                backgroundColor: "#e6e6fa",
              }}
            />
          ))}
        </Stack>
      </Grid>

      <Grid
        item
        md={4}
        lg={3}
        height={"100%"}
        alignContent={"center"}
        justifyItems={"center"}
        sx={{
          display: { xs: "none", md: "block" },
        }}>
        <Skeleton variant="circular" width={160} height={160} />
        <Box
          flex="1"
          width={"100%"}
          sx={{ marginTop: "6rem", justifyItems: "center" }}>
          <Skeleton variant="text" width={"40%"} height={20} />
          <Skeleton variant="text" width={"70%"} height={16} sx={{ mt: 0.5 }} />
        </Box>
        <Box
          flex="1"
          width={"100%"}
          sx={{ marginTop: "4rem", justifyItems: "center" }}>
          <Skeleton variant="text" width={"40%"} height={20} />
          <Skeleton variant="text" width={"70%"} height={16} sx={{ mt: 0.5 }} />
        </Box>
        <Box
          flex="1"
          width={"100%"}
          sx={{ marginTop: "4rem", justifyItems: "center" }}>
          <Skeleton variant="text" width={"40%"} height={20} />
          <Skeleton variant="text" width={"70%"} height={16} sx={{ mt: 0.5 }} />
        </Box>
      </Grid>
    </Grid>
  );
};

const TypingLoader = () => {
  return (
    <Stack
      spacing={"0.5rem"}
      direction={"row"}
      padding={"0.5rem"}
      justifyContent={"center"}>
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.1s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.2s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.4s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.6s",
        }}
      />
    </Stack>
  );
};

const LayoutLoader = () => {
  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f9f9f9">
      <CircularProgress size={40} />
    </Box>
  );
};

function ChatListSkeleton() {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      padding={1.5}
      sx={{
        width: "100%",
        maxWidth: "100%",
        borderBottom: "1px solid #eee",
      }}>
      {/* Avatar Skeleton */}
      <Skeleton variant="circular" width={48} height={48} />

      {/* Texts */}
      <Box flex="1">
        <Skeleton variant="text" width="40%" height={18} />
        <Skeleton variant="text" width="80%" height={16} sx={{ mt: 0.5 }} />
      </Box>
    </Box>
  );
}

export default LayoutLoader;

export { TypingLoader, LayoutLoader, SkeletonLoader };
