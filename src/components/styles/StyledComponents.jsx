import { Skeleton, keyframes, styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";

const VisuallyHiddenInput = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  padding: 0.2rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const InputBox = styled("input")`
  height: 100%;
  border: none;
  outline: none;
  padding: 0 3rem;
  border-radius: 1.5rem;
  background-color: #e0e0e0;
`;

const bounceAnimation = keyframes`
0% { transform: scale(1); }
50% { transform: scale(1.5); }
100% { transform: scale(1); }
`;

const BouncingSkeleton = styled(Skeleton)(() => ({
  animation: `${bounceAnimation} 1s infinite`,
}));

const RoundedSkeleton = styled(Skeleton)(() => ({
  borderRadius: "12px",
  backgroundColor: "#fff",
}));

export {
  InputBox,
  Link,
  VisuallyHiddenInput,
  BouncingSkeleton,
  RoundedSkeleton,
};
