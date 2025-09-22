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
import { Search, Plus, MessageCircle, ThumbsUp, Clock, User, Building2, TrendingUp, Star } from 'lucide-react';
import { useAuth } from '../../App';

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  author: {
    name: string;
    type: 'seller' | 'organization';
    avatar?: string;
  };
  createdAt: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  isPinned?: boolean;
  tags?: string[];
}

export function CommunityPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
  });

  // Mock data for posts
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      title: '🔥 강남역 팝업스토어 성공 후기 및 팁 공유',
      content: '안녕하세요! 지난달 강남역에서 뷰티 팝업스토어를 운영했는데 정말 성공적이었습니다. 매출도 목표의 150%를 달성했고, 브랜드 인지도도 많이 올랐어요. 성공 요인과 팁을 공유해드립니다...',
      category: '성공 사례',
      author: {
        name: '김뷰티',
        type: 'seller'
      },
      createdAt: '2024.01.18',
      likeCount: 24,
      commentCount: 12,
      viewCount: 156,
      isPinned: true,
      tags: ['강남', '뷰티', '성공후기']
    },
    {
      id: '2',
      title: '팝업스토어 디스플레이 노하우 공유',
      content: '작은 공간에서도 효과적으로 제품을 진열하는 방법에 대해 이야기해보려고 합니다. 특히 제한된 공간에서 고객의 시선을 끄는 디스플레이 팁들을...',
      category: '노하우 공유',
      author: {
        name: '디자인스튜디오',
        type: 'seller'
      },
      createdAt: '2024.01.17',
      likeCount: 18,
      commentCount: 8,
      viewCount: 89,
      tags: ['디스플레이', '인테리어']
    },
    {
      id: '3',
      title: '[공지] 홍대 문화재단 3월 팝업 이벤트 모집 안내',
      content: '홍대 문화재단에서 3월에 진행될 "젊은 크리에이터 팝업 페스티벌"에 참여할 셀러를 모집합니다. 이번 행사는 20-30대 타겟으로...',
      category: '공지사항',
      author: {
        name: '홍대문화재단',
        type: 'organization'
      },
      createdAt: '2024.01.16',
      likeCount: 15,
      commentCount: 25,
      viewCount: 234,
      isPinned: true,
      tags: ['홍대', '모집', '크리에이터']
    },
    {
      id: '4',
      title: '팝업스토어 운영 중 겪은 어려움과 해결방법',
      content: '처음 팝업스토어를 운영하면서 예상치 못한 문제들이 많았는데, 어떻게 해결했는지 공유해드릴게요. 특히 재고 관리와 고객 응대 부분에서...',
      category: '경험 공유',
      author: {
        name: '새내기셀러',
        type: 'seller'
      },
      createdAt: '2024.01.15',
      likeCount: 12,
      commentCount: 15,
      viewCount: 78,
      tags: ['초보', '어려움', '해결방법']
    },
    {
      id: '5',
      title: '팝업스토어 마케팅 전략 - SNS 활용법',
      content: '인스타그램과 TikTok을 활용한 팝업스토어 마케팅 전략에 대해 공유합니다. 실제로 팔로워를 10배 늘리고 방문자를 3배 증가시킨 방법들을...',
      category: '마케팅',
      author: {
        name: '마케팅구루',
        type: 'seller'
      },
      createdAt: '2024.01.14',
      likeCount: 31,
      commentCount: 19,
      viewCount: 198,
      tags: ['마케팅', 'SNS', '인스타그램']
    }
  ]);

  const categories = [
    '공지사항',
    '성공 사례',
    '경험 공유',
    '노하우 공유',
    '마케팅',
    '질문/문의',
    '자유 게시판'
  ];

  const popularTags = ['마케팅', '홍대', '강남', '뷰티', '패션', '디스플레이', '성공후기', 'SNS'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const trendingPosts = posts
    .filter(post => !post.isPinned)
    .sort((a, b) => (b.likeCount + b.commentCount + b.viewCount / 10) - (a.likeCount + a.commentCount + a.viewCount / 10))
    .slice(0, 5);

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content || !newPost.category) {
      alert('제목, 내용, 카테고리를 모두 입력해주세요.');
      return;
    }

    const post: Post = {
      id: Date.now().toString(),
      ...newPost,
      author: {
        name: user?.name || '익명',
        type: user?.type || 'seller'
      },
      createdAt: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
      likeCount: 0,
      commentCount: 0,
      viewCount: 0,
      tags: newPost.tags ? newPost.tags.split(',').map(tag => tag.trim()) : []
    };

    setPosts(prev => [post, ...prev]);
    setNewPost({ title: '', content: '', category: '', tags: '' });
    setIsCreateDialogOpen(false);
  };

  const getUserIcon = (type: string) => {
    switch (type) {
      case 'organization':
        return <Building2 className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const PostCard = ({ post }: { post: Post }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{post.category}</Badge>
              {post.isPinned && (
                <Badge className="bg-red-100 text-red-800">
                  <Star className="h-3 w-3 mr-1" />
                  공지
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg mb-2 hover:text-blue-600 cursor-pointer">
              {post.title}
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                {getUserIcon(post.author.type)}
                <span>{post.author.name}</span>
                {post.author.type === 'organization' && (
                  <Badge variant="outline" className="text-xs">기관</Badge>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.createdAt}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4 line-clamp-2">{post.content}</p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.map((tag, index) => (
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
              {post.likeCount}
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              {post.commentCount}
            </div>
            <div className="flex items-center gap-1">
              조회 {post.viewCount}
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
            더 보기
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">커뮤니티</h1>
              <p className="mt-2 text-gray-600">팝업스토어 운영자들과 경험을 공유하고 소통해보세요</p>
            </div>
            {user && (
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    글 쓰기
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>새 게시글 작성</DialogTitle>
                    <DialogDescription>
                      커뮤니티에 공유하고 싶은 내용을 작성해주세요
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="category">카테고리</Label>
                      <Select value={newPost.category} onValueChange={(value) => setNewPost(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="카테고리를 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.filter(cat => cat !== '공지사항').map((category) => (
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
                        value={newPost.title}
                        onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="게시글 제목을 입력하세요"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="content">내용</Label>
                      <Textarea
                        id="content"
                        value={newPost.content}
                        onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="내용을 입력하세요"
                        rows={6}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="tags">태그 (선택사항)</Label>
                      <Input
                        id="tags"
                        value={newPost.tags}
                        onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
                        placeholder="태그를 쉼표로 구분하여 입력하세요 (예: 마케팅, 홍대, 성공후기)"
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        취소
                      </Button>
                      <Button onClick={handleCreatePost}>
                        등록
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
                        placeholder="게시글 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="카테고리 선택" />
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
              </CardContent>
            </Card>

            {/* Posts List */}
            <div className="space-y-4">
              {sortedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  인기 게시글
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trendingPosts.map((post, index) => (
                    <div key={post.id} className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-2 hover:text-blue-600 cursor-pointer">
                          {post.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <span>{post.likeCount} 좋아요</span>
                          <span>{post.commentCount} 댓글</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle>인기 태그</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="cursor-pointer hover:bg-blue-100 hover:text-blue-700"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Rules */}
            <Card>
              <CardHeader>
                <CardTitle>커뮤니티 규칙</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>• 서로를 존중하며 건전한 토론을 해주세요</p>
                <p>• 광고성 글은 삼가해주세요</p>
                <p>• 개인정보 공유를 금지합니다</p>
                <p>• 유용한 정보 공유를 환영합니다</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}