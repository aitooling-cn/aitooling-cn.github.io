import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/components/HomePage';
import { JsonLdOrganization } from '@/components/SEO';

export default function Page() {
  return (
    <>
      <JsonLdOrganization />
      <Header />
      <main className="flex-1">
        <HomePage />
      </main>
      <Footer />
    </>
  );
}
