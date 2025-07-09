import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";
import { grayColor } from "../constants/color";

const Home = () => {
  return (
    <Box
      bgcolor={grayColor}
      height={"100%"}
      sx={{
        backgroundImage:
          "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/96e750b6-3aea-4888-983a-d8f0a10ca98d/di04w97-65e15894-7da7-4bd2-be97-0d757006cb9f.png/v1/fill/w_540%2Ch_981%2Cq_80%2Cstrp/signal_wallpaper_light__whatsapp_style__by_damirap_di04w97-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTgxIiwicGF0aCI6IlwvZlwvOTZlNzUwYjYtM2FlYS00ODg4LTk4M2EtZDhmMGExMGNhOThkXC9kaTA0dzk3LTY1ZTE1ODk0LTdkYTctNGJkMi1iZTk3LTBkNzU3MDA2Y2I5Zi5wbmciLCJ3aWR0aCI6Ijw9NTQwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.3MDLFYyOSTXtV4BXx56WkqVB_Ic3S5CaqXbnAmoS91c')",
      }}>
      <Typography p={"2rem"} variant="h5" textAlign={"center"}>
        Select a friend to chat
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
