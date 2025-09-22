import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Calendar, Search, Building2, MapPin, Clock, Star, Eye, MessageSquare } from 'lucide-react';
import { useAuth } from '../../App';

interface Application {
  id: string;
  opportunityTitle: string;
  organization: string;
  location: string;
  appliedDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'interview' | 'completed';
  lastUpdate: string;
  category: string;
  period: string;
  notes?: string;
  rating?: number;
  feedback?: string;
}

export function ApplicationsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Mock data for applications
  const [applications] = useState<Application[]>([
    {
      id: '1',
      opportunityTitle: '홍대 젊은 크리에이터 팝업 페스티벌',
      organization: '홍대문화재단',
      location: '홍대 걷고싶은거리',
      appliedDate: '2024.01.15',
      status: 'approved',
      lastUpdate: '2024.01.20',
      category: '패션/의류',
      period: '2024.03.15 - 2024.03.31',
      notes: '서류 검토 통과, 부스 배정 완료',
      rating: 4.8,
      feedback: '브랜드 컨셉이 참신하고 포트폴리오가 우수합니다.'
    },
    {
      id: '2',
      opportunityTitle: '강남역 지하상가 K-뷰티 팝업존',
      organization: '강남구청',
      location: '강남역 지하상가',
      appliedDate: '2024.01.18',
      status: 'interview',
      lastUpdate: '2024.01.22',
      category: '뷰티/화장품',
      period: '2024.04.01 - 2024.04.30',
      notes: '1차 서류 통과, 면접 일정: 2024.01.25 오후 2시',
      feedback: '제품 라인업이 흥미롭습니다. 면접에서 마케팅 전략을 더 자세히 듣고 싶습니다.'
    },
    {
      id: '3',
      opportunityTitle: '명동 K-패션 위크',
      organization: '서울패션위크',
      location: '명동 패션거리',
      appliedDate: '2024.01.10',
      status: 'pending',
      lastUpdate: '2024.01.12',
      category: '패션/의류',
      period: '2024.02.20 - 2024.03.05',
      notes: '서류 검토 중',
    },
    {
      id: '4',
      opportunityTitle: '건대 대학생 타겟 라이프스타일 마켓',
      organization: '광진구청',
      location: '건대입구역 일대',
      appliedDate: '2024.01.08',
      status: 'rejected',
      lastUpdate: '2024.01.16',
      category: '홈리빙',
      period: '2024.02.15 - 2024.02.29',
      feedback: '아쉽게도 이번 기회는 다른 셀러로 결정되었습니다. 다음 기회에 다시 지원해주세요.'
    },
    {
      id: '5',
      opportunityTitle: '잠실 롯데몰 신상품 런칭존',
      organization: '롯데몰',
      location: '잠실 롯데몰',
      appliedDate: '2024.01.05',
      status: 'completed',
      lastUpdate: '2024.01.30',
      category: '뷰티/화장품',
      period: '2024.01.15 - 2024.01.30',
      rating: 4.5,
      feedback: '성공적인 팝업스토어 운영이었습니다. 고객 응대와 매장 관리가 우수했습니다.'
    }
  ]);

  const statusOptions = [
    { value: 'all', label: '전체' },
    { value: 'pending', label: '검토중' },
    { value: 'approved', label: '승인됨' },
    { value: 'interview', label: '면접 대기' },
    { value: 'rejected', label: '거절됨' },
    { value: 'completed', label: '완료됨' }
  ];

  const categories = ['패션/의류', '뷰티/화장품', '액세서리', '홈리빙', '식품/음료', '문구/팬시', '아트/공예'];

  const filteredApplications = applications.filter(application => {
    const matchesSearch = application.opportunityTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || selectedStatus === 'all' || application.status === selectedStatus;
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || application.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">검토중</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">승인됨</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">거절됨</Badge>;
      case 'interview':
        return <Badge className="bg-blue-100 text-blue-800">면접 대기</Badge>;
      case 'completed':
        return <Badge className="bg-purple-100 text-purple-800">완료됨</Badge>;
      default:
        return null;
    }
  };

  const getStatusStats = () => {
    return {
      total: applications.length,
      pending: applications.filter(app => app.status === 'pending').length,
      approved: applications.filter(app => app.status === 'approved').length,
      interview: applications.filter(app => app.status === 'interview').length,
      rejected: applications.filter(app => app.status === 'rejected').length,
      completed: applications.filter(app => app.status === 'completed').length,
    };
  };

  const stats = getStatusStats();

  const ApplicationCard = ({ application }: { application: Application }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getStatusBadge(application.status)}
              <Badge variant="outline">{application.category}</Badge>
              {application.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs text-gray-600">{application.rating}</span>
                </div>
              )}
            </div>
            <CardTitle className="text-lg mb-2">{application.opportunityTitle}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {application.organization}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {application.location}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>기간: {application.period}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span>지원일: {application.appliedDate}</span>
            <span>최종 업데이트: {application.lastUpdate}</span>
          </div>

          {application.notes && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>진행 상황:</strong> {application.notes}
              </p>
            </div>
          )}

          {application.feedback && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>피드백:</strong> {application.feedback}
              </p>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button variant="outline" className="flex-1">
            <Eye className="h-4 w-4 mr-2" />
            상세 보기
          </Button>
          {(application.status === 'approved' || application.status === 'interview') && (
            <Button variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              문의하기
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">신청 현황</h1>
          <p className="mt-2 text-gray-600">지원한 팝업스토어 기회들의 진행 상황을 확인하세요</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">전체</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">검토중</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">승인됨</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">면접</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.interview}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">거절됨</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">완료됨</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.completed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="모집 공고 또는 기관명 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="상태" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
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
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">검색 조건에 맞는 신청 내역이 없습니다.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredApplications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}