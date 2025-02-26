import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"
import BlogPostCard from "../components/BlogPostCard"
import AboutUs from "./AboutUs"



const Home = () => {
  return (
    <>
    <Layout>
    <HeroSection />
    <BlogPostCard />
    <AboutUs />
    </Layout>
    
    </>
  )
}

export default Home