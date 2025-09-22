import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Building2, User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../App';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'seller' | 'organization'>('seller');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - in real app, this would authenticate with backend
    if (formData.email && formData.password) {
      const mockUser = {
        id: '1',
        name: userType === 'seller' ? '김셀러' : '서울문화재단',
        email: formData.email,
        type: userType,
        profileImage: undefined
      };
      
      login(mockUser);
      navigate(userType === 'seller' ? '/seller' : '/organization');
    } else {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">로그인</h1>
          <p className="mt-2 text-gray-600">팝업스토어 커넥터에 오신 것을 환영합니다</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>계정 유형 선택</CardTitle>
            <CardDescription>로그인할 계정 유형을 선택해주세요</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={userType} onValueChange={(value) => setUserType(value as 'seller' | 'organization')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="seller" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  셀러
                </TabsTrigger>
                <TabsTrigger value="organization" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  기관
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="seller" className="space-y-4 mt-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <User className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-blue-800">
                    셀러로 로그인하여 다양한 팝업스토어 기회를 찾아보세요
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="organization" className="space-y-4 mt-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Building2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-green-800">
                    기관으로 로그인하여 맞춤형 셀러를 모집하고 관리하세요
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                로그인
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                계정이 없으신가요?{' '}
                <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                  회원가입
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo credentials */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm">데모 계정 안내</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-gray-600">
            <p>셀러: seller@demo.com / password123</p>
            <p>기관: org@demo.com / password123</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}