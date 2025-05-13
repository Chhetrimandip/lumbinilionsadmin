"use client"
import React, { useEffect, useState } from 'react';
import { BlogsView } from './BlogsView';
import { ScheduleResultsView } from './ScheduleResultsView';
import { PlayerStatsView } from './PlayerStatsView';
import { QuizResultsView } from './QuizResultsView';
import { GalleryView } from './GalleryView';
import { QuizquestionsView } from './QuizquestionsView';
import { FanView } from './FanView';
import { OrdersView } from './OrdersView';
import LeagueView from './leagueview';

// Define the QuizzyType interface based on Prisma's QuizzyCreateInput
interface QuizzyType {
  id: string;
  question: string;
  options: string[];
  correctanswer: number;
  answerimage: string;
  answertext: string;
  points: number;
}

interface FansType {
    id: string;
    name: string;
    phone: string;
    email : string;
}
interface BlogsType {
  id :         string;   
  title :      string;
  slug   :     string;  
  content :    string ;  // store markdown or HTML
  imageUrl :   string ; // optional image
  author    :  string;
  publishedAt : Date | string; 
    
}
enum PlayerClass{
  Batsman,
  WicketKeeper,
  AllRounder,
  Bowler,
}
interface LionType {
  id: string
  name:string
  slug: string
  class : PlayerClass
  description :String
  matches     :number
  strikerate  : number
  wickets     : number
  runs        : number
}

interface LeagueType {
  id: string
  name:   string
  played : number
  won    : number
  lost   : number
  nr     : number
  points : number
  pos: number
}
interface GalleryType {
  id? : String
  imageUrl : String
  title: String
}
// Update the Dashboard props
interface DashboardProps {
  quiz?: QuizzyType[];
  fan?: FansType[];
  blogs?: BlogsType[];
  stats?: LionType[];
  league?: LeagueType[];
}




interface Order {
  id: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  OrderItem: any[];
  ShippingAddress?: any;
  Payment?: any;
}




const Dashboard = ( ) => {
  // State to track the current view
  const [fans,setFanData] = useState([])
  const [blogs, setBlogData] = useState([])
  const [stats,setStatsData] = useState([])
  const [quiz,setQuizData] = useState([])
  const [schedule,setScheduleData] = useState([])
  const [activeView, setActiveView] = useState('blogs'); 
  const [error,setError]  = useState<string | null>(null);
  const [loading,setLoading] = useState(false);
  const [orders, setOrdersData] = useState<Order[]>([]);
  const [league,setLeaguesData] = useState<LeagueType[]>([])
  const [gallery,setGalleryData] = useState<GalleryType[]>([])

  
//fetch data based on action
  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      setError(null);


      try{
        let data;

        switch(activeView) {
          case 'fandata':
            if (fans.length === 0){
              const response = await fetch('/api/fan')
              data = await response.json()
              setFanData(data)
            }
            break;
          case 'gallery':
            const galleryResponse = await fetch('/api/gallery');
            const galleryData = await galleryResponse.json();
            // You might need to add gallery state to the component
            setGalleryData(galleryData);
            break;
          case 'quizquestions':
            if (quiz.length === 0){
              const response = await fetch('/api/quiz')
              data = await response.json()
              setQuizData(data)
            }
            break;
          case 'blogs':
            if (blogs.length === 0){
              const response = await fetch('/api/blogs')
              data = await response.json()
              setBlogData(data)
            }
            break;
          case 'playerStats':
            if (stats.length === 0){
              const response = await fetch('/api/stats')
              data = await response.json()
              setStatsData(data)
            }
            break;
          case 'schedule':
            if (schedule.length === 0){
              const response = await fetch('/api/schedule')
              data = await response.json()
              setScheduleData(data)
            }
            break;
          case 'orders':
            if (orders.length === 0) {
              const response = await fetch('/api/orders');
              data = await response.json();
              setOrdersData(data);
            }
            break;
          case 'league':
            if (orders.length === 0) {
              const response = await fetch('/api/league');
              data = await response.json();
              setLeaguesData(data);
            }
            break;
          case 'quizResults':
            if (fans.length === 0){
              const response = await fetch('/api/fan')
              data = await response.json()
              setFanData(data)
            }
            break;
        }
    }catch(error){
        console.error('Error fetching data:', error )
        setError("Failed to load data, please try again later.")
    }finally{
      setLoading(false);
    }
  };
