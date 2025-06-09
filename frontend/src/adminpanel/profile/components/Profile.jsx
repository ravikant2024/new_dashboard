import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  LinearProgress,
  Divider,
  Stack
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../../features/user/UserSlice';

const Profile = () => {
  const adminInfo = useSelector(selectUserInfo);
;

  return (
    <Box
      sx={{
        width: 1020,
        p: 2,
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        bgcolor: 'background.paper',
        height: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ width: 80, height: 80, mb: 1 }}>
          <AccountCircleIcon sx={{ fontSize: 80 }} />
        </Avatar>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {adminInfo.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          About: Frontend Developer
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {adminInfo.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          00-00-00-00-00
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Replacing Grid with Box and Stack */}
      <Stack spacing={2}>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            Web Applications
          </Typography>
          <LinearProgress variant="determinate" value={85} sx={{ mt: 1 }} />
          <Typography variant="caption" sx={{ mt: 0.5 }}>
            85%
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            Website Design
          </Typography>
          <LinearProgress variant="determinate" value={78} sx={{ mt: 1 }} />
          <Typography variant="caption" sx={{ mt: 0.5 }}>
            78%
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            Automation & Testing
          </Typography>
          <LinearProgress variant="determinate" value={47} sx={{ mt: 1 }} />
          <Typography variant="caption" sx={{ mt: 0.5 }}>
            47%
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default Profile;
