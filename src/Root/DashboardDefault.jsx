import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import UseRoleQuery from '../CustomHooks/UseRoleQuery';

const DashboardDefault = () => {
  const { role, roleLoading } = UseRoleQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!roleLoading) {
      if (role === 'admin') {
        navigate('/dashboard/adminHome');
      } else if (role === 'seller') {
        navigate('/dashboard/sellerHome');
      } else if (role === 'user') {
        navigate('/dashboard/userProfile');
      }
    }
  }, [role, roleLoading, navigate]);

  return null;
};

export default DashboardDefault;
