import Header from "../components/header";

export default function Home() {
  return (
    <div>
      <Header />
      <h2 className="subtitle">Welcome to ByteMasters!</h2>
      <p className="presentationText">
        Your one-stop shop for the latest and greatest in computer technology.
        Whether you're a gamer, a professional, or just looking for a reliable
        machine, we've got you covered.
      </p>

      <h2 className="subtitle">🔥 Special Offers 🔥</h2>
      <div className="offers">
        <div className="offersItem">
          <img src="/imgs/notebooks/dell-xps-13.webp" alt="Dell XPS 13" />
          <p>
            <b>Dell XPS 13</b> - Premium ultrabook with Intel Core i7, 16GB RAM,
            and 512GB SSD. Compact and powerful for work and entertainment.
          </p>
          <p>
            <b>Price:</b> $1399
          </p>
        </div>
        <div className="offersItem">
          <img
            src="/imgs/notebooks/apple-macbook-pro-16.webp"
            alt="MacBook Pro 16"
          />
          <p>
            <b>MacBook Pro 16</b> - High-performance laptop with Apple M4+ chip,
            16GB RAM, and 1TB SSD. Perfect for professionals and creatives.
          </p>
          <p>
            <b>Price:</b> $2399
          </p>
        </div>
        <div className="offersItem">
          <img
            src="/imgs/computers/asus_rog_strix_ga35.webp"
            alt="ASUS ROG Strix GA35"
          />
          <p>
            <b>ASUS ROG Strix GA35</b> - High-end gaming desktop with AMD Ryzen
            9, NVIDIA RTX 4080, 32GB RAM, and 2TB SSD. Built for gamers.
          </p>
          <p>
            <b>Price:</b> $2000
          </p>
        </div>
        <div className="offersItem">
          <img
            src="/imgs/computers/lenovo_legion_t5.webp"
            alt="Lenovo Legion T5"
          />
          <p>
            <b>Lenovo Legion T5</b> - Gaming desktop with AMD Ryzen 7, NVIDIA
            GeForce RTX 2070, 16GB RAM, and 1TB SSD. Designed for gamers who
            need top-notch performance.
          </p>
          <p>
            <b>Price:</b> $1400
          </p>
        </div>
      </div>

      <h2 className="subtitle">🆕 Latest Arrivals 🆕</h2>
      <div className="subtitleTextContainer">
        <p className="subtitleTextLeft">
          Check out the newest additions to our store! From the latest NVIDIA
          RTX 5090 GPUs to the powerful AMD Ryzen 9 processors, we have
          everything you need to build your dream PC.
        </p>
        <p className="subtitleTextCenter">
          Explore our collection of high-performance components and accessories.
          Perfect for gamers, creators, and tech enthusiasts.
        </p>
        <p className="subtitleTextRight">
          Stay ahead of the curve with our cutting-edge products. Shop now and
          be the first to experience the future of computing.
        </p>
      </div>

      <h2 className="subtitle">💻 Featured Products 💻</h2>
      <div className="featured">
        <div className="featuredImg">
          <img
            src="/imgs/computers/asus_rog_strix_ga35dx.webp"
            alt="Featured Product"
          />
        </div>
        <div className="featuredText">
          <p>
            <b>ASUS ROG Strix GA35DX</b> - The ultimate gaming desktop with an
            AMD Ryzen 9 processor, NVIDIA GeForce RTX 4090, 64GB RAM, and 2TB
            SSD. Perfect for gamers who demand the best.
          </p>
          <p>
            <b>Price:</b> $2700
          </p>
        </div>
      </div>

      <h2 className="subtitle">Why Choose ByteMasters?</h2>
      <div className="subtitleTextContainer">
        <p className="subtitleTextLeft">
          At ByteMasters, we pride ourselves on offering top-quality products at
          competitive prices. Our team of experts is here to help you find the
          perfect solution for your needs.
        </p>
        <p className="subtitleTextCenter">
          Enjoy fast shipping, excellent customer service, and a wide range of
          products to choose from. Your satisfaction is our priority.
        </p>
        <p className="subtitleTextRight">
          Join our community of tech enthusiasts and discover why ByteMasters is
          the go-to destination for all your computing needs.
        </p>
      </div>
    </div>
  );
}
