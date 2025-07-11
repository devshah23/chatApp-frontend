import { Avatar, Stack, Backdrop } from "@mui/material";
import { useState } from "react";
import { transformImage } from "../../lib/features";

const AvatarCard = ({ avatar = [], max = 4 }) => {
  const [open, setOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");

  const handleClick = (imgUrl) => {
    setSelectedImg(imgUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImg("");
  };

  return (
    <>
      <Stack direction="row" spacing={-1.5}>
        {avatar.slice(0, max).map((img, index) => (
          <Avatar
            key={index}
            src={transformImage(img)}
            alt={`Avatar ${index}`}
            onClick={() => handleClick(img)}
            sx={{
              width: "2.8rem",
              height: "2.8rem",
              border: "2px solid white",
              boxShadow: "0 0 6px rgba(0,0,0,0.15)",
              zIndex: avatar.length - index,
              cursor: "pointer",
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        ))}
      </Stack>

      {/* Backdrop for zoom effect */}
      <Backdrop
        open={open}
        onClick={handleClose}
        sx={{
          zIndex: 1300,
          backgroundColor: "rgba(0,0,0,0.7)",
        }}>
        <Avatar
          src={transformImage(selectedImg)}
          sx={{
            width: { xs: 200, sm: 300, md: 400 },
            height: { xs: 200, sm: 300, md: 400 },
            border: "4px solid white",
            boxShadow: "0 0 20px rgba(255,255,255,0.3)",
            objectFit: "contain",
            cursor: "zoom-out",
          }}
        />
      </Backdrop>
    </>
  );
};

export default AvatarCard;
