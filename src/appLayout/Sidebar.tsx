import { useCallback, useEffect, useState } from 'react';
import { Menu, Layout, Input, Button } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import {
  HistoryOutlined,
  LogoutOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { UpgradeToPremiumCard } from '@/utils/Upgrade';
import { SettingsModal } from '@/app/modules/settings/settings';
import { useAuth } from '@/app/modules/auth/hooks/useAuth';
import securedStorage from 'react-secure-storage';
import { ClearHistory } from '@/app/modules/dashboard/component/clearHistory';
import { Feedback } from '@/app/modules/dashboard/component/feedback';
import { useGetHistory } from '@/app/api/dashboard';
import { useArticleContext } from '@/contexts/article-context';
import { PreviousHistory } from '@/app/modules/dashboard/component/previousHistory';
import { sliceSentence } from '@/utils/sliceSentence';
import { useRenameArticle } from '@/app/api/article';

const { Sider } = Layout;
const { SubMenu } = Menu;

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

function SideBar({ collapsed, setCollapsed }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [current, setCurrent] = useState('/');
  const [settingsModal, setSettingsModal] = useState(false);
  const { signOut, setLoggingOut } = useAuth();
  const [clear, setClear] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [previous, setPrevious] = useState(false);
  const { setArticleData } = useArticleContext();
  const [isEditing, setIsEditing] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [hoveredArticle, setHoveredArticle] = useState(null);
  const { mutateAsync: renameArticle } = useRenameArticle();
  const sidebarClass = collapsed ? 'sidebar-open' : '';

  const { data: history } = useGetHistory();
  const [searchText, setSearchText] = useState('');
  const [filteredHistory, setFilteredHistory] = useState(history);

  const handleRouteChange = (pathname: string) => {
    const path = pathname.split('/');
    return path[1];
  };

  const onClick = (e: any) => {
    setCurrent(e.key);
    if (e.key.startsWith('/')) {
      router.push(`${e.key}`);
    } else {
      switch (e.key) {
        case 'settings':
          setSettingsModal(true);
          break;
        case 'clear':
          setClear(true);
          break;
        case 'feedback':
          setFeedback(true);
          break;
        case 'previous':
          setPrevious(true);
          break;
        case 'recent':
          setCollapsed(false);
          break;
        default:
          router.push(`${e.key}`);
      }
    }
  };

  const setData = (key: string) => {
    const article = history.find((item: any) => item.id === key);
    if (article) {
      setArticleData(article);
      router.push(`/article/${article?.id}`);
    }
  };

  const handleEdit = (id: any, title: any) => {
    setIsEditing(id);
    setNewTitle(title);
  };

  const handleRename = async (id: any) => {
    await renameArticle({ article_id: id, new_name: newTitle });
    setIsEditing(null);
    setNewTitle('');
  };

  const logoutCallBack = () => {
    setLoggingOut(false);
    securedStorage.removeItem('jwt_token');
    setTimeout(() => router.push('/sign-in'), 500);
  };

  const handleSignOut = () => {
    signOut(
      {
        all: false,
        email: '',
      },
      logoutCallBack,
    );
  };

  const handleSearch = (e: any) => {
    const value = e.target.value;
    setSearchText(value);
    if (value) {
      const filtered = history.filter((item: any) =>
        item.title.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredHistory(filtered);
    } else {
      setFilteredHistory(history);
    }
  };

  const items = useCallback(
    () =>
      [
        {
          label: 'Clear History',
          key: 'clear',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                clipRule="evenodd"
              />
            </svg>
          ),
        },
        {
          label: 'Community',
          key: '/community',
          disabled: true,
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                clipRule="evenodd"
              />
              <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
            </svg>
          ),
        },
        {
          label: 'Feedback and Support',
          key: 'feedback',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
            </svg>
          ),
        },
        {
          label: 'Settings',
          key: 'settings',
          icon: (
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
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          ),
        },
      ].filter(Boolean) as any,
    [],
  );

  useEffect(() => {
    setCurrent(`/${handleRouteChange(pathname)}`);
  }, [pathname]);

  useEffect(() => {
    setFilteredHistory(history);
  }, [history]);

  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={320}
        className={`fixed top-0 left-0 h-full hidden lg:block bg-white web-sidebar overflow-y-auto ${sidebarClass}`}
        style={{ position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 1000 }}
      >
        <div
          className={`flex items-center ${collapsed ? `justify-center` : `justify-end`} mt-5`}
        >
          {collapsed ? (
            <Button
              type="text"
              className="bg-transparent"
              onClick={() => setCollapsed(!collapsed)}
            >
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
            </Button>
          ) : (
            <Button
              type="text"
              className="bg-transparent flex justify-end"
              onClick={() => setCollapsed(!collapsed)}
            >
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
            </Button>
          )}
        </div>
        <div className="flex justify-center items-center mt-20 p-5">
          {collapsed ? (
            <SearchOutlined className="w-6 h-6 z-100 block text-black" />
          ) : (
            <Input
              size="large"
              value={searchText}
              onChange={handleSearch}
              placeholder="Search"
              className="w-2/6"
              prefix={<SearchOutlined />}
            />
          )}
        </div>
        <div
          className="mt-5 mb-5 text-black"
          onClick={() => router.push('/dashboard')}
        >
          {collapsed ? (
            <span style={{ marginLeft: '33px' }}>
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
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </span>
          ) : (
            <Button
              style={{ marginLeft: '13px' }}
              type="link"
              className="text-black"
              icon={
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
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              }
            >
              {' '}
              New Chat{' '}
            </Button>
          )}
        </div>
        <div className="-mt-10 -mb-10">
          <Menu mode="inline" onClick={onClick} selectedKeys={[current]}>
            {collapsed && (
              <SubMenu key="sub1" icon={<HistoryOutlined />} title="User">
                <Menu.Item key="recent">Recent History</Menu.Item>
                <Menu.Item key="previous">Previous History</Menu.Item>
              </SubMenu>
            )}
          </Menu>
        </div>
        <div className="mx-10 mt-2">
          {collapsed ? null : (
            <>
              <Button
                style={{ marginLeft: '13px' }}
                type="link"
                className="text-black"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              >
                {' '}
                Recent History{' '}
              </Button>
              <div className="mt-3">
                {filteredHistory?.length > 0 &&
                  filteredHistory
                    .slice()
                    .reverse()
                    .slice(0, 5)
                    .map((article: any) => (
                      <div
                        key={`history/recent/${article.id}`}
                        className="flex items-center relative"
                        onMouseEnter={() => setHoveredArticle(article.id)}
                        onMouseLeave={() => setHoveredArticle(null)}
                      >
                        {isEditing === article.id ? (
                          <Input
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            onBlur={() => handleRename(article.id)}
                            onPressEnter={() => handleRename(article.id)}
                            autoFocus
                            className="text-xs"
                            style={{ marginLeft: '35px', width: '200px' }}
                          />
                        ) : (
                          <Button
                            type="link"
                            className="text-black text-xs flex items-center"
                            style={{ marginLeft: '35px' }}
                            onClick={() => setData(article?.id)}
                            icon={
                              article?.type === 'article' ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="size-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                  />
                                </svg>
                              )
                            }
                          >
                            {sliceSentence(article.title)}
                          </Button>
                        )}
                        {hoveredArticle === article.id && !isEditing && (
                          <Button
                            type="link"
                            className="ml-2 text-xs absolute right-0"
                            onClick={() =>
                              handleEdit(article.id, article.title)
                            }
                            icon={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-primary"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                              </svg>
                            }
                          />
                        )}
                      </div>
                    ))}
              </div>
            </>
          )}
        </div>
        <div className="mt-5">
          {collapsed ? null : (
            <Button
              style={{ marginLeft: '13px' }}
              type="link"
              className="text-black"
              onClick={() => setPrevious(true)}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              }
            >
              {' '}
              Previous History{' '}
            </Button>
          )}
        </div>
        <div className="flex justify-center items-center mt-1 mb-4">
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="inline"
            items={items()}
            className="h-full overflow-y-auto"
          />
        </div>

        {collapsed ? null : <UpgradeToPremiumCard />}

        <div className="mx-10 mt-2" onClick={handleSignOut}>
          {collapsed ? (
            <span className="!ml-10 text-black" style={{ marginLeft: '33px' }}>
              <LogoutOutlined />
            </span>
          ) : (
            <Button
              style={{ marginLeft: '13px' }}
              type="link"
              className="text-black"
              icon={<LogoutOutlined />}
            >
              {' '}
              Logout{' '}
            </Button>
          )}
        </div>
      </Sider>
      <SettingsModal
        settingsModal={settingsModal}
        setSettingsModal={setSettingsModal}
      />
      <ClearHistory clear={clear} setClear={setClear} />
      <Feedback feedback={feedback} setFeedback={setFeedback} />
      <PreviousHistory previous={previous} setPrevious={setPrevious} />
    </>
  );
}

export default SideBar;