fetchData();
},[activeView, fans.length,stats.length,blogs.length,quiz.length,orders.length])

  // Function to handle navigation
  const handleNavigation = (view) => {
    setActiveView(view);
  };

  // Function to render the appropriate view based on state
  const renderView = () => {
    if (loading) {
      return <div className='bg-black text-white'>Loading...</div>;
    }
    
    if (error) {
      return <div className='bg-red text-[#000000]'>{error}</div>;
    }
    
    switch (activeView) {
      case 'blogs':
        return <BlogsView blogs={blogs} />;
      case 'schedule':
        return <ScheduleResultsView schedule={schedule} />;
      case 'playerStats':
        return <PlayerStatsView stats={stats} />;
      case 'quizResults':
        return <QuizResultsView fansdata={fans} />; // Use fans instead of undefined fan
      case 'gallery':
        return <GalleryView />;
      case 'quizquestions':
        return <QuizquestionsView quizData={quiz} />;
      case 'fandata':
        return <FanView fansdata={fans} />; 
      case 'orders':
        return <OrdersView orders={orders} />;
      case 'league':
        return <LeagueView league={league} />;
      default:
        return <BlogsView blogs={blogs} />;
    }
  };

  // Handle logout
  const handleLogout = () => {
    // In a real app, this would clear auth state and redirect
    console.log('Logging out...');
    // Navigate to login page or clear auth tokens
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <h2 className="text-2xl font-bold">{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</h2>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-48 pr-6">
          <div 
            className={`${activeView === 'blogs' ? 'bg-neutral-600/25' : 'bg-neutral-500/25'} rounded-2xl p-2 mb-4 cursor-pointer`}
            onClick={() => handleNavigation('blogs')}
          >
            <span className="text-xl">Blogs</span>
          </div>
          
          <nav className="space-y-4 mt-8">
          <a 
              onClick={() => handleNavigation('orders')} 
              className={`block text-xl cursor-pointer ${activeView === 'orders' ? 'font-semibold' : ''}`}
            >
              Orders
            </a>
            <a 
              onClick={() => handleNavigation('fandata')} 
              className={`block text-xl cursor-pointer ${activeView === 'fandata' ? 'font-semibold' : ''}`}
            >
               Fan Data
            </a>
            <a 
              onClick={() => handleNavigation('schedule')} 
              className={`block text-xl cursor-pointer ${activeView === 'schedule' ? 'font-semibold' : ''}`}
            >
              Schedule & Results
            </a>
            <a 
              onClick={() => handleNavigation('playerStats')} 
              className={`block text-xl cursor-pointer ${activeView === 'playerStats' ? 'font-semibold' : ''}`}
            >
              Player Stats
            </a>
            <a 
              onClick={() => handleNavigation('quizResults')} 
              className={`block text-xl cursor-pointer ${activeView === 'quizResults' ? 'font-semibold' : ''}`}
            >
              Quiz Results
            </a>
            <a 
              onClick={() => handleNavigation('quizquestions')} 
              className={`block text-xl cursor-pointer ${activeView === 'quizquestions' ? 'font-semibold' : ''}`}
            >
              Quizquestions
            </a>
            <a 
              onClick={() => handleNavigation('gallery')} 
              className={`block text-xl cursor-pointer ${activeView === 'gallery' ? 'font-semibold' : ''}`}
            >
              Gallery
            </a>
            <a 
              onClick={() => handleNavigation('league')} 
              className={`block text-xl cursor-pointer ${activeView === 'league' ? 'font-semibold' : ''}`}
            >
              League
            </a>
            <a 
              onClick={handleLogout} 
              className="block text-xl mt-8 cursor-pointer text-red-500"
            >
              Log Out
            </a>
          </nav>
        </div>
        
        {/* Vertical divider */}
        <div className="w-px bg-black mx-4"></div>

        {/* Main content */}
        <div className="flex-1">
          {renderView()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;