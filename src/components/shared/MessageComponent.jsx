import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightSkin } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import { motion } from "framer-motion";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;

  const sameSender = sender?._id === user?._id;

  const timeAgo = moment(createdAt).format("MMM DD, hh:mm A");

  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      style={{
        backgroundColor: "#065535",
        color: "#e6e6fa",
        borderRadius: sameSender
          ? "16px 16px 4px 16px"
          : "  16px 16px 16px 4px",
        padding: "12px 16px",
        maxWidth: "70%",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        alignSelf: sameSender ? "flex-end" : "flex-start",
      }}>
      {!sameSender && (
        <Typography color={lightSkin} fontWeight={"600"} variant="caption">
          {sender.name}
        </Typography>
      )}

      {content && <Typography>{content}</Typography>}

      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);

          return (
            <Box key={index}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: "black",
                }}>
                {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color={"#e6e6fa"}>
        {timeAgo}
      </Typography>
    </motion.div>
  );
};

export default memo(MessageComponent);
