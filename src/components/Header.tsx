import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Menu, LogOut, User, HelpCircle, MessageSquare, Store } from 'lucide-react';
import { useAuth } from '../App';

export function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { name: '모집공고', href: '/opportunities', icon: Store },
    { name: '커뮤니티', href: '/community', icon: MessageSquare },
    { name: 'Q&A', href: '/qna', icon: HelpCircle },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Menu className="h-6 w-6" />
              <span className="text-xl font-semibold">팝업스토어 커넥터</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                    location.pathname === item.href
                      ? 'bg-white/20'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {user.type === 'seller' && (
                  <Link to="/seller">
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      셀러 대시보드
                    </Button>
                  </Link>
                )}
                {user.type === 'organization' && (
                  <Link to="/organization">
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      기관 대시보드
                    </Button>
                  </Link>
                )}
                <Link to="/applications">
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    신청 현황
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.profileImage} alt={user.name} />
                        <AvatarFallback className="text-blue-600">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      프로필
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      로그아웃
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    로그인
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100">
                    회원가입
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}