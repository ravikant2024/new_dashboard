import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import EventIcon from '@mui/icons-material/Event';
import EmailIcon from '@mui/icons-material/Email';
import PieChartIcon from '@mui/icons-material/PieChart';
import { getAllOrdersAsync, selectOrders } from '../../features/orders/OrderSlice';
import { useDispatch, useSelector } from 'react-redux';
import PendingIcon from '@mui/icons-material/Pending';
import { getAllCouponAsync, selectAllCoupons } from '../coupon/CouponSlice';
import { getAllUsersAsync, selectUsersList } from '../../features/user/UserSlice';
import { selectCategory } from '../category/CategorySlice';
import { fetchProductAllAsync, selectProducts, selectProductTotalResults } from '../../features/products/ProductsSlice';

const Dashboard = () => {
  const dispatch = useDispatch()
  const orderData = useSelector(selectOrders);
  const couponData = useSelector(selectAllCoupons);
  const usersList = useSelector(selectUsersList);
  const category = useSelector(selectCategory);
  const totalProducts = useSelector(selectProductTotalResults);
  const pendingData = orderData.filter(order => order.status === 'Pending').length
  const dispatched = orderData.filter(order => order.status === 'Dispatched').length
  const outfordelivery = orderData.filter(order => order.status === 'Out for delivery').length
  const delivered = orderData.filter(order => order.status === 'Delivered').length
  const cancelled = orderData.filter(order => order.status === 'Cancelled').length
  const redispatch = orderData.filter(order => order.status === 'redispatch').length
  const refund = orderData.filter(order => order.status === 'refund').length


  useEffect(() => {
    dispatch(getAllOrdersAsync())
    dispatch(getAllCouponAsync())
    dispatch(getAllUsersAsync())
    dispatch(fetchProductAllAsync())
  }, [dispatch])

  return (
    <>
      <Box sx={{ p: 1, color: 'white', fontFamily: 'sans-serif', marginLeft: '0px' }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {/* Card 1 */}
          <Box sx={{ flexBasis: '190px' }}>
            <Paper sx={{ p: 2, bgcolor: '#1E1E1E', textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                <span style={{ color: '##dfc9f7' }}>{pendingData}</span>
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey' }}>
                Pending orders
              </Typography>
              <PendingIcon sx={{ color: '##dfc9f7', mt: 1 }} />
            </Paper>
          </Box>

          {/* Card 2 */}
          <Box sx={{ flexBasis: '190px' }}>
            <Paper sx={{ p: 2, bgcolor: '#1E1E1E', textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                <span style={{ color: '#f10704' }}>{dispatched}</span>
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey' }}>
                Dispatched
              </Typography>
              <ArrowUpwardIcon sx={{ color: '#f10704', mt: 1 }} />
            </Paper>
          </Box>

          {/* Card 3 */}
          <Box sx={{ flexBasis: '190px' }}>
            <Paper sx={{ p: 2, bgcolor: '#1E1E1E', textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                <span style={{ color: '#d51913' }}>{outfordelivery}</span>
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey' }}>
                Out for delivery
              </Typography>
              <ArrowDownwardIcon sx={{ color: '#d51913', mt: 1 }} />
            </Paper>
          </Box>

          {/* Card 4 */}
          <Box sx={{ flexBasis: '190px' }}>
            <Paper sx={{ p: 2, bgcolor: '#1E1E1E', textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                <span style={{ color: '##fac0c0' }}>{cancelled}</span>
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey' }}>
                Cancelled
              </Typography>
              <ArrowUpwardIcon sx={{ color: '##fac0c0', mt: 1 }} />
            </Paper>
          </Box>

          {/* Card 5 */}
          <Box sx={{ flexBasis: '190px' }}>
            <Paper sx={{ p: 2, bgcolor: '#1E1E1E', textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                <span style={{ color: '#008000' }}>{delivered}</span>
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey' }}>
                Delivered
              </Typography>
              <ArrowUpwardIcon sx={{ color: '#008000', mt: 1 }} />
            </Paper>
          </Box>
          {/* Card 6 */}
          <Box sx={{ flexBasis: '190px' }}>
            <Paper sx={{ p: 2, bgcolor: '#1E1E1E', textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                <span style={{ color: '#008000' }}>{delivered}</span>
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey' }}>
                Contact Customer
              </Typography>
              <ArrowUpwardIcon sx={{ color: '#008000', mt: 1 }} />
            </Paper>
          </Box>
          {/* Card 7 */}
          <Box sx={{ flexBasis: '190px' }}>
            <Paper sx={{ p: 2, bgcolor: '#1E1E1E', textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                <span style={{ color: '#008000' }}>{redispatch}</span>
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey' }}>
                Redispatched
              </Typography>
              <ArrowUpwardIcon sx={{ color: '#008000', mt: 1 }} />
            </Paper>
          </Box>
          {/* Card 8 */}
          <Box sx={{ flexBasis: '190px' }}>
            <Paper sx={{ p: 2, bgcolor: '#1E1E1E', textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                <span style={{ color: '#008000' }}>{refund}</span>
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey' }}>
                Refund
              </Typography>
              <ArrowUpwardIcon sx={{ color: '#008000', mt: 1 }} />
            </Paper>
          </Box>
          {/* Card 9 */}
          <Box sx={{ flexBasis: '190px' }}>
            <Paper sx={{ p: 2, bgcolor: '#1E1E1E', textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                <span style={{ color: '#008000' }}>Download</span>
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey' }}>
                Download Records
              </Typography>
              <ArrowUpwardIcon sx={{ color: '#008000', mt: 1 }} />
            </Paper>
          </Box>
          {/* Card 10 */}
          <Box sx={{ flexBasis: '190px' }}>
            <Paper sx={{ p: 2, bgcolor: '#1E1E1E', textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                <span style={{ color: '#008000' }}>{usersList?.length}</span>
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey' }}>
                Total Users
              </Typography>
              <ArrowUpwardIcon sx={{ color: '#008000', mt: 1 }} />
            </Paper>
          </Box>
          {/* Card 11 */}
          <Box sx={{ flexBasis: '190px' }}>
            <Paper sx={{ p: 2, bgcolor: '#1E1E1E', textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                <span style={{ color: '#008000' }}>{category?.length}</span>
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey' }}>
                Total Category
              </Typography>
              <ArrowUpwardIcon sx={{ color: '#008000', mt: 1 }} />
            </Paper>
          </Box>
          {/* Card 12 */}
          <Box sx={{ flexBasis: '190px' }}>
            <Paper sx={{ p: 2, bgcolor: '#1E1E1E', textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                <span style={{ color: '#008000' }}>{totalProducts}</span>
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey' }}>
                Total Product
              </Typography>
              <ArrowUpwardIcon sx={{ color: '#008000', mt: 1 }} />
            </Paper>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 3 }}>
          {/* Transaction History */}
          <Box sx={{ flexBasis: '32%', minWidth: 310 }}>
            <Paper sx={{ p: 2, bgcolor: '#1E1E1E', height: 'auto' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
                Transaction History
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <PieChartIcon sx={{ fontSize: 40, color: 'white' }} /> {/* Pie chart icon */}
                <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1, color: 'white' }}>
                  1200
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey' }}>
                  Total
                </Typography>
              </Box>
              <Divider sx={{ my: 2, bgcolor: 'grey' }} />
              <List>
                <ListItem>
                  <ListItemText primary="Transfer to Paypal" secondary="$236" />
                  <ListItemText primary="07 Jan 2019, 09:12AM" secondary="" />
                </ListItem>
                <Divider sx={{ bgcolor: 'grey' }} />
                <ListItem>
                  <ListItemText primary="Transfer to Stripe" secondary="" />
                </ListItem>
              </List>
            </Paper>
          </Box>

          {/* Open Projects */}
          <Box sx={{ flexBasis: '33%', minWidth: 663 }}>
            <Paper sx={{ p: 2, bgcolor: '#1E1E1E' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'white' }}>
                Open Projects
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '36px' }}>
                    <InsertDriveFileIcon sx={{ color: '#2196F3' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Admin dashboard design"
                    secondary="Broadcast web app mockup"
                    sx={{
                      color: 'white',
                      '& .MuiTypography-body2': {
                        color: 'lightgrey',
                      }
                    }}
                  />
                  <ListItemText
                    primary="15 minutes ago"
                    secondary="30 tasks, 5 issues"
                    sx={{
                      textAlign: 'right',
                      color: 'white',
                      '& .MuiTypography-body2': {
                        color: 'lightgrey',
                      }
                    }}
                  />

                </ListItem>
                <Divider sx={{ bgcolor: 'grey' }} />
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '36px' }}>
                    <FolderIcon sx={{ color: '#4CAF50' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Wordpress Development"
                    secondary="Upload new design"
                    sx={{
                      color: 'white',
                      '& .MuiTypography-body2': {
                        color: 'lightgrey',
                      }
                    }}
                  />
                  <ListItemText
                    primary="1 hour ago"
                    secondary="23 tasks, 5 issues"
                    sx={{
                      textAlign: 'right',
                      color: 'white',
                      '& .MuiTypography-body2': {
                        color: 'lightgrey',
                      }
                    }} />
                </ListItem>
                <Divider sx={{ bgcolor: 'grey' }} />
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '36px' }}>
                    <EventIcon sx={{ color: '#9C27B0' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Project meeting"
                    secondary="New project discussion"
                    sx={{
                      color: 'white',
                      '& .MuiTypography-body2': {
                        color: 'lightgrey',
                      }
                    }}
                  />
                  <ListItemText
                    primary="35 minutes ago"
                    secondary="15 tasks, 2 issues"
                    sx={{
                      textAlign: 'right',
                      color: 'white',
                      '& .MuiTypography-body2': {
                        color: 'lightgrey',
                      }
                    }} />
                </ListItem>
                <Divider sx={{ bgcolor: 'grey' }} />
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '36px' }}>
                    <EmailIcon sx={{ color: '#FF9800' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Broadcast Mail"
                    secondary="Sent release details to team"
                    sx={{
                      color: 'white',
                      '& .MuiTypography-body2': {
                        color: 'lightgrey',
                      }
                    }}
                  />
                  <ListItemText
                    primary="55 minutes ago"
                    secondary="35 tasks, 7 issues"
                    sx={{
                      textAlign: 'right',
                      color: 'white',
                      '& .MuiTypography-body2': {
                        color: 'lightgrey',
                      }
                    }} />
                </ListItem>
                <Divider sx={{ bgcolor: 'grey' }} />
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '36px' }}>
                    <EmailIcon sx={{ color: '#FF9800' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="UI Design"
                    secondary="New application planning"
                    sx={{
                      color: 'white',
                      '& .MuiTypography-body2': {
                        color: 'lightgrey',
                      }
                    }}
                  />
                  <ListItemText
                    primary="50 minutes ago"
                    secondary="27 tasks, 4 issues"
                    sx={{
                      textAlign: 'right',
                      color: 'white',
                      '& .MuiTypography-body2': {
                        color: 'lightgrey',
                      }
                    }} />
                </ListItem>
              </List>

            </Paper>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {/* Card 1 */}
            <Box sx={{ flexBasis: '22%', minWidth: 210 }}>
              <Paper sx={{ p: 2, bgcolor: '#1E1E1E', textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                  $12.34 <span style={{ color: '#4CAF50' }}>+3.5%</span>
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey' }}>
                  Potential growth
                </Typography>
                <ArrowUpwardIcon sx={{ color: '#4CAF50', mt: 1 }} />
              </Paper>
            </Box>

            {/* Card 2 */}
            <Box sx={{ flexBasis: '22%', minWidth: 210 }}>
              <Paper sx={{ p: 2, bgcolor: '#1E1E1E', textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                  $17.34 <span style={{ color: '#4CAF50' }}>+11%</span>
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey' }}>
                  Revenue current
                </Typography>
                <ArrowUpwardIcon sx={{ color: '#4CAF50', mt: 1 }} />
              </Paper>
            </Box>

            {/* Card 3 */}
            <Box sx={{ flexBasis: '22%', minWidth: 210 }}>
              <Paper sx={{ p: 2, bgcolor: '#1E1E1E', textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                  $12.34 <span style={{ color: '#F44336' }}>-2.4%</span>
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey' }}>
                  Daily Income
                </Typography>
                <ArrowDownwardIcon sx={{ color: '#F44336', mt: 1 }} />
              </Paper>
            </Box>

            {/* Card 4 */}
            <Box sx={{ flexBasis: '22%', minWidth: 210 }}>
              <Paper sx={{ p: 2, bgcolor: '#1E1E1E', textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                  $31.53 <span style={{ color: '#4CAF50' }}>+3.5%</span>
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey' }}>
                  Expense current
                </Typography>
                <ArrowUpwardIcon sx={{ color: '#4CAF50', mt: 1 }} />
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    </>

  );
};

export default Dashboard;
