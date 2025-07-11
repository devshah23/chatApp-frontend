/* eslint-disable react/display-name */
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Suspense, lazy, memo, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LayoutLoader } from "../components/layout/Loaders";
import AvatarCard from "../components/shared/AvatarCard";
import { Link } from "../components/styles/StyledComponents";
import { bgGradient, matBlack } from "../constants/color";
import { useDispatch, useSelector } from "react-redux";
import UserItem from "../components/shared/UserItem";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import {
  useChatDetailsQuery,
  useDeleteChatMutation,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/api";
import { setIsAddMember } from "../redux/reducers/misc";
import { motion } from "framer-motion";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);
const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);
  const myGroups = useMyGroupsQuery("");

  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );

  const [updateGroup, isLoadingGroupName] = useAsyncMutation(
    useRenameGroupMutation
  );
  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(
    useRemoveGroupMemberMutation
  );
  const [deleteGroup] = useAsyncMutation(useDeleteChatMutation);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [members, setMembers] = useState([]);

  const errors = [
    { isError: myGroups.isError, error: myGroups.error },
    { isError: groupDetails.isError, error: groupDetails.error },
  ];
  useErrors(errors);

  useEffect(() => {
    const groupData = groupDetails.data;
    if (groupData) {
      setGroupName(groupData.chat.name);
      setGroupNameUpdatedValue(groupData.chat.name);
      setMembers(groupData.chat.members);
    }
    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails.data]);

  const navigateBack = () => navigate("/");
  const handleMobile = () => setIsMobileMenuOpen((prev) => !prev);
  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateGroupName = () => {
    setIsEdit(false);
    updateGroup("Updating Group Name...", {
      chatId,
      name: groupNameUpdatedValue,
    });
  };

  const deleteHandler = () => {
    deleteGroup("Deleting Group...", chatId);
    setConfirmDeleteDialog(false);
    navigate("/groups");
  };

  const IconBtns = (
    <>
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}>
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title="Back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: "#ffffffcc",
            color: "#333",
            border: "1px solid #ccc",
            backdropFilter: "blur(4px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              bgcolor: "#ffffffee",
              transform: "scale(1.05)",
            },
            transition: "all 0.2s ease-in-out",
          }}
          onClick={navigateBack}>
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      p={3}>
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
            variant="outlined"
            size="small"
            sx={{
              bgcolor: "#ffffff",
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              input: {
                fontWeight: "bold",
                color: "#1a1a1a",
              },
            }}
          />
          <IconButton
            onClick={updateGroupName}
            disabled={isLoadingGroupName}
            sx={{
              bgcolor: "#1976d2",
              color: "#fff",
              "&:hover": { bgcolor: "#1565c0" },
              boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
            }}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(205deg, #1976d2, #d32f2f)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0px 1px 2px rgba(0,0,0,0.2)",
            }}>
            {groupName}
          </Typography>
          <IconButton
            disabled={isLoadingGroupName}
            onClick={() => setIsEdit(true)}
            sx={{
              color: "#1976d2",
              "&:hover": { color: "#0d47a1" },
            }}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack
      direction={{ xs: "column-reverse", sm: "row" }}
      spacing={2}
      p={{ xs: 0, sm: 2, md: "1rem 4rem" }}
      justifyContent="center"
      alignItems={{ xs: "stretch", sm: "center" }}>
      <Button
        size="large"
        startIcon={<DeleteIcon />}
        onClick={() => setConfirmDeleteDialog(true)}
        sx={{
          px: 3,
          py: 1.3,
          borderRadius: "1rem",
          textTransform: "none",
          color: "#b71c1c",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(0,0,0,0.1)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          "&:hover": {
            backgroundColor: "rgba(255, 205, 210, 0.8)",
          },
        }}>
        Delete Group
      </Button>

      <Button
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => dispatch(setIsAddMember(true))}
        sx={{
          px: 3,
          py: 1.3,
          borderRadius: "1rem",
          textTransform: "none",
          color: "#1b5e20",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(0,0,0,0.1)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          "&:hover": {
            backgroundColor: "rgba(200, 230, 201, 0.85)",
          },
        }}>
        Add Member
      </Button>
    </Stack>
  );

  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <Grid
      container
      height="100vh"
      sx={{
        backgroundImage:
          "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/96e750b6-3aea-4888-983a-d8f0a10ca98d/di04w97-65e15894-7da7-4bd2-be97-0d757006cb9f.png/v1/fill/w_540%2Ch_981%2Cq_80%2Cstrp/signal_wallpaper_light__whatsapp_style__by_damirap_di04w97-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTgxIiwicGF0aCI6IlwvZlwvOTZlNzUwYjYtM2FlYS00ODg4LTk4M2EtZDhmMGExMGNhOThkXC9kaTA0dzk3LTY1ZTE1ODk0LTdkYTctNGJkMi1iZTk3LTBkNzU3MDA2Y2I5Zi5wbmciLCJ3aWR0aCI6Ijw9NTQwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.3MDLFYyOSTXtV4BXx56WkqVB_Ic3S5CaqXbnAmoS91c')",
      }}>
      <Grid item sx={{ display: { xs: "none", sm: "block" } }} sm={4}>
        <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}>
        {IconBtns}

        {groupName && (
          <>
            {GroupName}
            <Typography
              variant="h6"
              alignSelf="flex-start"
              sx={{
                fontWeight: "bold",
                letterSpacing: "0.5px",
                mb: 1,
                ml: 2,
                color: "#1976d2",
                textTransform: "uppercase",
                borderBottom: "2px solid #1976d2",
                display: "inline-block",
                pb: 0.5,
              }}>
              Members
            </Typography>

            <Stack
              maxWidth="45rem"
              width="100%"
              boxSizing="border-box"
              spacing={3}
              height="50vh"
              overflow="auto"
              px={2}>
              {isLoadingRemoveMember ? (
                <CircularProgress />
              ) : (
                members.map((i) => (
                  <UserItem
                    user={i}
                    key={i._id}
                    isAdded
                    styling={{
                      boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                      padding: "1rem 1.5rem",
                      borderRadius: "1rem",
                      backgroundColor: "#ffffffaa",
                      backdropFilter: "blur(6px)",
                      transition: "transform 0.2s ease",
                      "&:hover": { transform: "scale(1.02)" },
                    }}
                    handler={(userId) =>
                      removeMember("Removing Member...", { chatId, userId })
                    }
                  />
                ))
              )}
            </Stack>

            {ButtonGroup}
          </>
        )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={() => setConfirmDeleteDialog(false)}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}

      <Drawer
        sx={{ display: { xs: "block", sm: "none" } }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}>
        <GroupsList
          w="50vw"
          myGroups={myGroups?.data?.groups}
          chatId={chatId}
        />
      </Drawer>
    </Grid>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack
    width={w}
    sx={{
      backgroundImage: bgGradient,
      height: "100vh",
      overflow: "auto",
      p: 1,
    }}>
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign="center" p={2}>
        No groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => chatId === _id && e.preventDefault()}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0.75rem",
          margin: "0.5rem",
          borderRadius: "12px",
          background: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          cursor: "pointer",
        }}>
        <AvatarCard avatar={avatar} />
        <Typography
          fontWeight={600}
          ml={2}
          fontSize="1.05rem"
          sx={{
            background: "linear-gradient(45deg, #355E3B, #228B22)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
          {name}
        </Typography>
      </motion.div>
    </Link>
  );
});

export default Groups;
