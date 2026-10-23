import Header from './components/Header';
import Hero from './components/Hero';
import Collections from './components/Collections';
import CommunityBanner from './components/CommunityBanner';
import Events from './components/Events';
import AuthSection from './components/AuthSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Collections />
        <CommunityBanner />
        <Events />
        <AuthSection />
      </main>
      <Footer />
    </>
  );
}