import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Calendar, Plus, Users, Building2, MapPin, Clock, Search, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '../../App';

interface Recruitment {
  id: string;
  title: string;
  location: string;
  period: string;
  deadline: string;
  category: string;
  description: string;
  requirements: string[];
  benefits: string[];
  status: 'active' | 'closed' | 'draft';
  applicants: number;
  maxApplicants: number;
  createdDate: string;
  viewCount: number;
}

interface Applicant {
  id: string;
  name: string;
  category: string;
  appliedDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'interview';
  rating: number;
  description: string;
  experience: string;
  recruitmentTitle: string;
}

export function OrganizationDashboard() {
  const { user } = useAuth();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newRecruitment, setNewRecruitment] = useState({
    title: '',
    location: '',
    period: '',
    deadline: '',
    category: '',
    description: '',
    requirements: '',
    benefits: '',
    maxApplicants: ''
  });

  // Mock data for recruitments
  const [recruitments] = useState<Recruitment[]>([
    {
      id: '1',
      title: '홍대 젊은 크리에이터 팝업 페스티벌',
      location: '홍대 걷고싶은거리',
      period: '2024.03.15 - 2024.03.31',
      deadline: '2024.02.28',
      category: '패션/의류',
      description: '20-30대 타겟의 젊은 크리에이터들을 위한 팝업스토어 페스티벌입니다.',
      requirements: ['신진 브랜드 (설립 3년 이내)', '온라인 포트폴리오 필수'],
      benefits: ['부스 임대료 50% 할인', '마케팅 지원'],
      status: 'active',
      applicants: 15,
      maxApplicants: 30,
      createdDate: '2024.01.15',
      viewCount: 234
    },
    {
      id: '2',
      title: '강남역 지하상가 K-뷰티 팝업존',
      location: '강남역 지하상가',
      period: '2024.04.01 - 2024.04.30',
      deadline: '2024.03.15',
      category: '뷰티/화장품',
      description: '한국 뷰티 브랜드들을 위한 전용 팝업존 운영입니다.',
      requirements: ['K-뷰티 브랜드', '제품 안전성 인증 필수'],
      benefits: ['프리미엄 위치', '공동 마케팅'],
      status: 'active',
      applicants: 8,
      maxApplicants: 12,
      createdDate: '2024.01.12',
      viewCount: 156
    },
    {
      id: '3',
      title: '이태원 글로벌 아트 마켓',
      location: '이태원 문화공간',
      period: '2024.05.10 - 2024.05.20',
      deadline: '2024.04.25',
      category: '아트/공예',
      description: '해외 관광객들을 타겟으로 한 한국 전통 공예와 현대 아트의 만남입니다.',
      requirements: ['아트/공예 관련', '영어 소통 가능'],
      benefits: ['통역 서비스', '국제 배송 지원'],
      status: 'draft',
      applicants: 0,
      maxApplicants: 20,
      createdDate: '2024.01.20',
      viewCount: 45
    }
  ]);

  // Mock data for applicants
  const [applicants] = useState<Applicant[]>([
    {
      id: '1',
      name: '김뷰티',
      category: '뷰티/화장품',
      appliedDate: '2024.01.18',
      status: 'pending',
      rating: 4.8,
      description: '자연주의 뷰티 브랜드를 운영하고 있습니다. 친환경 제품으로 고객들에게 좋은 반응을 얻고 있어요.',
      experience: '팝업스토어 운영 경험 2년',
      recruitmentTitle: '강남역 지하상가 K-뷰티 팝업존'
    },
    {
      id: '2',
      name: '디자인스튜디오',
      category: '패션/의류',
      appliedDate: '2024.01.17',
      status: 'approved',
      rating: 4.6,
      description: '미니멀한 디자인의 패션 브랜드입니다. 젊은 층에게 인기가 많아요.',
      experience: '브랜드 운영 3년, 팝업 경험 5회',
      recruitmentTitle: '홍대 젊은 크리에이터 팝업 페스티벌'
    },
    {
      id: '3',
      name: '새내기셀러',
      category: '액세서리',
      appliedDate: '2024.01.16',
      status: 'interview',
      rating: 4.2,
      description: '핸드메이드 액세서리 브랜드를 시작했습니다. 첫 팝업스토어 도전입니다!',
      experience: '온라인 판매 1년',
      recruitmentTitle: '홍대 젊은 크리에이터 팝업 페스티벌'
    },
    {
      id: '4',
      name: '마케팅구루',
      category: '패션/의류',
      appliedDate: '2024.01.15',
      status: 'rejected',
      rating: 4.9,
      description: '스트릿 패션 브랜드로 SNS 마케팅에 강점이 있습니다.',
      experience: '브랜드 운영 5년, 팝업 경험 10회 이상',
      recruitmentTitle: '홍대 젊은 크리에이터 팝업 페스티벌'
    }
  ]);

  const categories = ['패션/의류', '뷰티/화장품', '액세서리', '홈리빙', '식품/음료', '문구/팬시', '아트/공예'];

  const filteredApplicants = applicants.filter(applicant =>
    applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    applicant.recruitmentTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateRecruitment = () => {
    if (!newRecruitment.title || !newRecruitment.description || !newRecruitment.category) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    // Mock create recruitment
    alert('모집 공고가 등록되었습니다.');
    setNewRecruitment({
      title: '', location: '', period: '', deadline: '', category: '',
      description: '', requirements: '', benefits: '', maxApplicants: ''
    });
    setIsCreateDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">모집중</Badge>;
      case 'closed':
        return <Badge className="bg-red-100 text-red-800">마감</Badge>;
      case 'draft':
        return <Badge variant="outline">임시저장</Badge>;
      default:
        return null;
    }
  };

  const getApplicantStatusBadge = (status: string) => {
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

  const RecruitmentCard = ({ recruitment }: { recruitment: Recruitment }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getStatusBadge(recruitment.status)}
              <Badge variant="outline">{recruitment.category}</Badge>
            </div>
            <CardTitle className="text-lg mb-2">{recruitment.title}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {recruitment.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                마감: {recruitment.deadline}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">{recruitment.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span>지원자</span>
            <span className="font-medium">{recruitment.applicants}/{recruitment.maxApplicants}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>조회수</span>
            <span className="font-medium">{recruitment.viewCount}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>등록일</span>
            <span className="font-medium">{recruitment.createdDate}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button className="flex-1">지원자 보기</Button>
          <Button variant="outline">수정</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">기관 대시보드</h1>
              <p className="mt-2 text-gray-600">안녕하세요, {user?.name}님! 팝업스토어 모집을 관리하세요.</p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  모집 등록
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>새 모집 공고 등록</DialogTitle>
                  <DialogDescription>
                    팝업스토어 셀러를 모집하는 공고를 작성해주세요
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">제목 *</Label>
                      <Input
                        id="title"
                        value={newRecruitment.title}
                        onChange={(e) => setNewRecruitment(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="모집 공고 제목"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">카테고리 *</Label>
                      <Select value={newRecruitment.category} onValueChange={(value) => setNewRecruitment(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="카테고리 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">장소</Label>
                      <Input
                        id="location"
                        value={newRecruitment.location}
                        onChange={(e) => setNewRecruitment(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="팝업스토어 진행 장소"
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxApplicants">모집 인원</Label>
                      <Input
                        id="maxApplicants"
                        type="number"
                        value={newRecruitment.maxApplicants}
                        onChange={(e) => setNewRecruitment(prev => ({ ...prev, maxApplicants: e.target.value }))}
                        placeholder="최대 모집 인원"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="period">진행 기간</Label>
                      <Input
                        id="period"
                        value={newRecruitment.period}
                        onChange={(e) => setNewRecruitment(prev => ({ ...prev, period: e.target.value }))}
                        placeholder="예: 2024.03.01 - 2024.03.31"
                      />
                    </div>
                    <div>
                      <Label htmlFor="deadline">지원 마감일</Label>
                      <Input
                        id="deadline"
                        value={newRecruitment.deadline}
                        onChange={(e) => setNewRecruitment(prev => ({ ...prev, deadline: e.target.value }))}
                        placeholder="예: 2024.02.28"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">설명 *</Label>
                    <Textarea
                      id="description"
                      value={newRecruitment.description}
                      onChange={(e) => setNewRecruitment(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="팝업스토어 모집에 대한 상세 설명"
                      rows={4}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="requirements">지원 요건</Label>
                    <Textarea
                      id="requirements"
                      value={newRecruitment.requirements}
                      onChange={(e) => setNewRecruitment(prev => ({ ...prev, requirements: e.target.value }))}
                      placeholder="지원자가 갖춰야 할 요건 (줄바꿈으로 구분)"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="benefits">혜택/지원사항</Label>
                    <Textarea
                      id="benefits"
                      value={newRecruitment.benefits}
                      onChange={(e) => setNewRecruitment(prev => ({ ...prev, benefits: e.target.value }))}
                      placeholder="제공하는 혜택이나 지원사항 (줄바꿈으로 구분)"
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      취소
                    </Button>
                    <Button onClick={handleCreateRecruitment}>
                      등록
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">총 모집 공고</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-gray-600">+2 이번 달</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">총 지원자</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-gray-600">+12 지난주 대비</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">승인된 셀러</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">28</div>
              <p className="text-xs text-gray-600">62% 승인율</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">평균 평점</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1">
                <div className="text-2xl font-bold">4.6</div>
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
              </div>
              <p className="text-xs text-gray-600">셀러들의 평가</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="recruitments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="recruitments">내 모집 공고</TabsTrigger>
            <TabsTrigger value="applicants">지원자 관리</TabsTrigger>
          </TabsList>

          <TabsContent value="recruitments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {recruitments.map((recruitment) => (
                <RecruitmentCard key={recruitment.id} recruitment={recruitment} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applicants" className="space-y-6">
            {/* Search */}
            <Card>
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="지원자 또는 모집 공고 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Applicants List */}
            <Card>
              <CardHeader>
                <CardTitle>지원자 목록</CardTitle>
                <CardDescription>지원자들의 정보를 확인하고 승인 여부를 결정하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredApplicants.map((applicant) => (
                    <div key={applicant.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium">{applicant.name}</h3>
                            <Badge variant="outline">{applicant.category}</Badge>
                            {getApplicantStatusBadge(applicant.status)}
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-sm">{applicant.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{applicant.description}</p>
                          <div className="text-xs text-gray-500 space-y-1">
                            <p>경험: {applicant.experience}</p>
                            <p>지원 공고: {applicant.recruitmentTitle}</p>
                            <p>지원일: {applicant.appliedDate}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {applicant.status === 'pending' && (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                승인
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                                거절
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="ghost">
                            상세 보기
                          </Button>
                        </div>
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