import PageHome from '~/pages/Home'
import PageUser from '~/pages/User'
import SuggestionsForYou from '~/pages/SuggestionsForYou'

// public không cần đăng nhập
const publicRoutes = [];

const privateRoutes = [
  { path: "/", component: PageHome },
  { path: "/@userId", component: PageUser },
  { path: "/explore/people", component: SuggestionsForYou },
];

export { publicRoutes, privateRoutes };
