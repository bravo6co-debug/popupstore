import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Search, Plus, HelpCircle, MessageCircle, ThumbsUp, User, Building2, Clock } from 'lucide-react';
import { useAuth } from '../../App';

interface Question {
  id: string;
  title: string;
  content: string;
  category: string;
  author: {
    name: string;
    type: 'seller' | 'organization';
  };
  createdAt: string;
  status: 'open' | 'answered' | 'closed';
  likeCount: number;
  answerCount: number;
  viewCount: number;
  tags?: string[];
}

interface Answer {
  id: string;
  questionId: string;
  content: string;
  author: {
    name: string;
    type: 'seller' | 'organization' | 'admin';
  };
  createdAt: string;
  likeCount: number;
  isAccepted?: boolean;
}

export function QnaPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
  });

  // Mock data for questions
  const [questions] = useState<Question[]>([
    {
      id: '1',
      title: '팝업스토어 첫 운영, 어떤 준비를 해야 할까요?',
      content: '안녕하세요! 처음으로 팝업스토어를 운영하게 되었는데, 어떤 것들을 미리 준비해야 할지 궁금합니다. 특히 재고 관리나 고객 응대 부분에서 팁이 있다면 공유해주세요.',
      category: '운영 관련',
      author: {
        name: '새내기셀러',
        type: 'seller'
      },
      createdAt: '2024.01.20',
      status: 'answered',
      likeCount: 15,
      answerCount: 8,
      viewCount: 124,
      tags: ['첫운영', '준비사항', '재고관리']
    },
    {
      id: '2',
      title: '강남역 지하상가 팝업존 임대료는 보통 얼마인가요?',
      content: '강남역 지하상가에서 팝업스토어를 진행하려고 하는데, 대략적인 임대료 수준이 궁금합니다. 경험 있으신 분들의 조언 부탁드려요.',
      category: '비용 관련',
      author: {
        name: '김뷰티',
        type: 'seller'
      },
      createdAt: '2024.01.19',
      status: 'open',
      likeCount: 23,
      answerCount: 12,
      viewCount: 89,
      tags: ['강남', '임대료', '비용']
    },
    {
      id: '3',
      title: '팝업스토어 마케팅, SNS 외에 다른 방법이 있을까요?',
      content: '인스타그램과 TikTok 말고도 효과적인 마케팅 방법이 있다면 알려주세요. 오프라인 마케팅도 고려하고 있습니다.',
      category: '마케팅',
      author: {
        name: '마케팅고민',
        type: 'seller'
      },
      createdAt: '2024.01.18',
      status: 'answered',
      likeCount: 18,
      answerCount: 15,
      viewCount: 156,
      tags: ['마케팅', '홍보', 'SNS']
    },
    {
      id: '4',
      title: '셀러 선발 기준이 궁금합니다',
      content: '저희 기관에서 팝업스토어 셀러를 모집할 때 어떤 기준으로 선발하는 것이 좋을까요? 다른 기관들은 어떤 기준을 사용하시는지 궁금합니다.',
      category: '기관 관련',
      author: {
        name: '문화재단담당자',
        type: 'organization'
      },
      createdAt: '2024.01.17',
      status: 'open',
      likeCount: 9,
      answerCount: 5,
      viewCount: 67,
      tags: ['기관', '선발기준', '모집']
    },
    {
      id: '5',
      title: '계약서 작성 시 주의사항이 있나요?',
      content: '팝업스토어 계약서를 작성할 때 꼭 포함해야 할 조항이나 주의해야 할 부분이 있다면 알려주세요.',
      category: '계약/법률',
      author: {
        name: '디자인스튜디오',
        type: 'seller'
      },
      createdAt: '2024.01.16',
      status: 'answered',
      likeCount: 31,
      answerCount: 7,
      viewCount: 198,
      tags: ['계약서', '법률', '주의사항']
    }
  ]);

  const categories = [
    '운영 관련',
    '비용 관련', 
    '마케팅',
    '기관 관련',
    '계약/법률',
    '기술적 문제',
    '일반 질문'
  ];

  const statusOptions = [
    { value: 'open', label: '답변 대기' },
    { value: 'answered', label: '답변 완료' },
    { value: 'closed', label: '해결됨' }
  ];

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || question.category === selectedCategory;
    const matchesStatus = !selectedStatus || selectedStatus === 'all' || question.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const popularQuestions = questions
    .sort((a, b) => (b.likeCount + b.answerCount + b.viewCount / 10) - (a.likeCount + a.answerCount + a.viewCount / 10))
    .slice(0, 5);

  const handleCreateQuestion = () => {
    if (!newQuestion.title || !newQuestion.content || !newQuestion.category) {
      alert('제목, 내용, 카테고리를 모두 입력해주세요.');
      return;
    }

    // Mock create question
    alert('질문이 등록되었습니다.');
    setNewQuestion({ title: '', content: '', category: '', tags: '' });
    setIsCreateDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-blue-100 text-blue-800">답변대기</Badge>;
      case 'answered':
        return <Badge className="bg-green-100 text-green-800">답변완료</Badge>;
      case 'closed':
        return <Badge className="bg-gray-100 text-gray-800">해결됨</Badge>;
      default:
        return null;
    }
  };

  const getUserIcon = (type: string) => {
    switch (type) {
      case 'organization':
        return <Building2 className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const QuestionCard = ({ question }: { question: Question }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getStatusBadge(question.status)}
              <Badge variant="outline">{question.category}</Badge>
            </div>
            <CardTitle className="text-lg mb-2 hover:text-blue-600 cursor-pointer">
              {question.title}
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                {getUserIcon(question.author.type)}
                <span>{question.author.name}</span>
                {question.author.type === 'organization' && (
                  <Badge variant="outline" className="text-xs">기관</Badge>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {question.createdAt}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4 line-clamp-2">{question.content}</p>
        
        {question.tags && question.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {question.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              {question.likeCount}
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              {question.answerCount}
            </div>
            <div className="flex items-center gap-1">
              조회 {question.viewCount}
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
            답변하기
          </Button>
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
              <h1 className="text-3xl font-bold text-gray-900">Q&A</h1>
              <p className="mt-2 text-gray-600">팝업스토어 관련 궁금한 점을 질문하고 답변을 받아보세요</p>
            </div>
            {user && (
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    질문하기
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>새 질문 작성</DialogTitle>
                    <DialogDescription>
                      궁금한 점을 상세히 작성해주세요. 더 구체적일수록 좋은 답변을 받을 수 있습니다.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="category">카테고리</Label>
                      <Select value={newQuestion.category} onValueChange={(value) => setNewQuestion(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="카테고리를 선택하세요" />
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
                    
                    <div>
                      <Label htmlFor="title">제목</Label>
                      <Input
                        id="title"
                        value={newQuestion.title}
                        onChange={(e) => setNewQuestion(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="질문 제목을 입력하세요"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="content">질문 내용</Label>
                      <Textarea
                        id="content"
                        value={newQuestion.content}
                        onChange={(e) => setNewQuestion(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="궁금한 점을 상세히 작성해주세요"
                        rows={6}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="tags">태그 (선택사항)</Label>
                      <Input
                        id="tags"
                        value={newQuestion.tags}
                        onChange={(e) => setNewQuestion(prev => ({ ...prev, tags: e.target.value }))}
                        placeholder="관련 태그를 쉼표로 구분하여 입력하세요"
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        취소
                      </Button>
                      <Button onClick={handleCreateQuestion}>
                        질문 등록
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="질문 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
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
                        {statusOptions.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Questions List */}
            <div className="space-y-4">
              {filteredQuestions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  인기 질문
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {popularQuestions.map((question, index) => (
                    <div key={question.id} className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-2 hover:text-blue-600 cursor-pointer">
                          {question.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <span>{question.answerCount} 답변</span>
                          <span>{question.likeCount} 좋아요</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle>자주 묻는 질문</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">팝업스토어 운영 기간은?</h4>
                  <p className="text-sm text-gray-600">보통 1주일~1개월 사이입니다.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">초기 비용이 얼마나 드나요?</h4>
                  <p className="text-sm text-gray-600">위치와 규모에 따라 50만원~500만원</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">계약 시 주의사항은?</h4>
                  <p className="text-sm text-gray-600">임대료, 보증금, 운영 시간을 꼼꼼히 확인하세요.</p>
                </div>
              </CardContent>
            </Card>

            {/* Help Center */}
            <Card>
              <CardHeader>
                <CardTitle>도움이 필요하세요?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  1:1 문의하기
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  이용 가이드
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}