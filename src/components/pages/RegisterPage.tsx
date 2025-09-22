import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Building2, User, Mail, Lock, Phone, MapPin, FileText } from 'lucide-react';

export function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') as 'seller' | 'organization' | null;
  
  const [userType, setUserType] = useState<'seller' | 'organization'>(initialType || 'seller');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    address: '',
    businessType: '',
    description: '',
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false
  });

  const businessTypes = {
    seller: ['패션/의류', '뷰티/화장품', '액세서리', '홈리빙', '식품/음료', '문구/팬시', '아트/공예', '기타'],
    organization: ['문화재단', '지자체', '백화점', '쇼핑몰', '전시장', '이벤트업체', '기타']
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.email || !formData.password || !formData.name) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    if (!formData.agreeTerms || !formData.agreePrivacy) {
      alert('필수 약관에 동의해주세요.');
      return;
    }

    // Mock registration success
    alert('회원가입이 완료되었습니다. 로그인해주세요.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">회원가입</h1>
          <p className="mt-2 text-gray-600">팝업스토어 커넥터에서 새로운 기회를 시작하세요</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>계정 정보 입력</CardTitle>
            <CardDescription>정확한 정보를 입력해주시면 더 나은 서비스를 제공해드릴 수 있습니다</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={userType} onValueChange={(value) => setUserType(value as 'seller' | 'organization')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="seller" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  셀러 가입
                </TabsTrigger>
                <TabsTrigger value="organization" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  기관 가입
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">기본 정보</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">이메일 *</Label>
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
                      <Label htmlFor="name">
                        {userType === 'seller' ? '이름/상호명 *' : '기관명 *'}
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="name"
                          placeholder={userType === 'seller' ? '이름 또는 상호명' : '기관명을 입력하세요'}
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="pl-9"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">비밀번호 *</Label>
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

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">비밀번호 확인 *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="비밀번호를 다시 입력하세요"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="pl-9"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">연락처</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          placeholder="연락처를 입력하세요"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="pl-9"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessType">
                        {userType === 'seller' ? '사업 분야' : '기관 유형'}
                      </Label>
                      <Select value={formData.businessType} onValueChange={(value) => setFormData(prev => ({ ...prev, businessType: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="선택해주세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes[userType].map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">주소</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="address"
                        placeholder="주소를 입력하세요"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">
                      {userType === 'seller' ? '사업 소개' : '기관 소개'}
                    </Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Textarea
                        id="description"
                        placeholder={userType === 'seller' ? 
                          '판매하는 제품이나 브랜드에 대해 간단히 소개해주세요' : 
                          '기관의 특징이나 운영하는 공간에 대해 간단히 소개해주세요'}
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="pl-9"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">약관 동의</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeTerms: !!checked }))}
                      />
                      <Label htmlFor="agreeTerms" className="text-sm">
                        이용약관에 동의합니다 (필수) *
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreePrivacy"
                        checked={formData.agreePrivacy}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreePrivacy: !!checked }))}
                      />
                      <Label htmlFor="agreePrivacy" className="text-sm">
                        개인정보 처리방침에 동의합니다 (필수) *
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeMarketing"
                        checked={formData.agreeMarketing}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeMarketing: !!checked }))}
                      />
                      <Label htmlFor="agreeMarketing" className="text-sm">
                        마케팅 정보 수신에 동의합니다 (선택)
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" className="flex-1">
                    회원가입
                  </Button>
                  <Button type="button" variant="outline" className="flex-1" asChild>
                    <Link to="/login">
                      이미 계정이 있어요
                    </Link>
                  </Button>
                </div>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}