import CTA from "./CTA";
import Features from "./Features";
import Hero from "./Hero";
import HowITWork from "./HowITWork";
import Stats from "./Stats";
import Testimony from "./Testimony";

const Home = () => {
  return (
    <>
      {/* hero section  */}
      <Hero />
      {/* stats */}
      <Stats/>
      {/* features */}
      <Features/>
      {/* how it works */}
      <HowITWork/>
      {/* testimony */}
      <Testimony/>
      {/* CTA */}
      <CTA/>
    </>
  );
};

export default Home;
