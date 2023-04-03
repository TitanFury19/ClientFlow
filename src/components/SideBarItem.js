import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MenuItem } from 'react-pro-sidebar'
import { Typography, useTheme } from "@mui/material";
import { tokens } from "../Themes";

const SideBarItem = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => navigate(to)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };

export {
    SideBarItem
}  