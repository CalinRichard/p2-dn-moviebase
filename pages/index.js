import Layout from "components/Layout";
import SampleHomepage from "components/SampleHomepage";

export default function Home() {
  return (
    <Layout title="Moviebase" selected="/">
      <SampleHomepage page="watchlist" text="Watchlist" />
      <SampleHomepage page="history" text="History" />
    </Layout>
  );
}
