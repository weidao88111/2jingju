import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  favorites: string[];
  activities: Activity[];
}

interface Activity {
  id: string;
  action: string;
  timestamp: string;
  link?: string;
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;
  addToFavorites: (itemId: string) => void;
  removeFromFavorites: (itemId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Hardcoded user data
const hardcodedUser: User = {
  id: '1',
  username: '京剧爱好者',
  email: 'user@example.com',
  avatar: '/images/user-avatar.svg',
  favorites: [
    '《霸王别姬》 - 经典京剧剧目',
    '《贵妃醉酒》 - 杨贵妃醉酒经典唱段赏析',
    '《四郎探母》 - 传统剧目介绍'
  ],
  activities: [
    {
      id: '1',
      action: '收藏了《霸王别姬》',
      timestamp: '2023-10-15 14:30',
      link: '/knowledge/plays/farewell-my-concubine'
    },
    {
      id: '2',
      action: '评论了《贵妃醉酒》视频',
      timestamp: '2023-10-10 09:45',
      link: '/resources/video/drunk-beauty'
    },
    {
      id: '3',
      action: '参与了社区讨论：京剧脸谱的象征意义',
      timestamp: '2023-09-28 16:20',
      link: '/community/discussion/facial-masks'
    },
    {
      id: '4',
      action: '浏览了梅兰芳艺术生平',
      timestamp: '2023-09-15 11:10',
      link: '/knowledge/artists/mei-lanfang'
    }
  ]
};

export const UserProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    // Simplified login: any non-empty input logs in the hardcoded user
    if (email && password) {
      setUser(hardcodedUser);
      return true;
    }
    return false;
  };

  const register = (username: string, email: string, password: string): boolean => {
    // Simplified register: any non-empty input registers/logs in the hardcoded user
    if (username && email && password) {
      setUser({ ...hardcodedUser, username, email });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addToFavorites = (itemId: string) => {
    setUser(currentUser => {
      if (!currentUser || currentUser.favorites.includes(itemId)) return currentUser;
      return {
        ...currentUser,
        favorites: [...currentUser.favorites, itemId]
      };
    });
  };

  const removeFromFavorites = (itemId: string) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      return {
        ...currentUser,
        favorites: currentUser.favorites.filter(id => id !== itemId)
      };
    });
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        login, 
        register, 
        logout, 
        addToFavorites, 
        removeFromFavorites 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 