import { Link } from "../styles/StyledComponents";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";
import { motion } from "framer-motion";
import { memo } from "react";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
      sx={{ textDecoration: "none" }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 * index }}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0.5rem",
          borderRadius: "12px",
          backgroundColor: sameSender ? "#1f2b3d" : "#f5f5f5",
          color: sameSender ? "#ffffff" : "#1e1e1e",
          position: "relative",
          boxShadow: sameSender
            ? "0 4px 12px rgba(0, 0, 0, 0.3)"
            : "0 2px 6px rgba(0, 0, 0, 0.06)",
          transition: "background-color 0.3s ease",
          cursor: "pointer",
          marginBottom: "0.2rem",
        }}>
        <AvatarCard avatar={avatar} />

        <Stack spacing={0.5} sx={{ marginLeft: "1rem" }}>
          <Typography fontWeight={600}>{name}</Typography>
          {newMessageAlert && (
            <Typography
              variant="caption"
              sx={{
                color: sameSender ? "#e0f7fa" : "#1565c0",
                fontWeight: 500,
              }}>
              {newMessageAlert.count} New Message
              {newMessageAlert.count > 1 ? "s" : ""}
            </Typography>
          )}
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#4caf50",
              position: "absolute",
              top: "50%",
              right: "1.25rem",
              transform: "translateY(-50%)",
              boxShadow: "0 0 6px #4caf50",
            }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);
