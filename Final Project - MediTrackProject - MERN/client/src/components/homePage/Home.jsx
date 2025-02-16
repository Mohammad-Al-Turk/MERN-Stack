import image from "../../images/MediTrackerLogo.png";
import "../../styles/Home.css";
import TopBar from "./TopBar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "./Footer";


const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("https://newsapi.org/v2/top-headlines?category=health&country=us&apiKey=3b3cf30a09ad45bf887dc95e9cf241a7")
      .then((response) => response.json())
      .then((data) => setNews(data.articles.slice(0, 10))) // Increased the number of articles to 10
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  return (
    <>
      <TopBar />
      <motion.div 
        className="about-us-card"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", textAlign: "center", margin: "20px auto", maxWidth: "600px" }}
      >
        <h1 className="about-us-heading">MediTracker</h1>
        <p className="about-us-text">
          Welcome to Meditracker, your trusted healthcare management system. Our mission is to simplify clinic operations by efficiently managing roles, medical data, and prescriptions, ensuring seamless collaboration between healthcare professionals and enhanced patient care.
        </p>
      </motion.div>
      <div className="news-container">
        <motion.h2 
          className="news-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Latest Medical News
        </motion.h2>
        <motion.div 
          className="news-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}
        >
          {news.map((article, index) => (
            <motion.div 
              key={index} 
              className="news-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              style={{ background: "#fff", padding: "15px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", textAlign: "center" }}
            >
              <motion.img 
                src={article.urlToImage} 
                alt={article.title} 
                className="news-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px" }}
              />
              <div className="news-content" style={{ padding: "10px" }}>
                <h3 className="news-headline" style={{ fontSize: "16px", fontWeight: "bold" }}>{article.title}</h3>
                <p className="news-description" style={{ fontSize: "14px", color: "#555" }}>{article.description}</p>
                <motion.a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="news-link"
                  whileHover={{ scale: 1.1 }}
                  style={{ display: "inline-block", marginTop: "10px", fontSize: "14px", color: "#007bff" }}
                >
                  Read more
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
