
import React from 'react';
import Navbar from "../components/LandingPage/Navbar";
import HeroSection from '../components/LandingPage/HeroSection';
import FeatureCard from '../components/LandingPage/FeatureCard';
import InterviewInterface from '../components/LandingPage/InterviewInterface';
import JobRoleSelect from '../components/LandingPage/JobRoleSelect';
import Footer from '../components/LandingPage/Footer';
import { 
  Cpu, 
  MessageCircle, 
  BarChart, 
  RefreshCw, 
  Award, 
  Zap,
  BookOpen,
  Video
} from 'lucide-react';
import { Button } from '../components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        <HeroSection />
        
        <section id="features" className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Interview Sathi?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our AI-powered platform helps you practice and improve your interview skills with personalized feedback.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard 
                title="AI Interviewer" 
                description="Practice with our AI that simulates real interview scenarios for different job roles."
                icon={<Cpu className="h-6 w-6" />}
              />
              <FeatureCard 
                title="Real-time Feedback" 
                description="Get instant feedback on your responses to improve with each practice session."
                icon={<MessageCircle className="h-6 w-6" />}
              />
              <FeatureCard 
                title="Performance Analytics" 
                description="Track your progress and see how your interview skills improve over time."
                icon={<BarChart className="h-6 w-6" />}
              />
              <FeatureCard 
                title="Personalized Sessions" 
                description="Tailor practice sessions for specific job roles, companies, and skill levels."
                icon={<RefreshCw className="h-6 w-6" />}
              />
            </div>
          </div>
        </section>
        
        <section id="how-it-works" className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our simple process helps you prepare for interviews effectively.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                  <BookOpen className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Select Job Role</h3>
                <p className="text-gray-600">
                  Choose the specific job role you're interviewing for to get relevant questions.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                  <MessageCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Practice Interviews</h3>
                <p className="text-gray-600">
                  Engage in realistic interview simulations with our AI interviewer.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Improve</h3>
                <p className="text-gray-600">
                  Receive feedback, track your progress, and enhance your interview skills.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-primary/5">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Try It Now</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience how Interview Sathi can help you ace your next interview.
              </p>
            </div>
            
            <InterviewInterface />
          </div>
        </section>
        
        <section id="pricing" className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Simple Pricing</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose the plan that works best for your interview preparation needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="border rounded-lg p-6 flex flex-col">
                <h3 className="text-xl font-bold mb-2">Free</h3>
                <div className="text-3xl font-bold mb-1">$0</div>
                <p className="text-sm text-gray-500 mb-4">Perfect for getting started</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 text-green-500 mr-2" />
                    <span>5 practice interviews</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 text-green-500 mr-2" />
                    <span>Basic feedback</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 text-green-500 mr-2" />
                    <span>Text-based interviews</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Start Free</Button>
              </div>
              
              <div className="border rounded-lg p-6 bg-primary text-white relative flex flex-col">
                <div className="absolute top-0 right-0 bg-yellow-400 text-xs text-black font-semibold py-1 px-3 rounded-bl-lg rounded-tr-lg">
                  POPULAR
                </div>
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <div className="text-3xl font-bold mb-1">$19</div>
                <p className="text-sm text-primary-foreground/80 mb-4">per month</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 mr-2" />
                    <span>Unlimited practice interviews</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 mr-2" />
                    <span>Advanced feedback & analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 mr-2" />
                    <span>Voice & text interviews</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 mr-2" />
                    <span>Custom job role templates</span>
                  </li>
                </ul>
                <Button className="w-full bg-white text-primary hover:bg-gray-100">Get Started</Button>
              </div>
              
              <div className="border rounded-lg p-6 flex flex-col">
                <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                <div className="text-3xl font-bold mb-1">$99</div>
                <p className="text-sm text-gray-500 mb-4">per month</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 text-green-500 mr-2" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 text-green-500 mr-2" />
                    <span>Video interview analysis</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 text-green-500 mr-2" />
                    <span>Body language feedback</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 text-green-500 mr-2" />
                    <span>Dedicated support</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-secondary">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to ace your next interview?</h2>
            <p className="text-secondary-foreground/80 max-w-2xl mx-auto mb-8">
              Join thousands of job seekers who improved their interview skills with Interview Sathi.
            </p>
            <Button className="bg-white text-secondary hover:bg-gray-100 px-8 py-6 text-lg">
              Get Started Free
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
