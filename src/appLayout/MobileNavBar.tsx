import { Layout, Button, Badge, Avatar, Drawer, Divider, Image } from 'antd';
import { useEffect, useState } from 'react';
import { useGetNotifications } from '@/app/api/dashboard';
import { useProfile } from '@/utils/useProfile';
import {
  useClearNotifications,
  useDeleteNotifications,
} from '@/app/api/settings';
import { formatDate } from '@/utils/formatDate';

const { Header } = Layout;

interface MobileNavBarProfileProps {
  setCollapsed: (collapsed: boolean) => void;
  collapsed: boolean;
}

const MobileNavBarProfile: React.FC<MobileNavBarProfileProps> = ({
  setCollapsed,
  collapsed,
}) => {
  const { profile } = useProfile();
  const name = `${profile?.user_profile?.full_name}`;
  const matches = name.match(/\b(\w)/g);
  const acronym = matches?.join('');

  const { data: notificationList } = useGetNotifications();
  const [visible, setVisible] = useState(false);
  const { mutateAsync: deleteNotifications } = useDeleteNotifications();
  const { mutateAsync: clearNotifications } = useClearNotifications();

  const handleClose = () => {
    setVisible(false);
  };

  const handleClearAllNotifications = () => {
    clearNotifications();
  };

  const handleDeleteNotification = async (id: string) => {
    await deleteNotifications(id);
  };

  const toggleDrawer = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (visible) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [visible]);

  return (
    <>
      <Header className="flex items-center px-4 navbar-container fixed header mobile-nav mobile-sidebar lg:hidden !bg-[#eeeef1] border-b-2 border-blue-500">
        <div
          className={`flex items-center ${collapsed ? `justify-center` : `justify-end`} mt-5 block lg:hidden`}
        >
          <Button
            type="text"
            className="bg-transparent"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 bg-transparent"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            )}
          </Button>
        </div>
        <div className={`flex-shrink-0 ${collapsed ? `` : `justify-start`}`}>
          <Image src="/images/Logo.png" alt="Logo" width={48} height={48} />
        </div>
        <div className="flex items-center p-10 space-x-3 mt-5">
          <div onClick={() => toggleDrawer()}>
            <Badge
              count={
                notificationList?.length > 9 ? '9+' : notificationList?.length
              }
              overflowCount={9}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
                <path
                  fillRule="evenodd"
                  d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </Badge>
          </div>
          <span className="flex cursor-pointer items-center space-x-3 ml-4">
            <Avatar size={25} style={{ background: '#4090A2' }}>
              {acronym}
            </Avatar>
          </span>
        </div>
      </Header>

      <Drawer
        title="Notifications"
        placement="right"
        onClose={handleClose}
        open={visible}
        width="90%"
        className="notification-drawer"
        style={{ marginRight: '20px' }}
        bodyStyle={{ padding: 0 }}
      >
        <div className="flex flex-col p-4 space-y-4 h-full overflow-y-auto">
          {notificationList && notificationList.length > 0 ? (
            notificationList.map((notification: any) => (
              <div
                key={notification.id}
                className="flex justify-between p-3 w-full border-b"
              >
                <div className="flex space-x-6">
                  <Avatar
                    style={{
                      width: 24,
                      height: 24,
                      background: '#5E60CE',
                      fontSize: 12,
                    }}
                  />
                  <div className="flex flex-col space-y-3 ml-2">
                    <span className="text-[16px]">{notification.message}</span>
                    <span className="text-[12px]">
                      {formatDate(notification.timestamp)}
                    </span>
                  </div>
                </div>
                <Button
                  type="text"
                  onClick={() => handleDeleteNotification(notification.id)}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-red-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.11 14 3.65 14 4.228v.34a51.344 51.344 0 0 1-3.636 0v-.34c0-.578-.391-1.118-.974-1.202ZM8 10.228a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm5 0a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                />
              </div>
            ))
          ) : (
            <p className="text-center">No notifications</p>
          )}
          <Divider />
          <Button
            type="text"
            className="text-red-500 text-center"
            onClick={handleClearAllNotifications}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-red-500"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                  clipRule="evenodd"
                />
              </svg>
            }
          >
            Clear All Notifications
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default MobileNavBarProfile;
