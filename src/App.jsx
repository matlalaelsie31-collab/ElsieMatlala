import Header from './components/Header';
import Hero from './components/Hero';
import Collections from './components/Collections';
import CommunityBanner from './components/CommunityBanner';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Collections />
        <CommunityBanner />
      </main>
      <Footer />
    </>
  );
}