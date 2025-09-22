import React, { useState } from 'react';
import { useAuth } from '../../App';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { MapPin, Calendar, Users, Clock, Search, Filter } from 'lucide-react';

interface PopupOpportunity {
  id: string;
  organizationId: string;
  organizationName: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  maxSellers: number;
  currentSellers: number;
  category: string;
  requirements: string[];
  benefits: string[];
  fee: number;
  applicationDeadline: string;
  status: 'active' | 'closed' | 'upcoming';
  createdAt: string;
}

// 모의 데이터
const mockOpportunities: PopupOpportunity[] = [
  {
    id: '1',
    organizationId: 'org1',
    organizationName: '롯데백화점 강남점',
    title: '신진 디자이너 브랜드 팝업스토어',
    description: '새로운 패션 브랜드들을 위한 특별한 기회입니다. 프리미엄 위치에서 고객들에게 브랜드를 알릴 수 있습니다.',
    location: '서울 강남구 테헤란로',
    startDate: '2024-03-15',
    endDate: '2024-03-25',
    maxSellers: 5,
    currentSellers: 2,
    category: '패션',
    requirements: ['사업자등록증', '상품 사진 포트폴리오', '브랜드 소개서'],
    benefits: ['무료 매장 인테리어', '마케팅 지원', '매출 리포트 제공'],
    fee: 500000,
    applicationDeadline: '2024-03-01',
    status: 'active',
    createdAt: '2024-02-01'
  },
  {
    id: '2',
    organizationId: 'org2',
    organizationName: '현대백화점 판교점',
    title: '라이프스타일 브랜드 모집',
    description: '홈데코, 생활용품 브랜드를 위한 팝업스토어 기회입니다. 젊은 고객층이 많은 판교점에서 진행됩니다.',
    location: '경기도 성남시 분당구',
    startDate: '2024-03-20',
    endDate: '2024-04-05',
    maxSellers: 3,
    currentSellers: 1,
    category: '라이프스타일',
    requirements: ['제품 카탈로그', '품질인증서', '판매 경험'],
    benefits: ['프리미엄 위치', '고객 맞춤 디스플레이', 'SNS 마케팅 지원'],
    fee: 800000,
    applicationDeadline: '2024-03-05',
    status: 'active',
    createdAt: '2024-02-05'
  },
  {
    id: '3',
    organizationId: 'org3',
    organizationName: '코엑스몰',
    title: 'K-뷰티 브랜드 특별 전시',
    description: '해외 관광객들을 타겟으로 한 K-뷰티 브랜드 팝업스토어입니다. 국제적인 노출 기회를 제공합니다.',
    location: '서울 강남구 영동대로',
    startDate: '2024-04-01',
    endDate: '2024-04-15',
    maxSellers: 8,
    currentSellers: 6,
    category: '뷰티',
    requirements: ['FDA 승인서류', '영문 제품설명서', '수출 경험'],
    benefits: ['글로벌 고객 접점', '통역 서비스', '해외 바이어 연결'],
    fee: 1200000,
    applicationDeadline: '2024-03-10',
    status: 'active',
    createdAt: '2024-02-10'
  }
];

export function OpportunitiesPage() {
  const { user } = useAuth();
  const [opportunities] = useState<PopupOpportunity[]>(mockOpportunities);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedOpportunity, setSelectedOpportunity] = useState<PopupOpportunity | null>(null);
  const [applicationForm, setApplicationForm] = useState({
    proposal: '',
    portfolio: '',
    experience: ''
  });

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.organizationName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || opp.category === categoryFilter;
    return matchesSearch && matchesCategory && opp.status === 'active';
  });

  const handleApplication = (opportunity: PopupOpportunity) => {
    setSelectedOpportunity(opportunity);
  };

  const submitApplication = () => {
    // 실제로는 API 호출
    console.log('Application submitted:', {
      opportunityId: selectedOpportunity?.id,
      sellerId: user?.id,
      ...applicationForm
    });
    alert('신청이 완료되었습니다!');
    setSelectedOpportunity(null);
    setApplicationForm({ proposal: '', portfolio: '', experience: '' });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">모집중</Badge>;
      case 'closed':
        return <Badge variant="secondary">마감</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">예정</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4">팝업스토어 모집공고</h1>
        <p className="text-muted-foreground mb-6">
          다양한 기관에서 제공하는 팝업스토어 기회를 확인하고 신청해보세요.
        </p>

        {/* 검색 및 필터 */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="공고명이나 기관명으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 카테고리</SelectItem>
                <SelectItem value="패션">패션</SelectItem>
                <SelectItem value="뷰티">뷰티</SelectItem>
                <SelectItem value="라이프스타일">라이프스타일</SelectItem>
                <SelectItem value="푸드">푸드</SelectItem>
                <SelectItem value="기타">기타</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* 모집공고 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpportunities.map((opportunity) => (
          <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="line-clamp-2">{opportunity.title}</CardTitle>
                {getStatusBadge(opportunity.status)}
              </div>
              <p className="text-sm text-muted-foreground">{opportunity.organizationName}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4 line-clamp-3">{opportunity.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {opportunity.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {opportunity.startDate} ~ {opportunity.endDate}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-2" />
                  {opportunity.currentSellers}/{opportunity.maxSellers} 명
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  마감일: {opportunity.applicationDeadline}
                </div>
              </div>

              <div className="mt-4">
                <Badge variant="outline">{opportunity.category}</Badge>
                <p className="text-sm mt-2">
                  참가비: <span className="font-medium">{opportunity.fee.toLocaleString()}원</span>
                </p>
              </div>
            </CardContent>
            <CardFooter>
              {user?.type === 'seller' ? (
                <Button 
                  className="w-full" 
                  onClick={() => handleApplication(opportunity)}
                  disabled={opportunity.currentSellers >= opportunity.maxSellers}
                >
                  {opportunity.currentSellers >= opportunity.maxSellers ? '마감됨' : '신청하기'}
                </Button>
              ) : (
                <Button variant="outline" className="w-full">
                  상세보기
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredOpportunities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">조건에 맞는 모집공고가 없습니다.</p>
        </div>
      )}

      {/* 신청 모달 */}
      <Dialog open={!!selectedOpportunity} onOpenChange={() => setSelectedOpportunity(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>팝업스토어 신청</DialogTitle>
          </DialogHeader>
          
          {selectedOpportunity && (
            <div className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">{selectedOpportunity.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{selectedOpportunity.organizationName}</p>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">기간:</span> {selectedOpportunity.startDate} ~ {selectedOpportunity.endDate}</p>
                  <p><span className="font-medium">위치:</span> {selectedOpportunity.location}</p>
                  <p><span className="font-medium">참가비:</span> {selectedOpportunity.fee.toLocaleString()}원</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="proposal">사업 제안서</Label>
                  <Textarea
                    id="proposal"
                    placeholder="팝업스토어에서 판매할 상품과 브랜드에 대해 자세히 설명해주세요..."
                    value={applicationForm.proposal}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, proposal: e.target.value }))}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="portfolio">포트폴리오 URL</Label>
                  <Input
                    id="portfolio"
                    placeholder="상품 사진이나 브랜드 포트폴리오 링크를 입력해주세요"
                    value={applicationForm.portfolio}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, portfolio: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="experience">판매 경험</Label>
                  <Textarea
                    id="experience"
                    placeholder="이전 팝업스토어나 판매 경험에 대해 알려주세요..."
                    value={applicationForm.experience}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, experience: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedOpportunity(null)}>
                  취소
                </Button>
                <Button onClick={submitApplication}>
                  신청하기
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}