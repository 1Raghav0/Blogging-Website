import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"
import BlogPostCard from "../components/BlogPostCard"
import Loader from "../components/Loader"


const Home = () => {
  return (
    <>
    <Layout>
    <HeroSection />
    <BlogPostCard />
    <Loader />
    </Layout>
    
    </>
  )
}

export default Home