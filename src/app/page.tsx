import { HomeClient } from './components/HomeClient';
import { NavigationMenuLinksServer } from './components/NavigationMenuLinks';

export default async function Home() {
  return <HomeClient navigationMenuLinksElement={<NavigationMenuLinksServer />} />;
}
