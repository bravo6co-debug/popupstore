import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Building2, Users, MessageSquare, HelpCircle } from 'lucide-react';

export function HomePage() {
  const features = [
    {
      icon: Building2,
      title: '셀러 등록',
      description: '팝업스토어 셀러로 등록하고 다양한 기관의 모집을 찾아보세요.',
      action: '셀러로 시작하기',
      href: '/register?type=seller'
    },
    {
      icon: Users,
      title: '기관 등록',
      description: '기관으로 등록하여 맞춤형 셀러를 모집하고 관리하세요.',
      action: '기관으로 시작하기',
      href: '/register?type=organization'
    },
    {
      icon: MessageSquare,
      title: 'Q&A 시스템',
      description: '실시간 문의사항을 공유하고 답변을 받을 수 있는 시스템입니다.',
      action: 'Q&A 보기',
      href: '/qna'
    },
    {
      icon: HelpCircle,
      title: '커뮤니티',
      description: '다른 셀러들과 정보를 공유하고 소통할 수 있는 커뮤니티입니다.',
      action: '커뮤니티 참여',
      href: '/community'
    }
  ];

  const steps = [
    {
      number: '1',
      title: '회원가입',
      description: '셀러 또는 기관으로 가입하여 이용해보세요.'
    },
    {
      number: '2',
      title: '모집/신청',
      description: '기관은 모집을 등록하고, 셀러는 관심 있는 모집에 신청하세요.'
    },
    {
      number: '3',
      title: '소통 및 승인',
      description: 'Q&A를 통해 소통하고 최종 승인을 받으세요.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            팝업스토어 커넥터
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            셀러와 기관을 연결하는 스마트한 플랫폼
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register?type=seller">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                셀러로 시작하기
              </Button>
            </Link>
            <Link to="/register?type=organization">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-3">
                기관으로 시작하기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">주요 기능</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                    <Link to={feature.href}>
                      <Button variant="outline" size="sm" className="w-full">
                        {feature.action}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">이용 방법</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            지금 바로 시작해보세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            팝업스토어 커넥터와 함께 새로운 기회를 만들어보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                무료로 시작하기
              </Button>
            </Link>
            <Link to="/qna">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-3">
                더 알아보기
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}