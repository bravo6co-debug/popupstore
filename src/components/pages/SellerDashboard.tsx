import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Calendar, Clock, MapPin, Search, Filter, Building2, Users, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../App';

interface Opportunity {
  id: string;
  title: string;
  organization: string;
  location: string;
  period: string;
  deadline: string;
  category: string;
  description: string;
  requirements: string[];
  benefits: string[];
  status: 'open' | 'closed' | 'upcoming';
  applicants: number;
  maxApplicants: number;
  rating: number;
  tags: string[];
}

interface Application {
  id: string;
  opportunityTitle: string;
  organization: string;
  appliedDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'interview';
  lastUpdate: string;
}

export function SellerDashboard() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Mock data for opportunities
  const [opportunities] = useState<Opportunity[]>([
    {
      id: '1',
      title: '홍대 젊은 크리에이터 팝업 페스티벌',
      organization: '홍대문화재단',
      location: '홍대 걷고싶은거리',
      period: '2024.03.15 - 2024.03.31',
      deadline: '2024.02.28',
      category: '패션/의류',
      description: '20-30대 타겟의 젊은 크리에이터들을 위한 팝업스토어 페스티벌입니다. 신진 디자이너와 브랜드들에게 홍보 기회를 제공합니다.',
      requirements: ['신진 브랜드 (설립 3년 이내)', '온라인 포트폴리오 필수', '인스타그램 팔로워 1000명 이상'],
      benefits: ['부스 임대료 50% 할인', '마케팅 지원', '언론 보도'],
      status: 'open',
      applicants: 15,
      maxApplicants: 30,
      rating: 4.8,
      tags: ['신진브랜드', '마케팅지원', '홍대', '페스티벌']
    },
    {
      id: '2',
      title: '강남역 지하상가 K-뷰티 팝업존',
      organization: '강남구청',
      location: '강남역 지하상가',
      period: '2024.04.01 - 2024.04.30',
      deadline: '2024.03.15',
      category: '뷰티/화장품',
      description: '한국 뷰티 브랜드들을 위한 전용 팝업존 운영. 높은 유동인구와 뷰티에 관심이 많은 타겟층이 특징입니다.',
      requirements: ['K-뷰티 브랜드', '제품 안전성 인증 필수', '영업 경험 1년 이상'],
      benefits: ['프리미엄 위치', '공동 마케팅', '방송 촬영 기회'],
      status: 'open',
      applicants: 8,
      maxApplicants: 12,
      rating: 4.6,
      tags: ['K-뷰티', '강남', '프리미엄위치']
    },
    {
      id: '3',
      title: '이태원 글로벌 아트 마켓',
      organization: '용산구 문화재단',
      location: '이태원 문화공간',
      period: '2024.05.10 - 2024.05.20',
      deadline: '2024.04.25',
      category: '아트/공예',
      description: '해외 관광객들을 타겟으로 한 한국 전통 공예와 현대 아트의 만남. 글로벌 시장 진출 기회를 제공합니다.',
      requirements: ['아트/공예 관련', '영어 소통 가능', '해외 판매 경험 우대'],
      benefits: ['통역 서비스', '국제 배송 지원', '해외 바이어 연결'],
      status: 'upcoming',
      applicants: 3,
      maxApplicants: 20,
      rating: 4.9,
      tags: ['글로벌', '아트', '관광객', '이태원']
    }
  ]);

  // Mock data for applications
  const [applications] = useState<Application[]>([
    {
      id: '1',
      opportunityTitle: '명동 K-패션 위크',
      organization: '서울패션위크',
      appliedDate: '2024.01.15',
      status: 'interview',
      lastUpdate: '2024.01.20'
    },
    {
      id: '2',
      opportunityTitle: '건대 대학생 타겟 라이프스타일 마켓',
      organization: '광진구청',
      appliedDate: '2024.01.10',
      status: 'approved',
      lastUpdate: '2024.01.18'
    },
    {
      id: '3',
      opportunityTitle: '잠실 롯데몰 신상품 런칭존',
      organization: '롯데몰',
      appliedDate: '2024.01.08',
      status: 'pending',
      lastUpdate: '2024.01.12'
    }
  ]);

  const locations = ['홍대', '강남', '이태원', '명동', '건대', '잠실', '신촌', '압구정'];
  const categories = ['패션/의류', '뷰티/화장품', '액세서리', '홈리빙', '식품/음료', '문구/팬시', '아트/공예'];

  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || selectedLocation === 'all' || opportunity.location.includes(selectedLocation);
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || opportunity.category === selectedCategory;
    const matchesStatus = !selectedStatus || selectedStatus === 'all' || opportunity.status === selectedStatus;
    
    return matchesSearch && matchesLocation && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-green-100 text-green-800">모집중</Badge>;
      case 'closed':
        return <Badge className="bg-red-100 text-red-800">마감</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">예정</Badge>;
      default:
        return null;
    }
  };

  const getApplicationStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">검토중</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">승인</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">거절</Badge>;
      case 'interview':
        return <Badge className="bg-blue-100 text-blue-800">면접대기</Badge>;
      default:
        return null;
    }
  };

  const OpportunityCard = ({ opportunity }: { opportunity: Opportunity }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getStatusBadge(opportunity.status)}
              <Badge variant="outline">{opportunity.category}</Badge>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="text-xs text-gray-600">{opportunity.rating}</span>
              </div>
            </div>
            <CardTitle className="text-lg mb-2">{opportunity.title}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {opportunity.organization}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {opportunity.location}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">{opportunity.description}</p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>기간: {opportunity.period}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>마감: {opportunity.deadline}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-gray-400" />
              <span>지원자: {opportunity.applicants}/{opportunity.maxApplicants}</span>
            </div>
            <div className="text-green-600 font-medium">
              경쟁률: {(opportunity.applicants / opportunity.maxApplicants * 100).toFixed(0)}%
            </div>
          </div>
        </div>

        {opportunity.tags && (
          <div className="flex flex-wrap gap-1 mt-4">
            {opportunity.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex gap-2 mt-4">
          <Button className="flex-1" disabled={opportunity.status === 'closed'}>
            {opportunity.status === 'closed' ? '마감됨' : '지원하기'}
          </Button>
          <Button variant="outline">자세히 보기</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">셀러 대시보드</h1>
          <p className="mt-2 text-gray-600">안녕하세요, {user?.name}님! 새로운 팝업스토어 기회를 찾아보세요.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">총 지원</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-600">+2 지난주 대비</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">승인됨</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">8</div>
              <p className="text-xs text-gray-600">66% 승인율</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">진행중</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">3</div>
              <p className="text-xs text-gray-600">현재 운영중</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">평균 평점</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1">
                <div className="text-2xl font-bold">4.7</div>
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
              </div>
              <p className="text-xs text-gray-600">총 25개 리뷰</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="opportunities" className="space-y-6">
          <TabsList>
            <TabsTrigger value="opportunities">모집 탐색</TabsTrigger>
            <TabsTrigger value="applications">내 신청 현황</TabsTrigger>
          </TabsList>

          <TabsContent value="opportunities" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="팝업스토어 기회 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="지역" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">전체</SelectItem>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="카테고리" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">전체</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="상태" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">전체</SelectItem>
                        <SelectItem value="open">모집중</SelectItem>
                        <SelectItem value="upcoming">예정</SelectItem>
                        <SelectItem value="closed">마감</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Opportunities List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredOpportunities.map((opportunity) => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>내 지원 현황</CardTitle>
                <CardDescription>지원한 팝업스토어 기회들의 진행 상황을 확인하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.map((application) => (
                    <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <h3 className="font-medium">{application.opportunityTitle}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span>{application.organization}</span>
                          <span>지원일: {application.appliedDate}</span>
                          <span>최종 업데이트: {application.lastUpdate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getApplicationStatusBadge(application.status)}
                        <Button variant="ghost" size="sm">
                          상세 보기
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}