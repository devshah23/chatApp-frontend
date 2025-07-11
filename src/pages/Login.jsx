import { useFileHandler, useInputValidation } from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { bgGradient } from "../constants/color";
import { server } from "../constants/config";
import { userExists } from "../redux/reducers/auth";
import { usernameValidator } from "../utils/validators";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");

  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");

    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "row",
      }}>
      <TypingLoginHeader />

      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          background: bgGradient,
          minHeight: "100vh",
          maxWidth: { xs: "100%", sm: "100%", md: "40%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Paper
          elevation={3}
          sx={{
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
            maxWidth: 400,
            width: {
              xs: "100%",
              sm: "90%",
              md: 400,
            },
            margin: "auto",
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          {isLogin ? (
            <>
              <Typography variant="h4" color="#355E3B" fontWeight="bold">
                LOGIN
              </Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleLogin}>
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />

                <Button
                  sx={{
                    marginTop: "1rem",
                    backgroundColor: (theme) => theme.palette.button.main,
                    color: (theme) => theme.palette.button.contrastText,
                    "&:hover": {
                      backgroundColor: "#228B22",
                    },
                  }}
                  variant="contained"
                  type="submit"
                  fullWidth
                  disabled={isLoading}>
                  Login
                </Button>

                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>

                <Button
                  disabled={isLoading}
                  fullWidth
                  variant="text"
                  onClick={toggleLogin}
                  sx={{
                    color: (theme) => theme.palette.button.main,
                    "&:hover": {
                      backgroundColor: "#d7f2d3",
                    },
                  }}>
                  Sign Up Now
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h4" color="#355E3B" fontWeight="bold">
                Sign Up
              </Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "0.75rem",
                }}
                onSubmit={handleSignUp}>
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.5)",
                      ":hover": {
                        bgcolor: "rgba(0,0,0,0.7)",
                      },
                    }}
                    component="label">
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>

                {avatar.error && (
                  <Typography
                    m={"1rem auto"}
                    width={"fit-content"}
                    display={"block"}
                    color="error"
                    variant="caption">
                    {avatar.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                />

                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />

                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />

                <Button
                  sx={{
                    marginTop: "1rem",
                    backgroundColor: (theme) => theme.palette.button.main,
                    color: (theme) => theme.palette.button.contrastText,
                    "&:hover": {
                      backgroundColor: "#228B22",
                    },
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isLoading}>
                  Sign Up
                </Button>

                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>

                <Button
                  sx={{
                    color: (theme) => theme.palette.button.main,
                    "&:hover": {
                      backgroundColor: "#d7f2d3",
                    },
                  }}
                  disabled={isLoading}
                  fullWidth
                  variant="text"
                  onClick={toggleLogin}>
                  Login Instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

const TypingLoginHeader = () => {
  return (
    <Grid
      item
      sx={{
        display: { xs: "none", sm: "none", md: "block" },
        width: { md: "85%", lg: "70%" },
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1684761949804-fd8eb9a5b6cc?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          px: 2,
        }}>
        <Typography
          variant="h3"
          sx={{
            color: "#355E3B",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            overflow: "hidden",
            borderRight: "3px solid #355E3B",
            width: "20ch",
            animation:
              "typing 3s steps(20) infinite alternate, blink 0.9s step-end infinite",
            fontFamily: "monospace",
          }}>
          Pulse of Connection
        </Typography>
        <style>{`
        @keyframes typing {
          from { width: 0 }
          to { width: 21ch }
        }

        @keyframes blink {
          50% { border-color: transparent }
        }
      `}</style>
      </Box>
    </Grid>
  );
};

export default Login;
